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
	debug: true,
};

export default NextAuth(authOptions);
