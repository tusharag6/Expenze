## MVP Task List

### User Registration and Login

- [x] Implement user registration functionality.
- [x] Integrate secure authentication methods (email/password, social media logins).
- [x] Set up password recovery mechanisms.

### Dashboard

Will have two dashboard, one for all accounts combined and one for each individual account

- [x] Design and create a dashboard interface.
- [x] Display the user's current balance prominently.
- [x] Show recent transactions with basic details.
- [ ] Implement graphs or charts to depict budget and spending breakdown.
- [ ] Calculate and display the total balance, total budget, and spending and deposit summaries.

### Adding Transactions

- [x] Develop interfaces for adding income transactions.
- [x] Create forms for users to input transaction details (amount, transaction type, budget category, memo / description).
- [ ] Implement the ability to categorize and tag transactions.

### Budget Creation and Management

#### Implement Charts and Graphs

- [ ] Category Spending Pie Chart:
  - Purpose: Create a pie chart to visually break down user spending across categories in a given budget period.
  - Implementation: Display each category as a segment with its corresponding percentage of the total budget spent.
- [ ] Budget vs. Actual Bar Chart:
  - Purpose: Develop a bar chart to compare budgeted amounts to actual spending for each category in the current budget period.
  - Implementation: Use color-coded bars to indicate whether the user is over or under budget.
- [ ] Budget Progress Line Chart (Optional):
  - Purpose: Consider adding a line chart to visually represent spending trends over time within the current budget period.
  - Implementation: Create a line chart showing daily or weekly spending trends.

#### Create User Interface Components

- [ ] Display essentia; metrics
- [ ] Category List: Display a list of budget categories, allowing users to add, edit, and delete categories easily.
- [ ] Transaction List: Show a list of recent transactions within each category, including date, description, amount, and category.
- [ ] Budget Allocation:
  - [ ] Enable users to set or adjust budget amounts for each category.
  - [ ] Display budget vs. actual spending for quick insights.
- [ ] Charts and Graphs: Integrate the charts and graphs mentioned above into the user interface.
- [ ] Search and Filter Options: Implement search functionality and filters to help users find specific transactions or categories and customize their view.

#### Calculate Essential Metrics

- [ ] Total Budgeted Amount: Calculate the total amount allocated by the user across all budget categories for a specific budget period.
- [ ] Total Actual Spending: Calculate the sum of all actual expenses across all budget categories for the same budget period.
- [ ] Remaining Budget: Calculate the difference between the total budgeted amount and the total actual spending to indicate how much budget is left for the current period.
- [ ] Budget Utilization Percentage: Calculate the percentage of the total budget spent so far as (Total Actual Spending / Total Budgeted Amount) \* 100%.
