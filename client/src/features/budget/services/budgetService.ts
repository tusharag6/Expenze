export async function getAllCategoriesData(token: string | null) {
  try {
    const response = await fetch(`http://localhost:8080/api/budget`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function fetchSummaryData(token: string | null) {
  try {
    const response = await fetch(`http://localhost:8080/api/budget/summary`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });

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

export async function fetchCategorySpendingChartData(token: string | null) {
  try {
    const budgetPeriodStart = "2023-08-01T00:00:00Z";

    const response = await fetch(
      `http://localhost:8080/api/budget/category-spending-chart`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
          start: budgetPeriodStart,
        },
      }
    );

    if (response.ok) {
      const responseData = await response.json();
      const data = Object.entries(responseData).map(([name, value]) => ({
        name: name,
        value: typeof value === "number" ? value : 0,
      }));
      return data;
    } else {
      throw new Error("Failed to fetch summary data");
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function fetchBudgetVsActualBarChartData(token: string | null) {
  try {
    const budgetPeriodStart = "2023-08-01T00:00:00Z";

    const response = await fetch(
      `http://localhost:8080/api/budget/budget-vs-actual-bar-chart`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
          start: budgetPeriodStart,
        },
      }
    );

    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      throw new Error("Failed to fetch summary data");
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function fetchBudgetProgressLineChartData(token: string | null) {
  try {
    const interval = "weekly";
    const budgetPeriodStart = "2023-08-01T00:00:00Z";

    const response = await fetch(
      `http://localhost:8080/api/budget/budget-progress-line-chart`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
          start: budgetPeriodStart,
          interval,
        },
      }
    );

    if (response.ok) {
      const responseData = await response.json();
      console.log("response", responseData);

      return responseData;
    } else {
      throw new Error("Failed to fetch summary data");
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}
