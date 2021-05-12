import EE from 'event-emitter3'
import { WSService } from '../core/WSService'
import protoRoot from '../proto'
import { CMD } from './command'
import { bytesToStr, readBlob, strToBytes } from './utils'

const log = require('debug')('hausos:adapter')

export class HausosAdapter extends EE {
  constructor(url, token) {
    super()
    this.url = url
    this.token = token
    this.frameFactory = protoRoot.lookup('protocol.Frame')

    this.requestId = 1

    this.pingDuration = 30000
    this.pingInterval = null
  }

  connect() {
    this.wss = new WSService(this.url)
    this.wss.on('open', () => {
      this.login()
    })
    this.wss.on('close', () => {
      log('close')
    })
    this.wss.on('message', (message) => {
      this.onMessage(message.data)
    })
    this.wss.connect()
  }

  async onMessage(data) {
    const frameData = await this.decodeFrame(data)
    log('message', frameData)
    switch (frameData.cmd) {
      case CMD.LOGIN_RES:
        this.onLoginResponse(frameData.body)
    }
  }

  send(cmd, body) {
    log('send', cmd, body)
    this.wss.send(this.encodeFrame(cmd, body))
  }

  /**
   * Should send `ping` after login success
   */
  ping() {
    if (this.pingInterval) {
      clearInterval(this.pingInterval)
    }
    this.pingInterval = setInterval(() => {
      this.send(CMD.PING, {})
    }, this.pingDuration)
  }

  login() {
    log('login')
    this.send(CMD.LOGIN, {
      token: this.token,
      client_id: String(Math.random()),
      subscribed_topics: []
    })
  }

  //#region event handlers

  onLoginResponse(frameBody) {
    if (frameBody.error) {
      console.error(frameBody.error)
      return
    }
    this.emit('login')
    this.ping()
  }

  //#endregion

  //#region utils

  encodeFrame(cmd, body = {}) {
    const frameData = {
      header: {
        cmd,
        codec: 'json'
      },
      body: strToBytes(JSON.stringify(body))
    }
    let frame = this.frameFactory.create(frameData)
    return this.frameFactory.encode(frame).finish()
  }

  /**
   * Decode frame data
   * @param blob - ArrayBuffer
   * @return - Promise<{ cmd, body }>
   */
  async decodeFrame(blob) {
    const buffer = await readBlob(blob)
    try {
      const frame = this.frameFactory.decode(buffer)
      return {
        cmd: frame.header.cmd,
        body: JSON.parse(bytesToStr(frame.body))
      }
    } catch (e) {
      console.error(e)
    }
  }

  //#endregion

  destroy() {
    if (this.pingInterval) {
      clearInterval(this.pingInterval)
    }

    if (this.wss) {
      this.wss.removeAllListeners()
      this.wss.destroy()
    }
  }
}
