import { PawPrintIcon } from "lucide-react";
import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <PawPrintIcon className="size-6" />
          </div>
          <span className='font-bold text-2xl'>Fur Ever Home</span>
        </a>
        <LoginForm />
      </div>
    </div>
  );
}