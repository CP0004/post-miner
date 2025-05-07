import { Browser, Viewport } from 'puppeteer';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

puppeteer.use(StealthPlugin());

class BrowserController {
	private browser: Browser | null;
	private defaultViewport: Viewport | null;
	private headless: boolean;

	constructor(headless: boolean = false, defaultViewport: Viewport | null = null) {
		this.headless = headless;
		this.defaultViewport = defaultViewport;
		this.browser = null;
	}

	public init = async (): Promise<void> => {
		this.browser = await puppeteer.launch({
			headless: this.headless,
			defaultViewport: this.defaultViewport ?? null,
			args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu']
		});
	};

	public getBrowser = (): Browser => {
		if (!this.browser) {
			throw new Error('❌ Browser not initialized');
		}
		return this.browser;
	};

	public close = async (): Promise<void> => {
		if (this.browser) {
			await this.browser.close();
			this.browser = null;
		}
	};
}

export { BrowserController };
