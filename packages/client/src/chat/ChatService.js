import { HausosAdapter } from '../ws/adapter/HausosAdapter'

const log = require('debug')('ChatService')

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

  adapter = new HausosAdapter()

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
