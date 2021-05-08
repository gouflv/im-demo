<template>
  <div id="app">
    <button @click="sendMessage">Send Message</button>

    <button @click="close">Close</button>
  </div>
</template>

<script>
import {WSService} from './ws/service'

export default {
  name: 'App',
  data() {
    return {
      wss: null
    }
  },
  async mounted() {
    const wss = this.wss = new WSService()
    wss.setUrl([
      'ws://localhost:8081',
      'ws://localhost:8085',
      'ws://localhost:8084',
      'ws://localhost:8083',
      'ws://localhost:8082',
    ])
   
    wss.on('open', (e) => {
      console.log(e)
    })
    wss.on('message', (message) => {
      console.log(message)

      if (message.data === 'close') {
        wss.close()
      }
    })
   
    await wss.connect()
    console.log('wss connected')
  },
  methods: {
    sendMessage() {
      this.wss.send('tad')
    },
    close() {
      this.wss.close()
    }
  }
}
</script>
