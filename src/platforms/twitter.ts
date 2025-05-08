import { BaseController } from '../core/base-controller';
import type { Viewport } from 'puppeteer';
class TwitterController extends BaseController {
	constructor(
		protected readonly pathCookies: string,
		protected readonly credentials: { email: string; password: string },
		protected headless: boolean = false,
		protected defaultViewport: Viewport | null = null
	) {
		super(pathCookies, 'https://www.x.com', headless, defaultViewport);
	}

	protected async needsLogin(): Promise<boolean> {
		const currentUrl = this.page.url();
		return (
			!currentUrl.includes('home') ||
			currentUrl.includes('signup') ||
			currentUrl.includes('login') ||
			currentUrl.includes('two_step_verification')
		);
	}

	protected async login(): Promise<boolean> {
		try {
			await this.page.goto(`${this.baseUrl}/login`, {
				waitUntil: 'networkidle0'
			});
			if (!this.credentials.email || !this.credentials.password) {
				console.error(
					'❌ Twitter credentials not configured. Set TWITTER_EMAIL and TWITTER_PASSWORD environment variables.'
				);
				return false;
			}

			await this.page.type('input[autocomplete="username"]', this.credentials.email, {
				delay: 100
			});

			await this.page.evaluate(() => {
				const buttons = Array.from(document.querySelectorAll('button'));
				const nextButton = buttons.find(
					(button) => button.textContent && button.textContent.toLowerCase().includes('next')
				);
				if (nextButton) nextButton.click();
			});
			await new Promise((r) => setTimeout(r, 1000));
			await this.page.type('input[name="password"]', this.credentials.password, {
				delay: 100
			});
			await this.page.evaluate(() => {
				const buttons = Array.from(document.querySelectorAll('button'));
				const loginButton = buttons.find(
					(button) =>
						button.textContent &&
						(button.textContent.toLowerCase().includes('log in') ||
							button.textContent.toLowerCase().includes('login'))
				);
				if (loginButton) loginButton.click();
			});
			await this.page.waitForNavigation({
				waitUntil: 'domcontentloaded'
			});

			let isTwoStepVerification = false;
			let currentUrl = this.page.url();
			if (currentUrl.includes('two_step_verification')) {
				console.log('⚠️ Two-step verification required please solve it manually puzzle');
				isTwoStepVerification = true;
				while (isTwoStepVerification) {
					await new Promise((r) => setTimeout(r, 1000));
					currentUrl = this.page.url();
					if (!currentUrl.includes('two_step_verification')) {
						isTwoStepVerification = false;
					}
				}
			}

			currentUrl = this.page.url();
			if (
				currentUrl.includes('recover') ||
				currentUrl.includes('login') ||
				currentUrl.includes('two_step_verification')
			) {
				console.error('❌ Login failed. Please check your email and password.');
				return false;
			}

			console.log('✅ Login successful');
			return true;
		} catch (error) {
			console.error(`❌ Login failed to Twitter: ${error}`);
			return false;
		}
	}
}

export { TwitterController };
