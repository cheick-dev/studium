import Link from "next/link";
import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
	return (
		<div className="min-h-screen flex items-center justify-center">
			<div className="max-w-md w-full px-6 py-8 shadow-md rounded-lg">
				<h1 className="text-2xl font-bold text-center mb-6">
					Create Account
				</h1>
				<RegisterForm />
				<p className="mt-4 text-center text-sm ">
					Already have an account?{" "}
					<Link href="/auth/login" className=" hover:underline">
						Sign in
					</Link>
				</p>
			</div>
		</div>
	);
}
