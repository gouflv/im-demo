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
import { onUnmounted } from '@vue/composition-api'
import chatService from './ChatService'
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
    // chatService.adapter.connect()

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
  width: 600px;
  height: 600px;
}
</style>