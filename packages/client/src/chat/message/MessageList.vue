<template>
  <div class="message-list" ref="scrollerRef">
    <MessageItem
      ref="itemRefs"
      v-for="(item, index) in items"
      :key="index"
      :data="item"
      :direction="item.id % 2 === 0 ? 'ltr' : 'rtl'"
    />
  </div>
</template>

<script>
import { inject, onMounted, ref, toRef, watch } from '@vue/composition-api'
import throttle from 'lodash.throttle'
import { useInViewDetect } from '../../use/useInviewDetect'
import MessageItem from './MessageItem'

export default {
  name: 'MessageList',
  components: { MessageItem },

  setup() {
    const chatService = inject('chatService')
    const items = toRef(chatService, 'messages')
    const scrollerRef = ref(null)
    const itemRefs = ref([])

    //#region list scroll
    const scrollToBottom = throttle(() => {
      scrollerRef.value.scrollTop = scrollerRef.value.scrollHeight
    }, 500)

    watch(() => items.value, () => {
      scrollToBottom()
    }, {
      flush: 'post'
    })

    onMounted(() => {
      scrollToBottom()
    })
    //#endregion

    //#region list items
    const {init: initInViewDetect, observe} = useInViewDetect(onItemInView)

    function onItemInView(el) {
      // find item that matching messageId
      const item = items.value.find(item => item.id === +el.dataset.messageId)
      if (item) {
        setMessageRead(item)
      }
    }

    onMounted(async () => {
      initInViewDetect(scrollerRef.value)
    })

    watch(() => itemRefs.value, () => {
      itemRefs.value
        .filter(vnode => !vnode.data.read)
        .forEach(vnode => {
          observe(vnode.$el)
        })
    })

    //#endregion

    //#region actions
    function setMessageRead(item) {
      chatService.readMessage(item)
    }
    //#endregion


    return {
      scrollerRef,
      items,
      itemRefs
    }
  }
}
</script>

<style scoped lang="less">
.message-list {
  flex: 1;
  border: 1px solid #999;
  overflow-y: auto;
  min-height: 0;
}
</style>