import Vue from 'vue'
import { HausosAdapter } from '../ws/adapter/HausosAdapter'

export const ChatState = {
  Ready: 0,
  Initialize: 1,
  Queued: 2,
  Joined: 3,
  Finished: 4
}

export class ChatStore {
  /**
   * ChatState
   * @type {number}
   */
  state = ChatState.Ready

  messages = []

  adapter = new HausosAdapter()

  constructor() {
    this.messages = [
      createMessage('A'),
      createMessage('B'),
      createMessage('C'),
      createMessage('D'),
      createMessage('E'),
      createMessage('A'),
      createMessage('B'),
      createMessage('C'),
      createMessage('D'),
      createMessage('E'),
      createMessage('A'),
      createMessage('B'),
      createMessage('C'),
      createMessage('D'),
      createMessage('E')
    ]
  }

  destroy() {
    this.adapter?.destroy()
  }
}

export default Vue.observable(new ChatStore())

function createMessage(content) {
  return {
    id: Date.now(),
    content,
    from: 'gg',
    send: true,
    read: false
  }
}
