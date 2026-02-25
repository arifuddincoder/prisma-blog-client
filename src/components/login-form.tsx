"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { useForm } from "@tanstack/react-form";
import { Input } from "./ui/input";
import * as z from "zod";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

const formSchema = z.object({
	password: z.string().min(8, "Minimum length is 8"),
	email: z.email(),
});

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
	const handleGoogleLogin = async () => {
		const data = authClient.signIn.social({
			provider: "google",
			callbackURL: "http://localhost:3000",
		});
	};

	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		validators: { onSubmit: formSchema },
		onSubmit: async ({ value }) => {
			const toastId = toast.loading("Logging user");
			try {
				const { data, error } = await authClient.signIn.email(value);

				if (error) {
					toast.error(error.message, { id: toastId });
					return;
				}

				toast.success("User logged in Successfully", { id: toastId });
			} catch (err) {
				toast.error("Something went wrong, please try again.", { id: toastId });
			}
		},
	});
	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader className="text-center">
					<CardTitle className="text-xl">Login your account</CardTitle>
					<CardDescription>Enter your email below to create your account</CardDescription>
				</CardHeader>
				<CardContent>
					<form
						id="login-form"
						onSubmit={(e) => {
							e.preventDefault();
							form.handleSubmit();
						}}
					>
						<FieldGroup>
							<form.Field
								name="email"
								children={(field) => {
									const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field data-invalid={isInvalid}>
											<FieldLabel htmlFor={field.name}>Email</FieldLabel>
											<Input
												type="email"
												id={field.name}
												name={field.name}
												value={field.state.value}
												onChange={(e) => field.handleChange(e.target.value)}
											/>
											{isInvalid && <FieldError errors={field.state.meta.errors} />}
										</Field>
									);
								}}
							/>
							<form.Field
								name="password"
								children={(field) => {
									const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field data-invalid={isInvalid}>
											<FieldLabel htmlFor={field.name}>Password</FieldLabel>
											<Input
												type="password"
												id={field.name}
												name={field.name}
												value={field.state.value}
												onChange={(e) => field.handleChange(e.target.value)}
											/>
											{isInvalid && <FieldError errors={field.state.meta.errors} />}
										</Field>
									);
								}}
							/>
						</FieldGroup>
					</form>
				</CardContent>
				<CardFooter className="flex flex-col gap-2">
					<Button form="login-form" type="submit" className="w-full">
						Login
					</Button>
					<Button onClick={() => handleGoogleLogin()} variant="outline" type="button" className="w-full">
						Continue with Google
					</Button>
				</CardFooter>
			</Card>
			<FieldDescription className="px-6 text-center">
				By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
			</FieldDescription>
		</div>
	);
}
