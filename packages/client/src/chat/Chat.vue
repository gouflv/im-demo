<template>
  <div class="chat">
    <MessageList />
    <Toolbar />
    <InputField />
  </div>
</template>

<script>
import { onUnmounted } from '@vue/composition-api'
import InputField from './input/InputField'
import MessageList from './message/MessageList.vue'
import store from './store'
import Toolbar from './toolbar/Toolbar.vue'

export default {
  name: 'Chat',
  components: {
    Toolbar,
    MessageList,
    InputField
  },
  setup() {
    // store.adapter.connect()

    onUnmounted(() => {
      store.destroy()
    })

    return {}
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