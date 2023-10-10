// VerifyPage.js
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const VerifyPage = () => {
  const { token } = useParams();

  useEffect(() => {
    async function verifyEmail() {
      try {
        const response = await fetch(
          `http://localhost:8080/api/auth/verify/${token}`
        );
        if (response.ok) {
          console.log("Email verified successfully");
        } else {
          console.log("Verification failed");
        }
      } catch (error) {
        console.error("Error occurred during verification:", error);
      }
    }

    verifyEmail();
  }, [token]);

  return (
    <div>
      <h1>Verifying...</h1>
    </div>
  );
};

export default VerifyPage;
