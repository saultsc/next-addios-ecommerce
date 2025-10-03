export const Footer = () => {
	return (
		<footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
			<p className="text-sm text-muted-foreground">
				&copy; {new Date().getFullYear()} Your Company. All rights reserved.
			</p>
			<a href="/privacy" className="text-sm text-primary hover:underline">
				Privacy Policy
			</a>
			<a href="/terms" className="text-sm text-primary hover:underline">
				Terms of Service
			</a>
		</footer>
	);
};
