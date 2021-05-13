const log = require('debug')('ws:connect')

export class WSConnect {
  constructor(url, onSuccess, onError) {
    this.url = url
    this.onConnSuccess = onSuccess
    this.onConnError = onError

    this.retryDelayQueue = [1, 1, 2, 3, 5]
    this.urlIndex = 0
    this.retry = 0
    this.retryTimeout = null

    this.ws = null

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
    log('open', e)
    this.removeAllListeners()
    this.onConnSuccess(this.ws)
  }

  onError(e) {
    log('error', e)
    this.ws.close()
  }

  onClose(e) {
    log('close')
    this.removeAllListeners()

    /**
     * Stop if last url attempting failed.
     */
    if (
      this.urlIndex >= this.url.length - 1 &&
      this.retry >= this.retryDelayQueue.length - 1
    ) {
      log('connection failed')
      this.onConnError('No server has been connected.')
      return
    }

    /**
     * Try next url if attempts to the max
     */
    if (this.retry >= this.retryDelayQueue.length) {
      this.retry = 0
      this.urlIndex++
    }

    this.reconnect()
  }

  reconnect() {
    log(`attempt ${this.retry + 1} after ${this.retryDelayQueue[this.retry]}s`)

    if (this.retryTimeout) {
      clearTimeout(this.retryTimeout)
    }

    this.retryTimeout = setTimeout(() => {
      this.retry++
      this.connect()
    }, this.retryDelayQueue[this.retry] * 1000)
  }

  destroy() {
    this.onConnSuccess = null
    this.onConnError = null

    if (this.retryTimeout) {
      clearTimeout(this.retryTimeout)
    }

    if (this.ws) {
      this.removeAllListeners()
      this.ws.close()
      this.ws = null
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
