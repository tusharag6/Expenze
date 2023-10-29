export async function createHousehold(token: string | null): Promise<void> {
  try {
    const response = await fetch(
      "https://expenze-api.onrender.com/api/household",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("householdId", data.id);
      return data;
    } else {
      throw new Error("Failed to create household");
    }
  } catch (error) {
    throw error;
  }
}

export async function joinHousehold(joiningId: string | null): Promise<void> {
  try {
    const data = { joiningId };
    const response = await fetch(
      "https://expenze-api.onrender.com/api/household/join",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("Role", "Member");
      return data;
    } else {
      throw new Error("Failed to join household");
    }
  } catch (error) {
    throw error;
  }
}

export async function addAccount(
  token: string | null,
  householdId: number,
  accountId: number
): Promise<void> {
  try {
    const accountData = { householdId, accountId };
    const response = await fetch(
      "https://expenze-api.onrender.com/api/household/add",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(accountData),
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to add account");
    }
  } catch (error) {
    throw error;
  }
}

export async function inviteMembers(
  token: string | null,
  householdId: number
): Promise<void> {
  try {
    const response = await fetch(
      `https://expenze-api.onrender.com/api/household/join/${householdId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to add account");
    }
  } catch (error) {
    throw error;
  }
}

export async function getSummaryData(
  token: string | null,
  householdId: number
): Promise<void> {
  try {
    const response = await fetch(
      `https://expenze-api.onrender.com/api/household/summary/${householdId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to add account");
    }
  } catch (error) {
    throw error;
  }
}

export async function getTransactionData(
  token: string | null,
  householdId: number
): Promise<void> {
  try {
    const response = await fetch(
      `https://expenze-api.onrender.com/api/household/transaction/${householdId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to add account");
    }
  } catch (error) {
    throw error;
  }
}

export async function getAddedAccounts(householdId: number): Promise<void> {
  try {
    const response = await fetch(
      `https://expenze-api.onrender.com/api/household/accounts/${householdId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch account");
    }
  } catch (error) {
    throw error;
  }
}
