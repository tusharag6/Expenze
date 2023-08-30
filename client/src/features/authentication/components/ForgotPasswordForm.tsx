import React, { useState } from "react";

import { cn } from "../../../../lib/utils";
import { Icons } from "../../../components/Icons";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ForgotPasswordForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<any>({});

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    const form = event.target as HTMLFormElement;
    // Client-side validation
    const errors: any = {};

    if (!form.email.value) {
      errors.email = "Email is required.";
    } else if (!emailRegex.test(form.email.value)) {
      errors.email = "Invalid email format.";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setIsLoading(false);
      return;
    }
    const data = {
      email: form.email.value,
    };

    try {
      console.log(data);
      const response = await fetch("http://localhost:8080/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
        }),
      });

      if (response.ok) {
        alert("Mail Sent!");
      } else {
        const errorData = await response.json();
        console.log(errorData);
        setFormErrors({ server: errorData.message });
        setIsLoading(false);
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      setFormErrors({ server: "An error occurred." });
      console.log(error);

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

          <Button type="submit" disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Send Recovery Mail
          </Button>
        </div>
      </form>
    </div>
  );
}
