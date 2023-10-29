export async function fetchUserData(token: string | null) {
  try {
    const response = await fetch("https://expenze-api.onrender.com/api/user", {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      return data.user;
    } else {
      const errorData = await response.json();
      throw new Error(`Error: ${errorData.message}`);
    }
  } catch (error) {
    throw error;
  }
}
