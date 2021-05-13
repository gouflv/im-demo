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
@block: .message-item;

@{block} {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 8px 16px;

  // elements
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

  // modifier
  &--direction-rtl {
    flex-direction: row-reverse;

    @{block}__avatar {
      margin-right: 0;
      margin-left: 8px;
    }

    @{block}__header {
      flex-direction: row-reverse;
    }

    @{block}__content {
      flex-direction: row-reverse;
      .status {
        margin-left: 0;
        margin-right: 8px;
      }
    }
  }
}
</style>