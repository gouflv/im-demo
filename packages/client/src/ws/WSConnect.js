const log = require('debug')('ws:connect')

export class WSConnect {
  constructor(url, onSuccess, onError) {
    this.url = url
    this.onConnSuccess = onSuccess
    this.onConnError = onError

    this.urlIndex = 0
    this.retryDelayQueue = [1, 2, 4]
    this.retry = 0
    this.retryTimeout = null

    this.connect()
  }

  connect() {
    log('connect', this.url[this.urlIndex])
    this.ws = new WebSocket(this.url[this.urlIndex])
    this.ws.onopen = this.onOpen.bind(this)
    this.ws.onerror = this.onError.bind(this)
    this.ws.onclose = this.onClose.bind(this)
  }

  onOpen(e) {
    log('opened', e)
    this.removeAllListeners()
    log('opened ws', this.ws)
    this.onConnSuccess(this.ws)
  }

  onError(e) {
    log('error', e)
    this.ws.close()
  }

  onClose(e) {
    log('close', e)
    this.removeAllListeners()

    if (
      this.urlIndex >= this.url.length &&
      this.retry >= this.retryDelayQueue.length
    ) {
      log('all server fail to connect')
      this.onConnError()
      return
    }

    if (this.retry >= this.retryDelayQueue.length) {
      this.retry = 0
      this.urlIndex++
    }

    this.reconnect()
  }

  reconnect() {
    log(`retry after ${this.retryDelayQueue[this.retry]}s`)

    if (this.retryTimeout) {
      clearTimeout(this.retryTimeout)
    }

    this.retryTimeout = setTimeout(() => {
      this.retry++
      this.connect()
    }, this.retryDelayQueue[this.retry] * 1000)
  }

  destroy() {
    if (this.retryTimeout) {
      clearTimeout(this.retryTimeout)
    }

    if (this.ws) {
      this.removeAllListeners()
      this.ws.close()
    }
  }

  removeAllListeners() {
    if (this.ws) {
      this.ws.onopen = null
      this.ws.onerror = null
      this.ws.onclose = null
    }
  }
}
