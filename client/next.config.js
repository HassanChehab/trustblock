/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,

	async redirects() {
		return [
			{
				source: "/",
				destination: "/home",
				permanent: true,
			},
		];
	},

	images: {
		// Add my server url
		domains: ["localhost"],
	},

	env: {
		SERVER_URL: "http://localhost:4000",
		NEXTAUTH_SECRET: "superSecret!hello",
		NEXTAUTH_FROM: "hassan.dev.smtp@gmail.com",
		NEXTAUTH_EMAIL_SERVER:
			"smtp://hassan.dev.smtp@gmail.com:zwpcenusxbkvpzuv@smtp.gmail.com:587",
	},
};

module.exports = nextConfig;
