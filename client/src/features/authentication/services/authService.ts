import { useAuth } from "../../../context/AuthContext";
import { authTypes } from "../../../types";

// Function for user login
export async function login(data: authTypes.loginData) {
  const { login } = useAuth(); // Accessing the login function from the AuthContext

  try {
    // Making a POST request to the login endpoint
    const response = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // Sending user login data as JSON
    });

    const responseData = await response.json();

    if (response.ok) {
      if (!responseData.user.verified) {
        alert("Please verify your email before logging in.");
      } else {
        login(responseData.token); // Calling the login function from AuthContext to set user token
        alert("Logged in");
      }
      return responseData;
    } else {
      throw new Error(responseData.message);
    }
  } catch (error) {
    throw new Error("An error occurred during login.");
  }
}

// Function for user registration
export async function register(data: authTypes.registerData) {
  try {
    // Making a POST request to the registration endpoint
    const response = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // Sending user registration data as JSON
    });

    const responseData = await response.json();

    if (response.ok) {
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
      return responseData;
    } else {
      throw new Error(responseData.message);
    }
  } catch (error) {
    throw new Error("An error occurred during registration.");
  }
}
