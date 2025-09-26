# Deployment Guide

## Quick Deploy to Vercel (Recommended)

1. **Push to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Add deployment configuration"
   git push origin main
   ```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Click "Import Project"
   - Select your `eqqplant` repository
   - Add environment variable: `VITE_OPENAI_API_KEY`
   - Click "Deploy"

3. **Your app will be live at**: `https://your-project-name.vercel.app`

## Alternative: Netlify

1. **Push to GitHub**
2. Go to [netlify.com](https://netlify.com)
3. "New site from Git" → Connect GitHub
4. Select your repo
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Add environment variable: `VITE_OPENAI_API_KEY`
7. Deploy!

## Environment Variables

Make sure to set these in your hosting platform:
- `VITE_OPENAI_API_KEY` - Your OpenAI API key

## Custom Domain (Optional)

Both Vercel and Netlify allow you to add a custom domain for free:
- Vercel: Project Settings → Domains
- Netlify: Site Settings → Domain Management
