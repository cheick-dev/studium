import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { JWT } from "next-auth/jwt";

interface CustomToken extends JWT {
	id: string;
	email: string;
	role?: string;
}

const handler = NextAuth({
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials.password) {
					throw new Error("Missing email or password");
				}

				// Vérifiez si l'utilisateur existe
				const user = await db.user.findUnique({
					where: { email: credentials.email },
				});

				if (!user) {
					throw new Error("User not found");
				}

				// Vérifiez le mot de passe
				const isValid = await bcrypt.compare(
					credentials.password,
					user.password
				);

				if (!isValid) {
					throw new Error("Invalid credentials");
				}

				const { password, ...userWithoutPassword } = user;
				return userWithoutPassword;
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				token.email = user.email;
				token.name = user.name;
			}
			return token;
		},
		async session({ session, token }) {
			if (token) {
				const user = await db.user.findUnique({
					where: {
						id: (token as CustomToken).id,
					},
				});
				session.user = {
					id: (token as CustomToken).id,
					email: (token as CustomToken).email,
					role: user?.role,
					name: user?.name,
				};
			}
			return session;
		},
	},
	session: {
		strategy: "jwt",
	},
	secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
