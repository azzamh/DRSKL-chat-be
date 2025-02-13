import Redis from 'ioredis';

const publisher = new Redis();
const subscriber = new Redis();

// Subscribe to a channel
export const subscribeToChannel = (channel: string) => {
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

// Example usage
(async () => {
  subscribeToChannel('chat');

  setTimeout(() => {
    publishMessage('chat', 'Hello, Azzam!');
  }, 1000);
})();
