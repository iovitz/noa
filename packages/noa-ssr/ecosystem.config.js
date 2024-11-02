module.exports = {
  apps: [
    {
      name: 'noa',
      script: './dist/server.js',
      // 不要使用npm的方式，否则会多出一个npm start的进程
      // script: 'npm',
      // args: ['run', 'start'],
      exec_mode: 'cluster',
      instances: 1,
      max_restarts: 5,
      autorestart: true,
      watch: false,
      max_memory_restart: '300M',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
}
