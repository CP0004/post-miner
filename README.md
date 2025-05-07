# Post-Miner

A powerful SDK for automating login and scraping workflows across multiple social media platforms using Puppeteer.

## Features

- **Multi-Platform Support**: Facebook, Instagram, LinkedIn, Twitter
- **Automated Authentication**: Secure login with credentials or saved sessions
- **Cookie Management**: Persistent sessions between runs
- **Consent Dialog Handling**: Automatic handling of cookie consent dialogs
- **Screenshot Capabilities**: For debugging and verification
- **Stealth Mode**: Enhanced detection avoidance

## Installation

```bash
# Install the package
npm install post-miner-engine

# Or using yarn
yarn add post-miner-engine
```

## Build

Before using the library, build it with:

```bash
npm run build
```

## Configuration

Set up your credentials as environment variables:

```bash
# Linux/macOS
export FACEBOOK_EMAIL=your_email@example.com
export FACEBOOK_PASSWORD=your_password
export INSTAGRAM_EMAIL=your_email@example.com
export INSTAGRAM_PASSWORD=your_password
export TWITTER_EMAIL=your_email@example.com
export TWITTER_PASSWORD=your_password
export LINKEDIN_EMAIL=your_email@example.com
export LINKEDIN_PASSWORD=your_password

# Windows PowerShell
$env:FACEBOOK_EMAIL="your_email@example.com"
$env:FACEBOOK_PASSWORD="your_password"
# ... similarly for other platforms
```

Alternatively, create a `.env` file:

```
FACEBOOK_EMAIL=your_email@example.com
FACEBOOK_PASSWORD=your_password
INSTAGRAM_EMAIL=your_email@example.com
INSTAGRAM_PASSWORD=your_password
TWITTER_EMAIL=your_email@example.com
TWITTER_PASSWORD=your_password
LINKEDIN_EMAIL=your_email@example.com
LINKEDIN_PASSWORD=your_password
```

## Usage

```typescript
import { FacebookController, InstagramController, LinkedinController, TwitterController } from 'post-miner-engine';
import dotenv from 'dotenv';
dotenv.config();

// Initialize Facebook controller
const facebookController = new FacebookController(
  './cookies/cookies-facebook.json', // Path to store cookies
  {
    email: process.env.FACEBOOK_EMAIL || '',
    password: process.env.FACEBOOK_PASSWORD || ''
  }
);

// Example: Initialize and use Facebook controller
async function run() {
  try {
    // Initialize the controller (this handles login if needed)
    await facebookController.init();
    
    // Get the page object for custom operations
    const page = facebookController.getPage();
    
    // Perform your custom actions with the page
    // For example: await page.goto('https://facebook.com/some_profile');
    
    // Close the browser when done
    await facebookController.close();
  } catch (error) {
    console.error('Error:', error);
    await facebookController.close();
  }
}

run();
```

## Platform-Specific Controllers

Each platform has its own controller with the same interface:

```typescript
// Instagram example
const instagramController = new InstagramController(
  './cookies/cookies-instagram.json',
  {
    email: process.env.INSTAGRAM_EMAIL || '',
    password: process.env.INSTAGRAM_PASSWORD || ''
  }
);

// LinkedIn example
const linkedinController = new LinkedinController(
  './cookies/cookies-linkedin.json',
  {
    email: process.env.LINKEDIN_EMAIL || '',
    password: process.env.LINKEDIN_PASSWORD || ''
  }
);

// Twitter example
const twitterController = new TwitterController(
  './cookies/cookies-twitter.json',
  {
    email: process.env.TWITTER_EMAIL || '',
    password: process.env.TWITTER_PASSWORD || ''
  }
);
```

## Development

```bash
# Run in development mode
npm run dev

# Lint code
npm run lint

# Format code
npm run format
```

## Directory Structure

- `src/index.ts` - Main export file
- `src/platforms/` - Platform-specific controllers
- `src/core/` - Shared functionality and utilities

## License

This project is not publicly licensed. See the LICENSE file for details. 