module.exports = {
  apps: [
    {
      name: `app_server_prod`,
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
        NODE_ENV: 'production',
      },
    },
  ],
};
