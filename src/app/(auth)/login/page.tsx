import { LoginForm } from "@/features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Admin<span className="text-primary">Pro</span>
          </h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Scalable Enterprise Dashboard
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
