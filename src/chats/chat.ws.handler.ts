import { DecodedToken } from '@src/shared/types'
import * as userService from '@src/users/services'
import * as chatService from '@src/chats/services'
import { Server, Socket } from 'socket.io'
import { updatePresenceStatus } from '@src/users/services/updatePresenceStatus.service'
import * as redis from '@src/shared/redisAdapter'
import { send } from 'process'
import { group } from 'console'
import { json } from 'stream/consumers'



const userSocketMap = new Map<string, string>();
/**
 * Fungsi untuk mendaftarkan event "chat" pada socket
 * @param io - instance Server Socket.IO (global)
 * @param socket - instance Socket khusus client yang terhubung
 */
export async function chatHandler(io: Server, socket: Socket) {

  try{
    //user connected
    const tokenData = (socket as any).userData as DecodedToken
    const user_id = tokenData.id.toString()

    let user = await initConectedUser(user_id, socket)


    // event "send_messages" 
    socket.on('send_messages', async (data: string) => {
      console.log(`Message from user [${user_id}]:`, data)
      const messages = JSON.parse(data) as SendMeddagePayload
      

      messages.forEach(async (msg) => {
        const { recipientId, message, isGroup } = msg
        if (!isGroup) {
          const resp = await chatService.sendPrivateMessage(user_id, recipientId, message)
          if (resp.status === 200) {
            const pubsubPrivateMessageData = {
              senderId: user_id,
              recipientId,
              messageId: resp.data.id,
            }
            redis.publishMessage(`send_messages:${recipientId}`, JSON.stringify(pubsubPrivateMessageData))
          }
        }
      })
    })

    // Event disconnect
    socket.on('disconnect', async () => {
      console.log('====================')
      console.log('Client disconnected:', user_id)

      //set user lastactivity &  status to offline
      user = await updatePresenceStatus(user.data.id, false)
    })

    // Subscribe to Redis channel for messages
    redis.subscribeToChannel(`send_messages:${user.data.id}`, async (data) => {
      const pubsubPrivateMessageData = JSON.parse(data) as PubsubPrivateMessageData
      console.log('Message from redis pubsubPrivateMessageData:', pubsubPrivateMessageData);
      const message = await chatService.getMessageById(pubsubPrivateMessageData.messageId)
      console.log('Message from redis message:', message);
      const recipientSocketId = userSocketMap.get(pubsubPrivateMessageData.recipientId);
      if (recipientSocketId) {
        io.to(recipientSocketId).emit('chat message', message);
      }
    });
  } catch (error) {
    console.error('Error in chatHandler:', error)
    socket.disconnect()
  }
  
}


interface PubsubPrivateMessageData {
  senderId: string;
  recipientId: string;
  messageId: number;
}

interface SendMeddagData{
  recipientId: string;
  message: string;
  isGroup: boolean;
}

type SendMeddagePayload = [SendMeddagData];


async function initConectedUser(userId: string, socket: Socket) {
  userSocketMap.set(userId, socket.id);
  let user = await userService.getUserInfoService(userId)

  if (user.status !== 200) {
    socket.disconnect()
    throw new Error('User not found')
  }

  console.log('====================')
  console.log('Client connected, userData:', user.data)

  //set user lastactivity &  status to online
  user = await updatePresenceStatus(user.data.id, true)
  return user
}