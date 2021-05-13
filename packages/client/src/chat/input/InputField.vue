<template>
  <form class="input-field" @submit.prevent="onSubmit">
    <textarea
      class="input-field__input"
      ref="inputRef"
      v-model="value"
      rows="1"
      @focus="onFocus"
    />
    <button>Send</button>
  </form>
</template>

<script>
import { inject, onMounted, ref } from '@vue/composition-api'
import autosize from 'autosize'

export default {
  name: 'InputField',
  setup() {
    const chatService = inject('chatService')

    const inputRef = ref(null)
    const input = ref('Text')

    function onSubmit() {
      chatService.addMessage(input.value)
    }

    function onFocus() {
      //
    }

    onMounted(() => {
      autosize(inputRef.value)
    })

    return {
      inputRef,
      value: input,
      onSubmit,
      onFocus
    }
  }
}
</script>

<style scoped lang="less">
.input-field {
  flex: 0 0 auto;

  &__input {
    display: block;
    width: 100%;
    max-height: 200px;
    padding: 8px;
    border: 1px solid #999;
    resize: none;
  }
}
</style>