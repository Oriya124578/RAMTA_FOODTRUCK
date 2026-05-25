import LoginForm from "./LoginForm";
import { Lock } from "lucide-react";
import Link from "next/link";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const error = params.error;

  return (
    <main className="min-h-screen bg-ramta-ink text-ramta-text font-heebo flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <span className="font-frank-ruhl text-5xl text-ramta-wood font-bold tracking-wider">
              רַמְתָּא
            </span>
          </Link>
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-ramta-wood/10 border border-ramta-wood/30 text-ramta-wood mb-4">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-frank-ruhl font-bold text-ramta-text mb-2">כניסת אדמין</h1>
          <p className="text-sm text-ramta-muted">למטבח ולצוות הניהול בלבד</p>
        </div>

        <LoginForm />
      </div>
    </main>
  );
}
