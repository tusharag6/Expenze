import { summaryDataTypes } from "../../../types";
import { transactionTypes } from "../../../types";

export async function fetchSummaryData(
  accountId: number,
  token: string | null
): Promise<summaryDataTypes.SummaryData | null> {
  try {
    const response = await fetch(
      `http://localhost:8080/api/accounts/${accountId}/summary`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `${token}`,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch summary data");
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function addTransaction(
  accountId: number | undefined,
  token: string | null,
  transaction: {
    amount: number;
    budgetCategory?: string;
    description?: string;
    type: string;
  }
) {
  try {
    const response = await fetch(
      `http://localhost:8080/api/transactions/accounts/${accountId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(transaction),
      }
    );
    console.log(response.json());

    if (!response.ok) {
      throw new Error("Failed to add transaction");
    }
  } catch (error) {
    console.error(error);
  }
}

export async function fetchBudgetCategories(token: string | null) {
  try {
    const response = await fetch("http://localhost:8080/api/budget", {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      const categoryNames = data.map(
        (category: { category: any }) => category.category
      );

      return categoryNames;
    } else {
      throw new Error("Failed to fetch budget categories");
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function fetchTransactionData(
  accountId: number,
  token: string | null
): Promise<transactionTypes.Transaction[]> {
  try {
    const response = await fetch(
      `http://localhost:8080/api/transactions/accounts/${accountId}`,
      {
        headers: {
          authorization: `${token}`,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch transaction data");
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function fetchRecentTransactions(
  accountId: number
): Promise<transactionTypes.Transaction[]> {
  try {
    const response = await fetch(
      `http://localhost:8080/api/transactions/accounts/${accountId}`
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch recent transactions");
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}
