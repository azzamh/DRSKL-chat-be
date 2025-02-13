import { DecodedToken } from '@src/shared/types'
import { Server, Socket } from 'socket.io'
export { DecodedToken } from '@src/shared/types'

/**
 * Fungsi untuk mendaftarkan event "chat" pada socket
 * @param io - instance Server Socket.IO (global)
 * @param socket - instance Socket khusus client yang terhubung
 */
export function chatHandler(io: Server, socket: Socket) {
  // Kita asumsikan data user sudah disematkan di socket (misalnya di middleware JWT)
  const tokenData = (socket as any).userData as DecodedToken

  console.log('====================')
  console.log('Client connected, userData:', tokenData)


  // event "chat message" 
  socket.on('send_messages', (msg: string) => {
    console.log(`Message from user [${tokenData.id}]:`, msg)

    // Contoh broadcast ke semua client
    io.emit('chat message', {
      user: tokenData,
      message: msg
    })
  })

  // Event disconnect
  socket.on('disconnect', () => {
    console.log('====================')
    console.log('Client disconnected:', tokenData)
  })

}
