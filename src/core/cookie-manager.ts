import fs from 'fs';
import path from 'path';
import { BrowserContext, Cookie } from 'puppeteer';

const ensureJsonExtension = (filePath: string): string => {
	const parsedPath = path.parse(filePath);
	return path.format({
		...parsedPath,
		base: undefined,
		ext: '.json'
	});
};

const getCookies = async (context: BrowserContext, pathCookies: string): Promise<boolean> => {
	const pathFile = path.resolve(ensureJsonExtension(pathCookies));
	if (!fs.existsSync(pathFile)) return false;

	const cookies: Cookie[] = JSON.parse(fs.readFileSync(pathFile, 'utf-8'));
	if (cookies.length === 0) return false;
	await context.setCookie(...cookies);
	console.log(`✅ restore cookie ${pathFile.split('/').pop()} success`);
	return true;
};

const createCookies = async (context: BrowserContext, pathCookies: string): Promise<void> => {
	const pathFile = path.resolve(ensureJsonExtension(pathCookies));
	if (fs.existsSync(pathFile)) return;

	const dirname = path.dirname(pathFile);
	if (!fs.existsSync(dirname)) {
		fs.mkdirSync(dirname, { recursive: true });
	}

	const cookies: Cookie[] = await context.cookies();
	fs.writeFileSync(pathFile, JSON.stringify(cookies, null, 2));
	console.log(`✅ create cookie ${pathFile.split('/').pop()} success`);
};

const deleteCookies = async (pathCookies: string): Promise<void> => {
	const pathFile = path.resolve(ensureJsonExtension(pathCookies));
	if (!fs.existsSync(pathFile)) return;

	fs.unlinkSync(pathFile);
	console.log(`✅ delete cookie ${pathFile.split('/').pop()} success`);
};

export { getCookies, createCookies, deleteCookies };
