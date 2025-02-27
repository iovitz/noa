const { writeFileSync } = require('node:fs')

const INSTANCES = 2

// 构建实例配置文件
for (let i = 0; i < INSTANCES; i++) {
  const instanceConfigFile = `./config/default-${i}.json`
  const configContent = {
    INSTANCE_NAME: `NOA_APP_${i}`,
    // port: 3000 + i,
  }
  writeFileSync(instanceConfigFile, JSON.stringify(configContent, null, 2))
}

module.exports = {
  apps: [
    {
      name: 'noa',
      exec_interpreter: 'node',
      script: './src/main.js',
      // 不要使用npm的方式，否则会多出一个npm start的进程
      // script: 'npm',
      // args: ['run', 'start:prod'],
      exec_mode: 'cluster',
      instances: INSTANCES,
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
