import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";
import { buttonVariants } from "../../components/ui/button";
import backgroundImage from "../assets/authImage.webp";
import { ForgotPasswordForm } from "../features/authentication/components/ForgotPasswordForm";
import logo from "../assets/logo.png";

export default function ForgotPasswordPage() {
  return (
    <>
      <div className="md:hidden"></div>
      <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0 bg-background text-foreground">
        <Link
          to="/login"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "absolute right-6 top-6 md:right-8 md:top-8"
          )}
        >
          Login
        </Link>
        <div
          className="relative hidden h-full flex-col  p-10 text-black dark:border-r lg:flex"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="relative z-20 flex items-center text-lg font-medium">
            <img src={logo} alt="Expenze Logo" className=" w-40 my-4" />
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Password Recovery
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your details below to recover your account
              </p>
            </div>
            <ForgotPasswordForm />
          </div>
        </div>
      </div>
    </>
  );
}
