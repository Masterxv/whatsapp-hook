"use client";

import { useFormState } from "react-dom";

export function Form({
	children,
	action
}: {
	children: React.ReactNode;
	action: (prevState: any, formData: FormData) => Promise<ActionResult>;
}) {
	const [state, formAction] = useFormState(action, {
		error: null
	});
	return (
		<form action={formAction}>
			{children}
			<div>{state.error}</div>
		</form>
	);
}

export interface ActionResult {
	error: string | null;
}