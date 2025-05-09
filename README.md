<p align="center">
  <img src="./assets/banner.png" alt="Post Miner Banner" width="100%" />
</p>

<h1 align="center">Post Miner</h1>

<p align="center">
  <strong>Automation SDK for multi-platform login & scraping using Puppeteer.</strong><br />
  <em>Supports: Facebook, Instagram, LinkedIn, Twitter — and more coming soon.</em>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/post-miner"><img src="https://img.shields.io/npm/v/post-miner?color=blue" /></a>
  <a href="https://github.com/mohamad-aljeiawi/post-miner"><img src="https://img.shields.io/github/stars/mohamad-aljeiawi/post-miner?style=social" /></a>
  <a href="https://github.com/mohamad-aljeiawi/post-miner/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-green" /></a>
</p>

<p align="center"><strong>⚙️ Automate. Extract. Dominate. — One SDK to rule all social scraping.</strong></p>

---

## 👀 Quick Preview

Here’s Post-Miner working on social media sites:

<p align="center">
  <img src="./assets/demo.gif" alt="Post Miner Demo" width="80%" />
</p>

---

## 🚀 Features

- ✅ **Multi-Platform Support**: Facebook, Instagram, LinkedIn, Twitter...
- 🔐 **Automated Login**: Credentials or persistent sessions
- 🍪 **Cookie Management**: Save/load across runs
- 🕵️‍♂️ **Stealth Mode**: Puppeteer-extra for anti-bot detection
- 📦 **Unified API**: Consistent interface across all platforms
- 📚 **Multiple Sessions**: Isolated sessions with per-platform cookie storage

---

## 💡 Use Cases

- Automatically extract product listings from social media and analyze
- Build smart bots that log in, collect data, and interact with users autonomously
- Monitor competitor pages and public profiles across social platforms
- Build custom search engines or classified ad trackers

---

## 📦 Installation

```bash
npm install post-miner
```

---

## 🧑‍💻 Basic Usage

```ts
import { FacebookController } from 'post-miner';

const fb = new FacebookController('./cookies/facebook.json', {
  email: 'your-email@example.com',
  password: 'your-password',
});

await fb.init();

const page = fb.getPage(); // Puppeteer Page instance
await page.goto('https://www.facebook.com');

await fb.close(); // Close the browser session
```

---

## 🧩 Other Platforms

```ts
new FacebookController('./cookies/facebook.json', { email, password });
new InstagramController('./cookies/instagram.json', { email, password });
new LinkedinController('./cookies/linkedin.json', { email, password });
new TwitterController('./cookies/twitter.json', { email, password });
```

### API Methods:
- `.init()`: initialize controller
- `.getPage()`: get Puppeteer page
- `.getBrowser()`: get browser instance
- `.getContext()`: get context instance
- `.close()`: clean shutdown

### Parameters:
- `pathCookies`: file path to store/load cookies
- `credentials`: `{ email, password }`
- `headless`: boolean (default: false)
- `defaultViewport`: `{ width, height }` or `null`

---

## 🛠️ Development

```bash
git clone https://github.com/mohamad-aljeiawi/post-miner.git
cd post-miner
npm install
npm run dev       # Run test.ts in live dev mode
```

```bash
npm run build
npm run lint      # Lint code
npm run format    # Format code
```

---

## 🗂️ Project Structure

```
src/
├── core/           # Shared logic: browser, cookies, base controller
├── platforms/      # Platform-specific controllers
├── index.ts        # Entry point
```

---

## 🧱 Add a New Platform

To add support for another website/platform:

1. Create a new controller in the `platforms/` directory.
2. Extend from `BaseController` and implement:
    - `needsLogin()`: logic to detect login screen
    - `login()`: steps to perform login
3. Register the new controller in `index.ts`
4. Add test case in `test.ts`

Example template:

```ts
import { BaseController } from '../core/base-controller';

class PlatformController extends BaseController {
  constructor(pathCookies, credentials, headless = false, defaultViewport = null) {
    super(pathCookies, 'https://platform.com', headless, defaultViewport);
  }

  protected async needsLogin() {
    // Logic to detect login page
  }

  protected async login() {
    // Login steps
  }
}
```

Please run `npm run format` before submitting pull requests.

---

## 🙋‍♂️ Author

Built with 💻 by [Mohamad Al Jeiawi](https://www.linkedin.com/in/mohamad-aljeiawi/)  
Telegram: [@mohamad_aljeiawi](https://t.me/mohamad_aljeiawi)

If you're building tools around scraping, automation, or AI and looking for a contributor or consultant — let’s talk.

---

## ⭐ Support & Feedback

If you find this useful, consider leaving a ⭐ on GitHub.  
Pull requests, suggestions, and feedback are always welcome!

---

## 📄 License

MIT © [Mohamad Al Jeiawi](https://www.linkedin.com/in/mohamad-aljeiawi/)