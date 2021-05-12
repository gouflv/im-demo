<template>
  <div class="message-item" :class="{ 'message-item--direction-rtl': direction === 'rtl' }">
    <div class="message-item__thumb">

    </div>
    <div class="message-item__bubble">
      <div class="message-item__header">
        {{data.from}}
      </div>
      <div class="message-item__content">
        <div class="text">{{data.content}}</div>
      </div>
      <div v-if="data.read" class="message-item__status">
        Read
      </div>
    </div>
  </div>
</template>

<script>
import { inject, onMounted } from '@vue/composition-api'
import { useInViewDetect } from '../../use/useInviewDetect'

export default {
  name: 'MessageItem',
  props: {
    data: {
      type: Object,
      required: true
    },
    direction: {
      type: String,
      default: 'ltr',
      validator: v => ['ltr', 'rtl'].includes(v)
    }
  },
  setup() {
    const scroller = inject('scroller')

    const { init: InViewDetect } = useInViewDetect(scroller, onRead)
    function onRead() {
      // TODO
    }

    onMounted(() => {
      // TODO detect inView event only if message unread
      InViewDetect()

      console.log(scroller.value)
    })

    return {}
  }
}
</script>

<style scoped lang="less">
.message-item {
  display: flex;
  align-items: flex-start;
  margin: 8px 0 8px 16px;

  &--direction-rtl {
    order: revert;
    margin-right: 16px;
    margin-left: 0;
  }

  &__thumb {
    width: 40px;
    height: 40px;
    background-color: #eee;
    border-radius: 100%;
  }
  &__bubble {}

  &__content-text {}
}
</style>