import React, { useState } from "react";

import { cn } from "../../../../lib/utils";
import { Icons } from "../../../components/Icons";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function RegisterForm({ className, ...props }: UserAuthFormProps) {
  const [visible, setVisible] = useState(false);
  let inputType = visible ? "text" : "password";
  console.log(inputType);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<any>({});

  const nameRegex = /^[A-Za-z]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passRegex =
    /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    const form = event.target as HTMLFormElement;
    // Client-side validation
    const errors: any = {};
    if (!form.username.value) {
      errors.username = "Name is required.";
    } else if (form.username.value.length < 3) {
      errors.username = "Name must be at least 3 characters long.";
    } else if (!nameRegex.test(form.username.value)) {
      errors.username = "Name should contain only alphabets";
    }
    if (!form.email.value) {
      errors.email = "Email is required.";
    } else if (!emailRegex.test(form.email.value)) {
      errors.email = "Invalid email format.";
    }
    if (!form.password.value) {
      errors.password = "Password is required.";
    } else if (form.password.value.length < 8) {
      errors.password = "Password must be at least 8 characters long.";
    } else if (!passRegex.test(form.password.value)) {
      errors.password =
        "Password should include at least one uppercase letter, one lowercase letter, one number, and one special character.";
    }
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setIsLoading(false);
      return;
    }
    const data = {
      username: form.username.value,
      email: form.email.value,
      password: form.password.value,
    };

    // console.log(data);

    try {
      const response = await fetch("http://localhost:8080/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        alert("Registration successful!");

        // Send verification email
        const verificationResponse = await fetch(
          "http://localhost:8080/send-verification",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: data.email,
              verificationToken: responseData.verificationToken,
            }),
          }
        );

        if (verificationResponse.ok) {
          alert("Verification email sent successfully!");
        } else {
          const errorData = await verificationResponse.json();
          console.log(errorData);
          alert(`Error sending verification email: ${errorData.error}`);
        }
      } else {
        const errorData = await response.json();
        console.log(errorData);
        setFormErrors({ server: errorData.message });
        setIsLoading(false);
        // alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      setFormErrors({ server: "An error occurred during login." });

      // alert("An error occurred during registration.");
    }

    setIsLoading(false);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        {/* Display validation errors */}
        {formErrors.server && (
          <p className="text-red-500 text-sm">{formErrors.server}</p>
        )}
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="pb-1" htmlFor="username">
              Name
            </Label>
            <Input
              id="username"
              placeholder="John Doe"
              type="text"
              autoCapitalize="none"
              autoComplete="name"
              autoCorrect="off"
              disabled={isLoading}
            />
            {formErrors.username && (
              <p className="text-red-500 text-sm">{formErrors.username}</p>
            )}
          </div>

          <div className="grid gap-1 pt-3">
            <Label className="pb-1" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
            {formErrors.email && (
              <p className="text-red-500 text-sm">{formErrors.email}</p>
            )}
          </div>

          <div className="grid gap-1 pt-3 pb-2 relative">
            <Label className="pb-1" htmlFor="password">
              Password
            </Label>
            <div className="flex items-center">
              <Input
                id="password"
                placeholder="At least 8 digit password"
                type={inputType}
                autoCapitalize="none"
                autoComplete="password"
                autoCorrect="off"
                disabled={isLoading}
              />
              <span
                className="cursor-pointer absolute right-3"
                onClick={() => setVisible(!visible)}
              >
                {visible ? <FaRegEye /> : <FaRegEyeSlash />}
              </span>
            </div>
            {formErrors.password && (
              <p className="text-red-500 text-sm">{formErrors.password}</p>
            )}
          </div>

          <Button type="submit" disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Create account
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        Demo Login
      </Button>
    </div>
  );
}
