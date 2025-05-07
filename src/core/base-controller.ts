import type { Browser, BrowserContext, Page } from 'puppeteer';
import { BrowserController } from './browser-controller';
import { createCookies, getCookies } from './cookie-manager';

abstract class BaseController {
	protected page!: Page;
	protected context!: BrowserContext;
	protected browser!: Browser;
	protected browserController: BrowserController;

	constructor(
		protected readonly pathCookies: string,
		protected readonly baseUrl: string
	) {
		this.browserController = new BrowserController();
	}

	protected abstract login(): Promise<boolean>;
	protected abstract needsLogin(): Promise<boolean>;

	public async init(): Promise<void> {
		await this.browserController.init();
		this.browser = this.browserController.getBrowser();
		this.context = this.browser.defaultBrowserContext();
		this.page = await this.browser.newPage();

		try {
			await getCookies(this.context, this.pathCookies);
			await this.page.goto(this.baseUrl);
			await new Promise((r) => setTimeout(r, 1000));

			if (await this.needsLogin()) {
				const success = await this.login();
				if (!success) {
					console.error('❌ Login failed, exiting');
					await this.browserController.close();
					process.exit(1);
				}
			}

			await createCookies(this.context, this.pathCookies);
		} catch (err) {
			console.error('❌ Error in main process:', err);
			await this.browserController.close();
			process.exit(1);
		}
	}

	public getPage(): Page {
		if (!this.page) throw new Error('Page not initialized');
		return this.page;
	}

	public getContext(): BrowserContext {
		if (!this.context) throw new Error('Context not initialized');
		return this.context;
	}

	public getBrowser(): Browser {
		if (!this.browser) throw new Error('Browser not initialized');
		return this.browser;
	}

	public async close(): Promise<void> {
		await this.browserController.close();
	}
}

export { BaseController };
