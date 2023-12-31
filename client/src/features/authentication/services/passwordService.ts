// Importing the necessary types from the "types" module
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
// Function to check the validity of a token
export async function checkTokenValidity(token: any) {
  try {
    // Sending a POST request to check the token validity
    const response = await fetch("http://localhost:8080/api/auth/check-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    // If the response is not successful, return false
    if (!response.ok) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    return false;
  }
}

// Function to reset the password
export async function resetPassword(data: authTypes.resetPassword) {
  try {
    // Sending a POST request to reset the password
    const response = await fetch(
      "http://localhost:8080/api/auth/reset-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    // Parsing the response data
    const responseData = await response.json();

    // Handling different response scenarios
    if (response.ok) {
      Toast.fire({
        icon: "success",
        title: "Password Changed, Please Login.",
      });
    } else if (response.status === 400) {
      Toast.fire({
        icon: "error",
        title: "Token Expired",
      });
    } else {
      Toast.fire({
        icon: "error",
        title: "Password Changed Failed",
      });
      throw new Error(responseData.message);
    }
    return response;
  } catch (error) {
    Toast.fire({
      icon: "error",
      title: "Password Changed Failed",
    });
    throw new Error("An error occurred during reset password.");
  }
}

// Function to initiate the forgot password process
export async function forgotPassword(data: { email: string }) {
  try {
    // Sending a POST request to initiate the forgot password process
    const response = await fetch(
      "http://localhost:8080/api/auth/forgot-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
        }),
      }
    );

    // Parsing the response data
    const responseData = await response.json();

    // Handling different response scenarios
    if (response.ok) {
      Toast.fire({
        icon: "success",
        title: "Mail Sent!",
      });
    } else {
      Toast.fire({
        icon: "error",
        title: "Error Sending Mail",
      });
      throw new Error(responseData.message);
    }
  } catch (error) {
    throw new Error("An error occurred during forgot password.");
  }
}
