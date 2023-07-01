// 目前定义的pm2环境有三个：prod、pre、online
const pm2Env = process.env.NODE_ENV ?? 'prod';
const env = {
  NODE_ENV: 'production',
};

// 部署测试环境
if (pm2Env === 'test') {
  env.NODE_ENV = 'development';
}

module.exports = {
  apps: [
    {
      name: `APP_SERVER_${pm2Env}`,
      script: 'dist/main.js',
      cwd: '.',
      exec_mode: 'cluster',
      instances: 1,
      error_file: './logs/pm2/error.log',
      out_file: './logs/pm2/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      autorestart: true,
      watch: false,
      max_memory_restart: '2G',
      env: {
        NODE_ENV: 'develop',
      },
    },
  ],
};
