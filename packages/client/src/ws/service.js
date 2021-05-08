import EE from 'event-emitter3'

export class WSService extends EE {
  constructor() {
    super()
  }

  connect() {
    return new Promise((resolve, reject) => {
      new WSConnector(
        this.url,
        (ws) => {
          this.ws = ws
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

  send(data) {
    if (!this.ws || this.ws.readyState !== 1) {
      throw new Error('ws already closed')
    }
    this.ws.send(data)
  }

  setUrl(url) {
    this.url = url
  }
}

class WSConnector {
  constructor(url, onSuccess, onError) {
    this.url = url
    this.onSuccess = onSuccess
    this.onError = onError

    this.urlIndex = 0

    this.run()
  }
  run() {
    this.ws = new WebSocket(this.url[this.urlIndex])
    this.ws.onopen = () => {
      this.onSuccess(this.ws)
    }
    this.ws.onerror = (e) => {
      this.onError(e)
    }
  }
}
