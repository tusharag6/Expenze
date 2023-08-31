// Importing necessary React components and modules
import React, { useState } from "react";
import { cn } from "../../../../lib/utils";
import { Icons } from "../../../components/Icons";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { passwordService } from "..";

// Defining the props interface for the ForgotPasswordForm component
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

// Defining the ForgotPasswordForm component
export function ForgotPasswordForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<any>({});

  // Regular expression for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Function to handle form submission
  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    const form = event.target as HTMLFormElement;
    const errors: any = {}; // Object to store validation errors

    // Client-side validation for email field
    if (!form.email.value) {
      errors.email = "Email is required.";
    } else if (!emailRegex.test(form.email.value)) {
      errors.email = "Invalid email format.";
    }

    // If there are validation errors, set them and stop loading
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setIsLoading(false);
      return;
    }

    const data = {
      email: form.email.value,
    };

    try {
      // Calling the forgotPassword function from the password service
      await passwordService.forgotPassword(data);
    } catch (error) {
      setFormErrors({ server: error });
    } finally {
      setIsLoading(false);
    }
  }

  // JSX rendering
  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        {/* Display server validation error */}
        {formErrors.server && (
          <p className="text-red-500 text-sm">{formErrors.server}</p>
        )}

        <div className="grid gap-2">
          {/* Email input */}
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

          {/* Submit button */}
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
