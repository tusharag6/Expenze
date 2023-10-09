import { summaryDataTypes } from "../../../types";
import { transactionTypes } from "../../../types";

export async function fetchSummaryData(
  accountId: number,
  token: string | null
): Promise<summaryDataTypes.SummaryData | null> {
  try {
    const response = await fetch(
      `https://expenze.vercel.app/api/accounts/${accountId}/summary`,
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

export async function fetchTransactionData(
  accountId: number,
  token: string | null
): Promise<transactionTypes.Transaction[]> {
  try {
    const response = await fetch(
      `https://expenze.vercel.app/api/transactions/accounts/${accountId}`,
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
      `https://expenze.vercel.app/api/transactions/accounts/${accountId}`
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
