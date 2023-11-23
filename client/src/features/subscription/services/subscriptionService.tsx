import { z } from "zod";
import { SubscriptionSchema } from "../../../../lib/types";

type subscriptionData = z.infer<typeof SubscriptionSchema>;

export async function fetchSubscriptions(token: string | null) {
  try {
    const response = await fetch(`http://localhost:8080/api/subscriptions/`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);

      return data;
    } else {
      throw new Error("Failed to fetch subscriptions");
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function addSubscription(
  subscriptionData: subscriptionData,
  token: string | null
) {
  try {
    const response = await fetch(`http://localhost:8080/api/subscriptions/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(subscriptionData),
    });

    if (!response.ok) {
      throw new Error("Failed to add subscription");
    }
  } catch (error) {
    console.error(error);
  }
}
