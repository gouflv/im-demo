<template>
  <div id="app">
    <p>
      <button @click="sendMessage">Send Message</button>
    </p>
    <p>
      <button @click="close">Close</button>
    </p>
    <p>
      <button @click="sendClose">Server Close</button>
    </p>
  </div>
</template>

<script>
import { WSService } from './ws'

export default {
  name: 'App',
  data() {
    return {
      wss: null,
    }
  },
  async mounted() {
    const wss = (this.wss = new WSService([
      'ws://localhost:8081',
      'ws://localhost:8083',
      'ws://localhost:8082',
    ]))

    wss.on('open', (e) => {})
    wss.on('message', (message) => {
      if (message.data === 'close') {
        wss.close()
      }
    })

    await wss.connect()
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
