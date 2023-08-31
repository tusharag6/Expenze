// Importing necessary React components and modules
import React, { useState, useEffect } from "react";
import { cn } from "../../../../lib/utils";
import { Icons } from "../../../components/Icons";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { useNavigate, useParams } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { passwordService } from "..";

// Defining the props interface for the ChangePasswordForm component
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

// Defining the ChangePasswordForm component
export default function ChangePasswordForm({
  className,
  ...props
}: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<any>({});
  const [visible, setVisible] = useState(false);
  const [visibleConf, setVisibleConf] = useState(false);
  let inputType = visible ? "text" : "password";
  let inputTypeforConfPass = visibleConf ? "text" : "password";

  // Extract the token from URL parameters using useParams hook
  const { token } = useParams();

  // State to track whether the token is valid
  const [isValidToken, setIsValidToken] = useState<boolean>(true);

  // Navigation function
  const navigate = useNavigate();

  // Regular expression for password validation
  const passRegex =
    /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;

  // useEffect to check the validity of the token
  useEffect(() => {
    async function check() {
      setIsValidToken(await passwordService.checkTokenValidity(token));
    }
    if (token) {
      check();
    }
  }, [token]);

  // useEffect to handle navigation if the token is not valid
  useEffect(() => {
    if (!isValidToken) {
      navigate("/login");
    }
  }, [isValidToken]);

  // Function to handle form submission
  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    const form = event.target as HTMLFormElement;
    const errors: any = {}; // Object to store validation errors

    // Client-side validation for password and confirm password fields
    if (!form.password.value) {
      errors.password = "Password is required.";
    } else if (form.password.value.length < 8) {
      errors.password = "Password must be at least 8 characters long.";
    } else if (!passRegex.test(form.password.value)) {
      errors.password =
        "Password should include at least one uppercase letter, one lowercase letter, one number, and one special character.";
    }

    if (!form.confPassword.value) {
      errors.confPassword = "Password is required.";
    } else if (form.confPassword.value.length < 8) {
      errors.confPassword = "Password must be at least 8 characters long.";
    } else if (form.password.value !== form.confPassword.value) {
      errors.confPassword = "Enter the same password as above";
    }

    // If there are validation errors, set them and stop loading
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setIsLoading(false);
      return;
    }

    const data = {
      password: form.password.value,
      token: token,
    };

    try {
      // Calling the resetPassword function from the password service
      const response = await passwordService.resetPassword(data);

      // Redirecting based on the response status
      if (response.status === 400) {
        navigate("/forgot-password");
      }
      navigate("/");
    } catch (error) {
      setFormErrors({ server: error });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        {/* Display server validation error */}
        {formErrors.server && (
          <p className="text-red-500 text-sm">{formErrors.server}</p>
        )}

        <div className="grid gap-2">
          {/* Password input */}
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

          {/* Confirm Password input */}
          <div className="grid gap-1 pt-3 pb-2 relative">
            <Label className="pb-1" htmlFor="confPassword">
              Confirm Password
            </Label>
            <div className="flex items-center">
              <Input
                id="confPassword"
                placeholder="Same as above"
                type={inputTypeforConfPass}
                autoCapitalize="none"
                autoComplete="password"
                autoCorrect="off"
                disabled={isLoading}
              />
              <span
                className="cursor-pointer absolute right-3"
                onClick={() => setVisibleConf(!visibleConf)}
              >
                {visibleConf ? <FaRegEye /> : <FaRegEyeSlash />}
              </span>
            </div>
            {formErrors.confPassword && (
              <p className="text-red-500 text-sm">{formErrors.confPassword}</p>
            )}
          </div>

          {/* Submit button */}
          <Button type="submit" disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Change Password
          </Button>
        </div>
      </form>
    </div>
  );
}
