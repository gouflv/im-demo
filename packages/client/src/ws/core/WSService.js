import EE from 'event-emitter3'
import { WSConnect } from './WSConnect'

const log = require('debug')('ws:service')

export class WSService extends EE {
  constructor(url) {
    super()
    this.url = url
    this.connector = null
    this.ws = null
    this.isManualClose = false
    this.autoReconnect = true
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
    log('open', ws)

    this.ws = ws
    Object.assign(this.ws, {
      onerror: this.onError.bind(this),
      onmessage: this.onMessage.bind(this),
      onclose: this.onClose.bind(this)
    })

    this.emit('open')
  }

  async onClose(e) {
    log('close', e)
    this.emit('close', e)

    /**
     * Do reconnect
     */
    if (this.autoReconnect && !this.isManualClose) {
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

  async send(message) {
    log('send', message.buffer ?? message)
    this.ws?.send(message)
  }

  close() {
    this.isManualClose = true
    this.ws.close()
  }

  cleanup() {
    if (this.connector) {
      this.connector.destroy()
    }
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
  }

  destroy() {
    this.cleanup()
    // TODO stop WSConnect onSuccess
  }
}
