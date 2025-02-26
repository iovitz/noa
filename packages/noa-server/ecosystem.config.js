module.exports = {
  apps: [
    {
      name: 'noa',
      exec_interpreter: 'node',
      script: './dist/src/main.js',
      // 不要使用npm的方式，否则会多出一个npm start的进程
      // script: 'npm',
      // args: ['run', 'start:prod'],
      exec_mode: 'cluster',
      instances: 2,
      autorestart: false,
      max_restarts: 5,
      watch: false,
      max_memory_restart: '300M',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
}
