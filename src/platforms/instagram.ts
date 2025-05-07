import { BaseController } from '../core/base-controller';

class InstagramController extends BaseController {
	constructor(
		protected readonly pathCookies: string,
		protected readonly credentials: { email: string; password: string }
	) {
		super(pathCookies, 'https://www.instagram.com');
	}

	protected async needsLogin(): Promise<boolean> {
		const currentUrl = this.page.url();
		const isVisible = await this.page.evaluate(() => {
			const email = document.querySelector('input[name="username"]');
			const pass = document.querySelector('input[name="password"]');
			const login = document.querySelector('button[type="submit"]');
			return email || pass || login ? true : false;
		});
		return isVisible || currentUrl.includes('login') || currentUrl.includes('auth_platform');
	}

	protected async login(): Promise<boolean> {
		try {
			if (!this.credentials.email || !this.credentials.password) {
				console.error(
					'❌ Instagram credentials not configured. Set INSTAGRAM_EMAIL and INSTAGRAM_PASSWORD environment variables.'
				);
				return false;
			}

			await this.page.type('input[name="username"]', this.credentials.email, {
				delay: 100
			});
			await this.page.type('input[name="password"]', this.credentials.password, {
				delay: 100
			});
			await new Promise((r) => setTimeout(r, 1000));
			await this.page.click('button[type="submit"]', { delay: 100 });
			await this.page.waitForNavigation({
				waitUntil: 'networkidle0'
			});
			await new Promise((r) => setTimeout(r, 2000));

			let isTwoStepVerification = false;
			let currentUrl = this.page.url();
			if (currentUrl.includes('auth_platform')) {
				console.log('⚠️ Two-step verification required please solve it manually puzzle');
				isTwoStepVerification = true;
				while (isTwoStepVerification) {
					await new Promise((r) => setTimeout(r, 1000));
					currentUrl = this.page.url();
					if (!currentUrl.includes('auth_platform')) {
						isTwoStepVerification = false;
					}
				}
			}

			currentUrl = this.page.url();
			if (currentUrl.includes('login') || currentUrl.includes('auth_platform')) {
				console.error('❌ Login failed. Please check your email and password.');
				return false;
			}

			console.log('✅ Login successful');
			return true;
		} catch (error) {
			console.error(`❌ Login failed to Instagram: ${error}`);
			return false;
		}
	}
}

export { InstagramController };
