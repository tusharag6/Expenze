import React, { useState, useEffect } from "react";

import { cn } from "../../lib/utils";
import { Icons } from "./Icons";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useNavigate, useParams } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

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
  console.log(inputType);
  // Extract the token from URL parameters
  const { token } = useParams();
  const [isValidToken, setIsValidToken] = useState<boolean>(true);

  // console.log(token);
  const navigate = useNavigate();
  const passRegex =
    /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
  useEffect(() => {
    async function checkTokenValidity() {
      try {
        const response = await fetch("http://localhost:8080/check-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        if (!response.ok) {
          setIsValidToken(false);
        }
      } catch (error) {
        setIsValidToken(false);
      }
    }

    if (token) {
      checkTokenValidity();
    }
  }, [token]);

  useEffect(() => {
    // Redirect or display error if the token is not valid
    if (!isValidToken) {
      navigate("/login");
    }
  }, [isValidToken]);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    const form = event.target as HTMLFormElement;
    // Client-side validation
    const errors: any = {};

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
    } else if (form.password.value.length < 8) {
      errors.confPassword = "Password must be at least 8 characters long.";
    } else if (form.password.value !== form.confPassword.value) {
      errors.confPassword = "Enter the same password as above";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setIsLoading(false);
      return;
    }
    const data = {
      password: form.password.value,
      token: token,
    };

    // console.log(data);

    try {
      const response = await fetch("http://localhost:8080/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Password Changed, Please Login");
        navigate("/login");
      } else if (response.status === 400) {
        alert("Token Expired");

        navigate("/forgot-password");
      } else {
        const errorData = await response.json();
        console.log(errorData);
        setFormErrors({ server: errorData.message });
        setIsLoading(false);
        // alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      setFormErrors({ server: "An error occurred." });

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
                {visible ? <FaRegEye /> : <FaRegEyeSlash />}
              </span>
            </div>
            {formErrors.confPassword && (
              <p className="text-red-500 text-sm">{formErrors.confPassword}</p>
            )}
          </div>

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
