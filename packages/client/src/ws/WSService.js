import EE from 'event-emitter3'
import { WSConnect } from './WSConnect'

const log = require('debug')('ws:service')

export class WSService extends EE {
  constructor(url) {
    super()
    this.url = url
    this.isAlive = false
  }

  connect() {
    this.cleanup()
    return new Promise((resolve, reject) => {
      this.connector = new WSConnect(
        this.url,
        (ws) => {
          this.ws = ws
          Object.assign(this.ws, {
            onerror: this.onError.bind(this),
            onmessage: this.onMessage.bind(this),
            onclose: this.onClose.bind(this),
          })
          this.onOpen()
          resolve()
        },
        (error) => {
          reject(error)
        }
      )
    })
  }

  close() {
    this.ws?.close()
  }

  onOpen() {
    log('open')
    this.emit('open')

    this.isAlive = true
    // TODO send ping, and check pong in time
  }

  onClose(e) {
    log('close', e)
    this.emit('close', e)

    this.isAlive = false
  }

  onError(e) {
    log('error', e)
    this.emit('error', e)
  }

  onMessage(message) {
    log('message', message)
    this.emit('message', message)
  }

  async send (data) {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      log('ws is not open')
      return

      /**
       * May wait for reconnect here, and continue send action
       */
      // await this.connect()
    }
    log('send', JSON.stringify(data))
    this.ws.send(data)
  }

  ping() {

  }

  pong() {

  }

  cleanup() {
    if (this.connector) {
      this.connector.destroy()
    }
  }
}
