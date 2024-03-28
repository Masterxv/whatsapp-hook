import Link from "next/link";

import { db } from "@/lib/db";
import { Scrypt } from "lucia";
import { cookies } from "next/headers";
import { lucia, validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Form } from "@/lib/form";
import { generateId } from "lucia";
import { SqliteError } from "better-sqlite3";

import type { ActionResult } from "@/lib/form";

export default async function Page() {
	const { user } = await validateRequest();
	if (user) {
		return redirect("/next");
	}
	return (
		<div className="p-32">
			<h1 className="text-4xl mb-4">Create an account</h1>
			<Form action={signup}>
				<label className="mr-2" htmlFor="username">Username</label>
				<input className="mb-4 input-sm" name="username" id="username" />
				<br />
				<label className="mr-2"  htmlFor="password">Password</label>
				<input className="mb-4 input-sm" type="password" name="password" id="password" />
				<br />
				<button className="btn btn-primary mb-6">Continue</button>
			</Form>
			<Link href="/next/login" className="btn btn-secondary">Sign in</Link>
		</div>
	);
}

async function signup(_: any, formData: FormData): Promise<ActionResult> {
	"use server";
	const username = formData.get("username");
	// username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
	// keep in mind some database (e.g. mysql) are case insensitive
	if (
		typeof username !== "string" ||
		username.length < 3 ||
		username.length > 31 ||
		!/^[a-z0-9_-]+$/.test(username)
	) {
		return {
			error: "Invalid username"
		};
	}
	const password = formData.get("password");
	if (typeof password !== "string" || password.length < 6 || password.length > 255) {
		return {
			error: "Invalid password"
		};
	}

	const hashedPassword = await new Scrypt().hash(password);
	const userId = generateId(15);

	try {
		db.prepare("INSERT INTO user (id, username, password) VALUES(?, ?, ?)").run(
			userId,
			username,
			hashedPassword
		);

		const session = await lucia.createSession(userId, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	} catch (e) {
		if (e instanceof SqliteError && e.code === "SQLITE_CONSTRAINT_UNIQUE") {
			return {
				error: "Username already used"
			};
		}
		return {
			error: "An unknown error occurred"
		};
	}
	return redirect("/next");
}