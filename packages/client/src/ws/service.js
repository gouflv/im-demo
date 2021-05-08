import EE from 'event-emitter3'
import { Connect } from './connect'

export class WSService extends EE {
  constructor() {
    super()
  }

  connect() {
    return new Promise((resolve, reject) => {
      new Connect(
        this.url,
        (ws) => {
          this.ws = ws
          console.log(this.ws)
          Object.assign(this.ws, {
            onerror: this.onError.bind(this),
            onmessage: this.onMessage.bind(this),
            onclose: this.onClose.bind(this),
          })
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

  onClose(e) {
    this.emit('close', e)
  }
  onError(e) {
    this.emit('error', e)
  }
  onMessage(message) {
    this.emit('message', message)
  }

  send(data) {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      throw new Error('ws is not opening.')
    }
    this.ws.send(data)
  }

  setUrl(url) {
    this.url = url
  }

  destroy() {
    if (this.ws) {
      this.ws.onerror = null
      this.ws.onmessage = null
      this.ws.onclose = null
    }
    this.ws.close()
  }
}
