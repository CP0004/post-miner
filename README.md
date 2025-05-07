# Post Miner

A Facebook post scraper using Puppeteer.

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Configure Facebook credentials as environment variables:
   ```
   export FB_EMAIL=your_facebook_email@example.com
   export FB_PASSWORD=your_facebook_password
   ```
   
   For Windows PowerShell:
   ```
   $env:FB_EMAIL="your_facebook_email@example.com"
   $env:FB_PASSWORD="your_facebook_password"
   ```

## Running the Application

Start the application in development mode:
```
npm run dev
```

This will:
1. Launch a browser instance
2. Try to load saved cookies (if any)
3. Log in to Facebook if needed
4. Save cookies for future sessions

## Features

- Automated Facebook login
- Cookie management
- Robust cookie consent dialog handling
- Screenshot capture for debugging

## Directory Structure

- `src/main.ts` - Entry point
- `src/scraper/browser.ts` - Browser initialization
- `src/scraper/login.ts` - Login functionality 