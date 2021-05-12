<template>
  <div class="message-list" ref="scroller">
    <MessageItem
      v-for="(item, index) in items"
      :key="index"
      :data="item"
    />
  </div>
</template>

<script>
import { onMounted, provide, ref } from '@vue/composition-api'
import store from '../store'
import MessageItem from './MessageItem'
import debounce from 'lodash.debounce'

export default {
  name: 'MessageList',
  components: { MessageItem },

  setup() {
    //#region scroller

    const scroller = ref(null)
    provide('scroller', scroller)

    const scrollToBottom = debounce(() => {
      scroller.value.scrollTop = scroller.value?.scrollHeight
    }, 500)

    store.adapter.on('message', () => {
      // TODO detect scroll position
      scrollToBottom()
    })

    //#endregion

    onMounted(() => {
      scrollToBottom()
    })

    return {
      scroller,
      items: store.messages,
    }
  }
}
</script>

<style scoped>
.message-list {
  flex: 1 1 auto;
  border: 1px solid #999;
  overflow-y: auto;
}
</style>