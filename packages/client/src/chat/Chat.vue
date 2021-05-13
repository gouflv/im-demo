<template>
  <div class="chat">
    <MessageList />
    <Toolbar />
    <InputField />
    <div>
      <button @click="onAdd">Add message</button>
    </div>
  </div>
</template>

<script>
import { onUnmounted, provide, reactive } from '@vue/composition-api'
import { ChatService } from './ChatService'
import InputField from './input/InputField'
import MessageList from './message/MessageList.vue'
import Toolbar from './toolbar/Toolbar.vue'

export default {
  name: 'Chat',
  components: {
    Toolbar,
    MessageList,
    InputField
  },
  setup() {
    const chatService = reactive(new ChatService())
    provide('chatService', chatService)
    chatService.adapter.connect()

    onUnmounted(() => {
      chatService.destroy()
    })

    function onAdd() {
      chatService.addMessage()
    }

    return {
      onAdd
    }
  }
}
</script>

<style scoped>
.chat {
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 16px;
}
</style>