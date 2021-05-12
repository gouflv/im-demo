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
import { HausosAdapter } from './ws/adapter/HausosAdapter'

const TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZ2ciLCJ1c2VyX2RhdGEiOiJ7XCJsZXZlbFwiOjYxLFwibmFtZVwiOlwiZ2dcIn0iLCJleHAiOjE2MjA4NzgyNjIsImp0aSI6ImMyZG9rdG03dXVmZnRzbWIxamswIiwiaWF0IjoxNjIwODA2MjYyLCJpc3MiOiJIYXVzb3MiLCJuYmYiOjE2MjA4MDYyNjIsInN1YiI6ImdnIn0.XaZIBNNADmJtGFR0CLxjlIEg7SLENlbmx5gxt5GYrhw'

export default {
  name: 'App',
  data() {
    return {
      wss: null,
    }
  },
  async mounted() {
    // const wss = (this.wss = new WSService([
    //   'ws://localhost:8081',
    //   'ws://localhost:8083',
    //   'ws://localhost:8082',
    // ]))
    //
    // wss.on('open', (e) => {})
    // wss.on('message', (message) => {
    //   if (message.data === 'close') {
    //     wss.close()
    //   }
    // })
    //
    // await wss.connect()

    const ws = new HausosAdapter([
      'ws://34.105.22.29:31310/hausos/',
      'ws://localhost:8083',
      'ws://localhost:8082',
    ], TOKEN)
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
