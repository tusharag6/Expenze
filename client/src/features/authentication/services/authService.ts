import { authTypes } from "../../../types";
import Swal from "sweetalert2";
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});
// Function for user login
export async function login(data: authTypes.loginData) {
  try {
    // Making a POST request to the login endpoint
    const response = await fetch(
      "https://expenze-api.onrender.com/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // Sending user login data as JSON
      }
    );

    const responseData = await response.json();

    if (response.ok) {
      if (!responseData.user.verified) {
        Toast.fire({
          icon: "warning",
          title: "Please verify your email before logging in.",
        });
        return;
      } else {
        Toast.fire({
          icon: "success",
          title: "Signed in successfully",
        });
      }
      return responseData;
    } else {
      Toast.fire({
        icon: "error",
        title: "Login Failed",
      });
      throw new Error(responseData.message);
    }
  } catch (error) {
    Toast.fire({
      icon: "error",
      title: "Login Failed",
    });
    throw new Error("An error occurred during login.");
  }
}

// Function for user registration
export async function register(data: authTypes.registerData) {
  try {
    // Making a POST request to the registration endpoint
    const response = await fetch(
      "https://expenze-api.onrender.com/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // Sending user registration data as JSON
      }
    );

    const responseData = await response.json();

    if (response.status === 400) {
      alert(responseData.error);
      return;
    }
    if (response.ok) {
      Toast.fire({
        icon: "success",
        title: "Registration successful",
      });

      // Send verification email
      const verificationResponse = await fetch(
        "https://expenze-api.onrender.com/api/auth/send-verification",
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
        Toast.fire({
          icon: "success",
          title: "Verification email sent successfully",
        });
      } else {
        const errorData = await verificationResponse.json();
        console.log(errorData.error);
        Toast.fire({
          icon: "error",
          title: "Error sending verification email",
        });
      }
      return responseData;
    } else {
      Toast.fire({
        icon: "error",
        title: "Registration Failed",
      });
      throw new Error(responseData.message);
    }
  } catch (error) {
    console.log(error);

    Toast.fire({
      icon: "error",
      title: "Registration Failed",
    });
    throw new Error("An error occurred during registration.");
  }
}
