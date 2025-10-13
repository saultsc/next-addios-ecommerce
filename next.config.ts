import type { NextConfig } from 'next';
import { resolve } from 'path';

const nextConfig: NextConfig = {
	/* config options here */
	turbopack: {
		root: resolve(__dirname),
	},
	allowedDevOrigins: [
		'local-origin.dev',
		'*.local-origin.dev',
		'http://localhost:3000',
		'http://127.0.0.1:3000',
		'http://192.168.0.2:3000',
	],
};

export default nextConfig;
