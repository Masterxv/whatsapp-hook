import Link from "next/link";
import { Scrypt } from "lucia";

import { db } from "@/lib/db";
import { cookies } from "next/headers";
import { lucia, validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Form } from "@/lib/form";

import type { DatabaseUser } from "@/lib/db";
import type { ActionResult } from "@/lib/form";

export default async function Page() {
	const { user } = await validateRequest();
	if (user) {
		return redirect("/next");
	}
	return (
		<div className="p-32">
			<h1 className="text-4xl mb-4">Sign in</h1>
			<Form action={login}>
				<label className="mr-2" htmlFor="username">Username</label>
				<input className="mb-4 input-sm" name="username" id="username" />
				<br />
				<label className="mr-2" htmlFor="password">Password</label>
				<input className="mb-4 input-sm" type="password" name="password" id="password" />
				<br />
				<button className="btn btn-primary mb-6">Continue</button>
			</Form>
			<Link href="/signup" className="btn btn-secondary">Create an account</Link>
		</div>
	);
}

async function login(_: any, formData: FormData): Promise<ActionResult> {
	"use server";
	const username = formData.get("username");
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

	const existingUser = db.prepare("SELECT * FROM user WHERE username = ?").get(username) as
		| DatabaseUser
		| undefined;
	if (!existingUser) {
		return {
			error: "Incorrect username or password"
		};
	}

	const validPassword = await new Scrypt().verify(existingUser.password, password);
	if (!validPassword) {
		return {
			error: "Incorrect username or password"
		};
	}

	const session = await lucia.createSession(existingUser.id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	return redirect("/next");
}