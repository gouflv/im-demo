import { HausosAdapter } from '../ws/adapter/HausosAdapter'

const log = require('debug')('ChatService')

const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZ2ciLCJ1c2VyX2RhdGEiOiJ7XCJsZXZlbFwiOjYxLFwibmFtZVwiOlwiZ2dcIn0iLCJleHAiOjE2MjA4NzgyNjIsImp0aSI6ImMyZG9rdG03dXVmZnRzbWIxamswIiwiaWF0IjoxNjIwODA2MjYyLCJpc3MiOiJIYXVzb3MiLCJuYmYiOjE2MjA4MDYyNjIsInN1YiI6ImdnIn0.XaZIBNNADmJtGFR0CLxjlIEg7SLENlbmx5gxt5GYrhw'

let messageId = 1

export const ChatState = {
  Ready: 0,
  Initialize: 1,
  Queued: 2,
  Joined: 3,
  Finished: 4
}

export class ChatService {
  /**
   * ChatState
   * @type {number}
   */
  state = ChatState.Ready

  messages = Array.from({ length: 10 }).map((_) => createMessage())

  adapter = new HausosAdapter(['ws://34.105.22.29:31310/hausos/'], TOKEN)

  addMessage(content) {
    this.messages.push(createMessage(content))
  }

  readMessage(item) {
    log('message has been read', item)
    item.read = true
  }

  destroy() {
    this.adapter?.destroy()
  }
}

function createMessage(content) {
  return {
    id: ++messageId,
    content: content ?? `Message${messageId}`,
    from: 'gg',
    send: true,
    read: false
  }
}
