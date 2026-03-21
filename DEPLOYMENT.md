# Deployment Instructions for Render.com

## Quick Deploy

This project is configured to deploy automatically with the included `render.yaml` file.

### Method 1: Automatic Deploy (Recommended)

1. Push this repository to GitHub
2. Go to [Render Dashboard](https://dashboard.render.com/)
3. Click "New" → "Blueprint"
4. Connect your GitHub repository
5. Render will detect `render.yaml` and configure everything automatically

### Method 2: Manual Deploy

If you prefer to set up manually:

1. **Create a Web Service**
   - Go to Render Dashboard
   - Click "New" → "Web Service"
   - Connect your GitHub repo

2. **Configure Build Settings**
   - Name: `anduril-contracts`
   - Environment: `Node`
   - Build Command: `cd frontend && npm install && npm run build && cd ../backend && npm install`
   - Start Command: `cd backend && NODE_ENV=production npm start`

3. **Environment Variables**
   - `NODE_ENV` = `production`
   - `PORT` = `10000` (Render default)

4. **Health Check**
   - Path: `/api/health`

## Custom Domain Setup (Cloudflare)

After your service is deployed on Render:

1. **Get Render URL**
   - Your service will have a URL like: `https://anduril-contracts.onrender.com`

2. **Configure Cloudflare DNS**
   - Go to your Cloudflare dashboard
   - Select domain: `eliorrabinian.com`
   - Go to DNS settings
   - Add a CNAME record:
     - Type: `CNAME`
     - Name: `@` (for root domain) or `www`
     - Target: `anduril-contracts.onrender.com`
     - Proxy status: DNS only (gray cloud)

3. **Add Custom Domain in Render**
   - Go to your Render service settings
   - Click "Custom Domain"
   - Add: `eliorrabinian.com`
   - Render will verify and provide SSL certificate

4. **Final Cloudflare Settings**
   - After Render verification, you can enable proxy (orange cloud)
   - Enable "Always Use HTTPS" in SSL/TLS settings

## Environment Variables

The following environment variables are used:

- `NODE_ENV` - Set to `production` for Render
- `PORT` - Automatically set by Render (usually 10000)

## URLs

- **Local Development**: http://localhost:5000
- **Render**: https://anduril-contracts.onrender.com
- **Production**: https://eliorrabinian.com

## Notes

- Free tier on Render may spin down after inactivity (30 min)
- First request after spin-down takes ~30 seconds
- Consider paid plan for always-on service
