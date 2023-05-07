import http from 'http'

const server = http.createServer(() => {})

server.listen(3333, () => console.log('server running on port 3333 🚀'))
