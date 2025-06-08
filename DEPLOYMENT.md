# Deployment Guide

This guide covers deploying the Dachshund Search application using PM2 for production environments.

## Prerequisites

- Node.js 18+
- PM2 installed globally or available in node_modules
- Built application (frontend and backend)

## Quick Deployment

### 1. Build the Application

```bash
npm run deploy:build
```

This will:
- Install all dependencies
- Build the frontend static files
- Build the backend TypeScript to JavaScript

### 2. Start with PM2

```bash
npm run deploy:start
```

Or use the PM2 command directly:

```bash
pm2 start ecosystem.config.js --env production --no-daemon
```

## Production Configuration

The application uses an ecosystem configuration file (`ecosystem.config.js`) that defines:

### Application Settings
- **Name**: `dachshund-search`
- **Script**: `./backend/dist/index.js`
- **Mode**: `cluster` (for load balancing)
- **Instances**: 1 (can be scaled up)

### Environment Variables (Production)
- `NODE_ENV=production`
- `PORT` (defaults to 3001, can be overridden by environment)
- `FRONTEND_URL` (from environment or defaults to 'https://localhost')
- `SEARCH_API_URL` (from environment or defaults to 'https://localhost:3000')
- `ADMIN_API_KEY` (from environment, optional)

### Logging
- Standard PM2 logging (view with `pm2 logs`)
- No custom log files configured in ecosystem config

### Process Management
- Max memory restart: 1GB
- Max restarts: 10
- Min uptime: 10 seconds
- Restart delay: 4 seconds

## Azure Deployment

For Azure App Service deployment:

1. Set the startup command in Azure to:
   ```bash
   pm2 start ecosystem.config.js --env production --no-daemon
   ```

2. Configure environment variables in Azure:
   ```
   NODE_ENV=production
   FRONTEND_URL=https://your-app.azurewebsites.net
   SEARCH_API_URL=https://your-search-api-url
   ADMIN_API_KEY=your-admin-api-key
   ```

3. The application will:
   - Serve the React frontend as static files
   - Handle API requests on `/api/*` routes
   - Support SPA routing (all non-API routes return `index.html`)

## Static File Serving

In production mode, the backend automatically serves the frontend static files from `frontend/dist/`:

- Frontend files: served at root path (`/`)
- API endpoints: served at `/api/*`
- SPA routing: all non-API routes return `index.html`

## Health Checks

The application provides health check endpoints:

- Backend health: `GET /api/health`
- Search API health: `GET /api/search/health`

## Monitoring

PM2 provides built-in monitoring:

```bash
# View running processes
pm2 list

# View logs
pm2 logs

# Monitor resources
pm2 monit

# Restart application
pm2 restart dachshund-search

# Stop application
pm2 stop dachshund-search
```

## Troubleshooting

### Application Won't Start
1. Ensure dependencies are installed: `npm install`
2. Build the application: `npm run build`
3. Check logs: `pm2 logs`

### Static Files Not Served
1. Verify frontend build exists: `ls frontend/dist/`
2. Check NODE_ENV is set to 'production'
3. Verify backend build: `ls backend/dist/`

### API Errors
1. Check Search API URL configuration
2. Verify environment variables are set
3. Check network connectivity to Search API

## Development vs Production

| Aspect | Development | Production |
|--------|-------------|------------|
| Frontend Serving | Vite dev server | Express static files |
| Port | 5173 (frontend), 3001 (backend) | Single port (8080) |
| Process Manager | npm/tsx | PM2 |
| Environment | NODE_ENV=development | NODE_ENV=production |
| Logs | Console | PM2 log files |

## Security Notes

- The application uses Helmet for security headers
- CORS is configured for the frontend URL
- Admin endpoints require API key authentication
- Environment variables should be kept secure
- Use HTTPS in production (configured at reverse proxy level)
