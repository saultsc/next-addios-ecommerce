import type { Metadata } from 'next';
import './globals.css';

import { titleFonts } from '@/config/fonts';

export const metadata: Metadata = {
	title: 'Abibas | Tienda virtual',
	description: 'Tienda virtual de productos',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${titleFonts.className} antialiased`}>{children}</body>
		</html>
	);
}
