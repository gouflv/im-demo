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

const TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYXBvbGxvMTEiLCJ1c2VyX2RhdGEiOiJ7JTIybGV2ZWwlMjI6MjgsJTIybmFtZSUyMjolMjJ0ZXN0MTElMjJ9IiwiZXhwIjoxNjIwNDU4MDc2LCJqdGkiOiJjMmIyb2o1bjdvZDJrM3YwNXNzZyIsImlhdCI6MTYyMDQ1NDQ3NiwiaXNzIjoiSGF1c29zIiwibmJmIjoxNjIwNDU0NDc2LCJzdWIiOiJhcG9sbG8xMSJ9.FrtAmOWRLytPfOpw-wQUnZGLdeHh90fKfq-FL1LRQP0'

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
    ], TOKEN))

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
