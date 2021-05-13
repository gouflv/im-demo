<template>
  <div id="app">
    <Chat />
  </div>
</template>

<script>
import { HausosAdapter } from './ws/adapter/HausosAdapter'
import Chat from './chat/Chat.vue'

const TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZ2ciLCJ1c2VyX2RhdGEiOiJ7XCJsZXZlbFwiOjYxLFwibmFtZVwiOlwiZ2dcIn0iLCJleHAiOjE2MjA4NzgyNjIsImp0aSI6ImMyZG9rdG03dXVmZnRzbWIxamswIiwiaWF0IjoxNjIwODA2MjYyLCJpc3MiOiJIYXVzb3MiLCJuYmYiOjE2MjA4MDYyNjIsInN1YiI6ImdnIn0.XaZIBNNADmJtGFR0CLxjlIEg7SLENlbmx5gxt5GYrhw'

export default {
  name: 'App',
  components: {
    Chat
  },

  data() {
    return {
      wss: null,
    }
  },
  async mounted() {
    // const wss = this.wss = new HausosAdapter([
    //   'ws://34.105.22.29:31310/hausos/',
    //   'ws://localhost:8083',
    //   'ws://localhost:8082',
    // ], TOKEN)
  },
  methods: {
    sendMessage() {
      this.wss.send('tad')
    },
    close() {
      this.wss.close()
    },
    sendClose() {
      this.wss.send('close')
    },
  },
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>