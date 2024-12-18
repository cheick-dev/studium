import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
	return (
		<div className="min-h-screen flex items-center justify-center">
			<div className="max-w-md w-full px-6 py-8  shadow-md rounded-lg">
				<h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>
				<LoginForm />
				<p className="mt-4 text-center text-sm">
					Don&apos;t have an account?{" "}
					<Link href="/auth/register" className=" hover:underline">
						Sign up
					</Link>
				</p>
			</div>
		</div>
	);
}
