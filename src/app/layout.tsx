import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

export const metadata = {
	title: {
		default: 'Addios',
		template: 'Addios | %s',
	},
	description: 'A layout with no additional structure or styling.',
};

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="es">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				{children}
			</body>
		</html>
	);
}
