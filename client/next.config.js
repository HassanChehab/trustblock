/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		// Add my server url
		domains: ["larevuetech.fr", "i.pinimg.com", "wallpapercave.com"],
	},
	env: {
		NEXTAUTH_SECRET: "superSecret!hello",
		NEXTAUTH_FROM: "hassan.dev.smtp@gmail.com",
		NEXTAUTH_EMAIL_SERVER:
			"smtp://hassan.dev.smtp@gmail.com:zwpcenusxbkvpzuv@smtp.gmail.com:587",
	},
};

module.exports = nextConfig;
