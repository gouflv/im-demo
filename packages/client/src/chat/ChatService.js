import Vue from 'vue'
import { HausosAdapter } from '../ws/adapter/HausosAdapter'

let messageId = 1

export const ChatState = {
  Ready: 0,
  Initialize: 1,
  Queued: 2,
  Joined: 3,
  Finished: 4
}

class ChatService {
  /**
   * ChatState
   * @type {number}
   */
  state = ChatState.Ready

  messages = Array.from({ length: 10 }).map((_) => createMessage())

  adapter = new HausosAdapter()

  addMessage() {
    this.messages.push(createMessage())
  }

  destroy() {
    this.adapter?.destroy()
  }
}

export default Vue.observable(new ChatService())

function createMessage() {
  return {
    id: ++messageId,
    content: `Message${messageId}`,
    from: 'gg',
    send: true,
    read: false
  }
}
