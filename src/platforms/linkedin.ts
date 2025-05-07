import { BaseController } from '../core/base-controller';

class LinkedinController extends BaseController {
	constructor(
		protected readonly pathCookies: string,
		protected readonly credentials: { email: string; password: string }
	) {
		super(pathCookies, 'https://www.linkedin.com');
	}

	protected async needsLogin(): Promise<boolean> {
		const currentUrl = this.page.url();
		const isVisible = await this.page.evaluate(() => {
			const links = document.querySelectorAll('a');
			for (const link of links) {
				const href = link.href.toLowerCase();
				const text = link.textContent?.toLowerCase() || '';
				if (
					['login', 'signup', 'forgot-password', 'password-reset', 'sign-in', 'log-in'].some(
						(keyword) => href.includes(keyword) || text.includes(keyword)
					)
				) {
					return true;
				}
			}
			return false;
		});
		return (
			isVisible ||
			currentUrl.includes('login') ||
			currentUrl.includes('signup') ||
			currentUrl.includes('checkpoint') ||
			currentUrl.includes('challenge')
		);
	}

	protected async login(): Promise<boolean> {
		try {
			await this.page.goto(`${this.baseUrl}/login`, {
				waitUntil: 'networkidle0'
			});
			if (!this.credentials.email || !this.credentials.password) {
				console.error(
					'❌ Linkedin credentials not configured. Set LINKEDIN_EMAIL and LINKEDIN_PASSWORD environment variables.'
				);
				return false;
			}

			await this.page.type('input[type="email"]', this.credentials.email, {
				delay: 100
			});
			await this.page.type('input[type="password"]', this.credentials.password, {
				delay: 100
			});
			await new Promise((r) => setTimeout(r, 1000));
			await this.page.click('button[type="submit"]', { delay: 100 });
			await this.page.waitForNavigation({
				waitUntil: 'domcontentloaded'
			});
			await new Promise((r) => setTimeout(r, 2000));

			let isTwoStepVerification = false;
			let currentUrl = this.page.url();
			if (currentUrl.includes('checkpoint') || currentUrl.includes('challenge')) {
				console.log('⚠️ Two-step verification required please solve it manually puzzle');
				isTwoStepVerification = true;
				while (isTwoStepVerification) {
					await new Promise((r) => setTimeout(r, 1000));
					currentUrl = this.page.url();
					if (!currentUrl.includes('checkpoint') && !currentUrl.includes('challenge')) {
						isTwoStepVerification = false;
					}
				}
			}

			currentUrl = this.page.url();
			if (
				currentUrl.includes('login') ||
				currentUrl.includes('signup') ||
				currentUrl.includes('checkpoint') ||
				currentUrl.includes('challenge')
			) {
				console.error('❌ Login failed. Please check your email and password.');
				return false;
			}

			console.log('✅ Login successful');
			return true;
		} catch (error) {
			console.error(`❌ Login failed to Linkedin: ${error}`);
			return false;
		}
	}
}

export { LinkedinController };
