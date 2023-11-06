import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";
import { buttonVariants } from "../../components/ui/button";
import { RegisterForm } from "../features/authentication/components/RegisterForm";
export default function AuthenticationPage() {
  return (
    <>
      <div className="md:hidden"></div>
      <div className="bg-background text-foreground container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:px-0">
        <Link
          to="/"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "absolute left-6 top-6 md:left-8 md:top-8"
          )}
        >
          Return To Home Page
        </Link>
        <Link
          to="/login"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "absolute right-6 top-6 md:right-8 md:top-8"
          )}
        >
          Login
        </Link>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p>
            </div>
            <RegisterForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                to="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
