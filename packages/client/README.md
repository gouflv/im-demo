# WS Service

## Features

- Support multi server address:

    1. Use first address default, and auto switch to next if connection failed.

    2. Emit error if all server failed.

- Reconnect with delay:

    1. Reconnect when ws `error` and `close`.

    2. Mark failed server and skip that when next try.

- Disconnect:

    1. From client

    2. From server