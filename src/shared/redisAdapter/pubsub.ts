import Redis from 'ioredis';

const publisher = new  Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,
  password: process.env.REDIS_PASSWORD,  // If Redis is secured
  db: 0                        // Optional: Select specific DB (default is 0)
});

const subscriber = new  Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,
  password: process.env.REDIS_PASSWORD,  // If Redis is secured
  db: 0                        // Optional: Select specific DB (default is 0)
});

// Subscribe to a channel
export const subscribeToChannel = (channel: string, p0: (message: any) => Promise<void>) => {
  subscriber.subscribe(channel, (err, count) => {
    if (err) {
      console.error('Failed to subscribe:', err);
    } else {
      console.log(`Subscribed to ${channel}. Currently subscribed to ${count} channels.`);
    }
  });

  subscriber.on('message', (channel, message) => {
    console.log(`Received message from ${channel}: ${message}`);
  });
};

// Publish a message to a channel
export const publishMessage = async (channel: string, message: string) => {
  await publisher.publish(channel, message);
};

// // Example usage
// (async () => {
//   subscribeToChannel('chat');

//   setTimeout(() => {
//     publishMessage('chat', 'Hello, Azzam!');
//   }, 1000);
// })();
