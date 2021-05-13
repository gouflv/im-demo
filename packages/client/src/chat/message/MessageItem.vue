<template>
  <div
    ref="wrapperRef"
    class="message-item"
    :class="{ 'message-item--direction-rtl': direction === 'rtl' }"
    :data-message-id="data.id"
  >
    <div class="message-item__avatar">
      <div class="avatar"></div>
    </div>
    <div class="message-item__bubble">
      <div class="message-item__header">
        <div class="name">{{data.from}}</div>
      </div>
      <div class="message-item__content">
        <div class="text">{{data.content}}</div>
        <div v-show="data.read" class="status">
          Read
        </div>
      </div>
    </div>
  </div>
</template>

<script>

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
  setup(props) {

  }
}
</script>

<style scoped lang="less">
.message-item {
  display: flex;
  align-items: flex-start;
  padding: 8px 16px;

  &--direction-rtl {
    order: revert;
  }

  &__avatar {
    flex: 0 0 auto;
    margin-right: 8px;
    .avatar {
      width: 40px;
      height: 40px;
      background-color: #eee;
      border-radius: 100%;
    }
  }

  &__bubble {}

  &__header {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 8px;
    .name {
    }
  }

  &__content {
    display: flex;
    .text {
    }
    .status {
      margin-left: 8px;
      color: #999;
    }
  }
}
</style>