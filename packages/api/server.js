const WebSocket = require('ws')

const PORT = 8081

const wss = new WebSocket.Server({ port: PORT }, (ws) => {
  console.log(`WS sever running on ${PORT}.`)
})

wss.on('connection', (ws) => {
  console.log('connection')
  ws.send('Hi.')

  ws.on('close', () => {
    console.log('closed')
  })

  ws.on('message', (message) => {
    console.log(message)
    ws.send('received: %s', message)
  })
})
