import { z } from "zod";
import { billSchema } from "../../../../lib/types";

type billData = z.infer<typeof billSchema>;

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

export async function addBills(billData: billData, token: string | null) {
  try {
    const response = await fetch(`http://localhost:8080/api/bills/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(billData),
    });

    console.log("Response from billserivice ", response.json());

    if (!response.ok) {
      throw new Error("Failed to add bill");
    }
  } catch (error) {
    console.error(error);
  }
}
