export async function fetchBills(token: string | null) {
  try {
    const response = await fetch(`http://localhost:8080/api/bills/`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch bills");
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}
