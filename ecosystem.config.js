module.exports = {
  apps: [
    {
      name: 'dachshund-search',
      script: './backend/dist/index.js',
      cwd: './',
      instances: 1,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'development',
        PORT: 3001,
        FRONTEND_URL: 'http://localhost:5173'
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: process.env.PORT || 3001,
        FRONTEND_URL: process.env.FRONTEND_URL || 'https://localhost',
        SEARCH_API_URL: process.env.SEARCH_API_URL || 'https://localhost:3000',
        ADMIN_API_KEY: process.env.ADMIN_API_KEY
      },
      time: true,
      watch: false,
      max_memory_restart: '1G',
      node_args: '',
      kill_timeout: 5000,
      restart_delay: 4000,
      max_restarts: 10,
      min_uptime: '10s'
    }
  ]
};
