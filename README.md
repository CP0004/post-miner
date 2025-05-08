<p align="center">
  <img src="./assets/banner.png" alt="Post Miner Banner" width="100%" />
</p>

<h1 align="center">Post Miner</h1>

<p align="center">
  <strong>Automation SDK for multi-platform login & scraping using Puppeteer.</strong><br />
  Supports: Facebook, Instagram, LinkedIn, Twitter and more SOON
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/post-miner"><img src="https://img.shields.io/npm/v/post-miner?color=blue" /></a>
  <a href="https://github.com/mohamad-aljeiawi/post-miner"><img src="https://img.shields.io/github/stars/mohamad-aljeiawi/post-miner?style=social" /></a>
  <a href="https://github.com/mohamad-aljeiawi/post-miner/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-green" /></a>
</p>

---

## 🚀 Features

- ✅ **Multi-Platform Support**: Facebook, Instagram, LinkedIn, Twitter, etc...
- 🔐 **Automated Login**: Credentials or persistent sessions
- 🍪 **Cookie Management**: Save/load across runs
- 🕵️‍♂️ **Stealth Mode**: Puppeteer-extra for anti-bot detection
- 📦 **Simple API**: Same interface for all platforms
- 📚 **Multiple Sessions**: Multiple sessions and save each cookie for each session without limits.

---

## 📦 Installation

```bash
npm install post-miner
```

---

## 🧑‍💻 Usage

```ts
import { FacebookController } from 'post-miner';

const fb = new FacebookController('./your_pathname/name_cookie.json', {
  email: "your email or whatever credentials login",
  password: "your password or whatever credentials login",
});
await fb.init();

const page = fb.getPage(); // get page instance and control it, same as puppeteer.Page
const context = fb.getContext(); // get context instance and control it, same as puppeteer.BrowserContext
const browser = fb.getBrowser(); // get browser instance and control it, same as puppeteer.Browser

// example of control the page
await page.goto('https://www.facebook.com');

await fb.close(); // close the browser
```

---

## 🧩 Other Platforms

```ts
// create a new instance for each platform supports now, more platforms will be added soon
new FacebookController('./cookies/facebook.json', { email, password });
new InstagramController('./cookies/instagram.json', { email, password });
new LinkedinController('./cookies/linkedin.json', { email, password });
new TwitterController('./cookies/twitter.json', { email, password });
```
Methods:
- `.init()`: initialize the controller.
- `.getPage()`: get the page instance.
- `.close()`: close the browser.
- `.getBrowser()`: get the browser instance.
- `.getContext()`: get the context instance.

Params:
- `pathCookies`: path to the cookies file, if the file not exists, the cookies will be created.
- `credentials`: object with email and password.
- `headless`: boolean to run the browser in headless mode.
- `defaultViewport`: object to set the default viewport.

---

## 🛠️ Development


```bash
git clone https://github.com/mohamad-aljeiawi/post-miner.git
cd post-miner
```

```bash
npm install
```

```bash
npm run build
```

```bash
npm run dev      # Live dev mode test.ts
```

```bash
npm run lint     # Lint code
npm run format   # Format code
```

---

## 🗂️ Project Structure

```
src/
├── core/           # Shared logic: browser, cookies
├── platforms/      # Controllers: Facebook, etc.
├── index.ts        # Entry point
```
---

## 📝 How to add a new platform

1. Create a new controller in the `platforms` folder.
2. Add the controller to the `index.ts` file.
3. Add the controller to the `test.ts` file.
4. Add the controller to the `README.md` file.

### platform example
example of platform controller:
```ts
import { BaseController } from '../core/base-controller';

class PlatformController extends BaseController {

  constructor(pathCookies: string, credentials: { email: string; password: string }, headless: boolean = false, defaultViewport: Viewport | null = null) {
    super(pathCookies, 'base url of the platform', headless, defaultViewport);
  }

  protected async needsLogin(): Promise<boolean> {
   // logic to check if the page needs login or not
  }

  protected async login(): Promise<boolean> {
    // logic to login to the platform
  }
}
```

Please use `npm run format` to format the code before commit or push.

---
## 📄 License

MIT © [mohamad-aljeiawi](https://www.linkedin.com/in/mohamad-aljeiawi/)