import NextAuth from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "/lib/mongodb";
import connectDB from "../../../lib/connectDB";
import User from "../../../models/userModel";
import bcrypt from "bcryptjs";

import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

// async function refreshAccessToken(token) {
// 	try {
// 		const url =
// 			"https://oauth2.googleapis.com/token?" +
// 			new URLSearchParams({
// 				client_id: process.env.GOOGLE_CLIENT_ID,
// 				client_secret: process.env.GOOGLE_CLIENT_SECRET,
// 				grant_type: "refresh_token",
// 				refresh_token: token.refreshToken,
// 			});
// 		console.log(url);
// 		const response = await fetch(url, {
// 			headers: {
// 				"Content-Type": "application/x-www-form-urlencoded",
// 			},
// 			method: "POST",
// 		});
// 		console.log(response.headers);
// 		const refreshedTokens = await response.json();
// 		console.log(refreshedTokens);

// 		if (!response.ok) {
// 			throw refreshedTokens;
// 		}

// 		return {
// 			...token,
// 			accessToken: refreshedTokens.access_token,
// 			accessTokenExpires: Date.now() + tokens.expires_in * 1000,
// 			refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
// 		};
// 	} catch (error) {
// 		console.log(error);

// 		return {
// 			...token,
// 			error: "RefreshAccessTokenError",
// 		};
// 	}
// }

export default NextAuth({
	adapter: MongoDBAdapter(clientPromise),
	session: {
		strategy: "jwt",
	},
	jwt: {
		maxAge: 30 * 24 * 60 * 60,
	},
	providers: [
		CredentialsProvider({
			// The name to display on the sign in form (e.g. "Sign in with...")
			name: "Credentials",
			// The credentials is used to generate a suitable form on the sign in page.
			// You can specify whatever fields you are expecting to be submitted.
			// e.g. domain, username, password, 2FA token, etc.
			// You can pass any HTML attribute to the <input> tag through the object.
			credentials: {
				email: { label: "Email", type: "email", placeholder: "jsmith" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials, req) {
				// Add logic here to look up the user from the credentials supplied
				connectDB();
				const { email, password } = credentials;

				const user = await User.findOne({ email: email });

				if (!user) {
					return res
						.status(404)
						.json({ error: "user dont exists with that email" });
				} else {
				}
				const doMatch = await bcrypt.compare(password, user.password);

				if (!doMatch) {
					return res.status(401).json({ error: "Invalid credentials" });
				}

				const { email, _id, name, image } = user;

				if (user) {
					// Any object returned will be saved in `user` property of the JWT

					return user;
				} else {
					// If you return null then an error will be displayed advising the user to check their details.
					return null;

					// You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
				}
			},
		}),

		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
		GitHubProvider({
			clientId: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
		}),
	],
	pages: {
		signIn: "/auth/login",
	},
	callbacks: {
		// async jwt({ token, account }) {
		// 	// Persist the OAuth access_token to the token right after signin
		// 	if (account) {
		// 		token.accessToken = account.access_token;
		// 	}
		// 	return token;
		// },
		// async session({ session, token, user }) {
		// 	// Send properties to the client, like an access_token from a provider.
		// 	session.accessToken = token.accessToken;
		// 	session.userId = token.sub;
		// 	return session;
		// },
		async jwt({ token, account, user }) {
			if (account) {
				token[account.provider] = {
					accessToken: account.oauth_token,
					refreshToken: account.oauth_token_secret,
				};
				token.user = user;
			}

			return token;
		},
		async session({ session, token }) {
			session.user = token.user;
			session.userId = token.sub;
			session.accessToken = token.accessToken;
			session.error = token.error;
			return session;
		},
	},

	database: process.env.DATABASE_URL,
	secret: process.env.SECRET_KEY,
});
