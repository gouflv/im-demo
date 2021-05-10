import EE from 'event-emitter3'
import { WSConnect } from './WSConnect'
import { HausosAdapter } from './adapter/hausos'

const log = require('debug')('ws:service')

export class WSService extends EE {
  constructor(url, token) {
    super()
    this.adapter = new HausosAdapter()
    this.url = url
    this.token = token

    this.isAlive = false
    this.isManualClose = false
  }

  async connect() {
    this.cleanup()

    return new Promise((resolve, reject) => {
      this.connector = new WSConnect(
        this.url,
        async (ws) => {
          await this.onOpen(ws)
          resolve()
        },
        (error) => {
          reject(error)
        }
      )
    })
  }

  async onOpen(ws) {
    log('open')

    this.ws = ws
    Object.assign(this.ws, {
      onerror: this.onError.bind(this),
      onmessage: this.onMessage.bind(this),
      onclose: this.onClose.bind(this)
    })

    this.emit('open')

    this.isAlive = true

    await this.login()

    this.ping()
  }

  async onClose(e) {
    log('close', e)
    this.emit('close', e)

    this.isAlive = false

    if (!this.isManualClose) {
      await this.connect()
    }
  }

  onError(e) {
    log('error', e)
    this.emit('error', e)
  }

  onMessage(message) {
    log('message', message)
    this.emit('message', message)
  }

  async send(cmd, body) {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      log('ws is not open')
      return

      /**
       * May wait for reconnect here, and continue send action
       */
      // await this.connect()
    }
    log('send', JSON.stringify(body))

    this.ws.send(this.adapter.createCmd(cmd, body))
  }

  async login() {
    return this.send('0001', {
      token: this.token,
      clientId: String(Math.random())
    })
  }

  ping() {
    if (this.pingInterval) {
      clearInterval(this.pingInterval)
    }
    this.pingInterval = setInterval(() => {
      this.send('0009', {})
    }, 30000)
  }

  close() {
    this.isManualClose = true
  }

  cleanup() {
    if (this.connector) {
      this.connector.destroy()
    }
    if (this.pingInterval) {
      clearInterval(this.pingInterval)
    }
    this.ws = null
  }
}
