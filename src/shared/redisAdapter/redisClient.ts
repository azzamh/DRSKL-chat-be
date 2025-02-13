import Redis from 'ioredis';

// Basic connection to localhost
const redis = new Redis(); // Defaults to localhost:6379

// OR connect to a custom host
// const redis = new Redis({
//   host: '127.0.0.1',
//   port: 6379,
//   password: 'your_password',  // If Redis is secured
//   db: 0                        // Optional: Select specific DB (default is 0)
// });

// Event listeners for connection status
redis.on('connect', () => console.log('✅ Connected to Redis'));
redis.on('ready', () => console.log('🚀 Redis is ready'));
redis.on('error', (err) => console.error('❌ Redis error:', err));
redis.on('close', () => console.log('🔌 Connection closed'));
redis.on('reconnecting', () => console.log('♻️ Reconnecting to Redis...'));

// Export for reuse
export default redis;
