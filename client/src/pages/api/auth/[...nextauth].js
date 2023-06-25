import NextAuth from "next-auth";
import { PrismaClient } from "@prisma/client";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@auth/prisma-adapter";

const prisma = new PrismaClient();

export const authOptions = {
	// Providers Configuration
	adapter: PrismaAdapter(prisma),
	secret: process.env.NEXTAUTH_SECRET,
	providers: [
		EmailProvider({
			from: process.env.NEXTAUTH_FROM,
			server: process.env.NEXTAUTH_EMAIL_SERVER,
		}),
	],
	session: {
		jwt: true,
	},
	pages: {
		// custom pages
	},
	// callbacks: {
	// 	jwt({ token, account, user }) {
	// 		console.log("IN JWT", token, acount, user);
	// 		if (account) {
	// 			token.accessToken = account.access_token;
	// 			token.id = user?.id;
	// 		}
	// 		return token;
	// 	},
	// 	session({ session, token }) {
	// 		console.log("IN SESSION", session, token);
	// 		// I skipped the line below coz it gave me a TypeError
	// 		// session.accessToken = token.accessToken;
	// 		session.user.id = token.id;

	// 		return session;
	// 	},
	// },
	debug: true,
};

export default NextAuth(authOptions);
