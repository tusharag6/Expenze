import { accountTypes } from "../../../types";

export async function fetchAccounts(
  token: string | null
): Promise<accountTypes.Account[]> {
  try {
    const response = await fetch("https://expenze.vercel.app/api/accounts", {
      method: "GET",
      headers: {
        authorization: `${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch accounts");
    }
  } catch (error) {
    throw error;
  }
}

export async function addAccount(
  token: string | null,
  accountData: Partial<accountTypes.Account>
): Promise<void> {
  try {
    const response = await fetch("https://expenze.vercel.app/api/accounts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(accountData),
    });

    if (!response.ok) {
      throw new Error("Failed to add an account");
    }
  } catch (error) {
    throw error;
  }
}
