import { BaseController } from '../core/base-controller';

class FacebookController extends BaseController {
	constructor(
		protected readonly pathCookies: string,
		protected readonly credentials: { email: string; password: string }
	) {
		super(pathCookies, 'https://web.facebook.com');
	}

	protected async needsLogin(): Promise<boolean> {
		const currentUrl = this.page.url();
		const isVisible = await this.page.evaluate(() => {
			const email = document.querySelector('input[name="email"]');
			const pass = document.querySelector('input[name="pass"]');
			const login = document.querySelector('button[name="login"]');
			return email || pass || login ? true : false;
		});
		return (
			isVisible || currentUrl.includes('login') || currentUrl.includes('two_step_verification')
		);
	}

	protected async login(): Promise<boolean> {
		try {
			if (!this.credentials.email || !this.credentials.password) {
				console.error(
					'❌ Facebook credentials not configured. Set FB_EMAIL and FB_PASSWORD environment variables.'
				);
				return false;
			}

			await this.page.type('input[name="email"]', this.credentials.email, {
				delay: 100
			});
			await this.page.type('input[name="pass"]', this.credentials.password, {
				delay: 100
			});
			await new Promise((r) => setTimeout(r, 1000));
			await this.page.click('button[name="login"]', { delay: 100 });
			await this.page.waitForNavigation({
				waitUntil: 'networkidle0'
			});
			await new Promise((r) => setTimeout(r, 2000));

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
			if (currentUrl.includes('login') || currentUrl.includes('two_step_verification')) {
				console.error('❌ Login failed. Please check your email and password.');
				return false;
			}

			console.log('✅ Login successful');
			return true;
		} catch (error) {
			console.error(`❌ Login failed to Facebook: ${error}`);
			return false;
		}
	}
}

export { FacebookController };
