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
- [x] Implement graphs or charts to depict budget and spending breakdown.
- [x] Calculate and display the total balance, total budget, and spending and deposit summaries.

### Adding Transactions

- [x] Develop interfaces for adding income transactions.
- [x] Create forms for users to input transaction details (amount, transaction type, budget category, memo / description).
- [x] Implement the ability to categorize and tag transactions.

### Budget Creation and Management

#### Implement Charts and Graphs

- [x] Category Spending Pie Chart:
  - Purpose: Create a pie chart to visually break down user spending across categories in a given budget period.
  - Implementation: Display each category as a segment with its corresponding percentage of the total budget spent.
- [x] Budget vs. Actual Bar Chart:
  - Purpose: Develop a bar chart to compare budgeted amounts to actual spending for each category in the current budget period.
  - Implementation: Use color-coded bars to indicate whether the user is over or under budget.
- [x] Budget Progress Line Chart (Optional):
  - Purpose: Consider adding a line chart to visually represent spending trends over time within the current budget period.
  - Implementation: Create a line chart showing daily or weekly spending trends.

#### Create User Interface Components

- [x] Display essential metrics
- [x] Category List: Display a list of budget categories, allowing users to add, edit, and delete categories easily.
- [x] Transaction List: Show a list of recent transactions within each category, including date, description, amount, and category.
- [x] Budget Allocation:
  - [x] Enable users to set or adjust budget amounts for each category.
  - [x] Display budget vs. actual spending for quick insights.
- [x] Charts and Graphs: Integrate the charts and graphs mentioned above into the user interface.
- [x] Search and Filter Options: Implement search functionality and filters to help users find specific transactions or categories and customize their view.

#### Calculate Essential Metrics

- [x] Total Budgeted Amount: Calculate the total amount allocated by the user across all budget categories for a specific budget period.
- [x] Total Actual Spending: Calculate the sum of all actual expenses across all budget categories for the same budget period.
- [x] Remaining Budget: Calculate the difference between the total budgeted amount and the total actual spending to indicate how much budget is left for the current period.
- [x] Budget Utilization Percentage: Calculate the percentage of the total budget spent so far as (Total Actual Spending / Total Budgeted Amount) \* 100%.

#### Household

### Express API Endpoints

- Creating a household (POST /api/household) :
  - When a user create a household, its role changes to Owner
  - User can add members by sending mail with a joining ID
  - users can join household after clicking join household button and their role changes to member
  - both member and owner can add as many number of bank account as they can
  - Household budget creation
- Retrieve household information (GET /api/household/:id)
- Add a user to a household (POST /api/household/:id/members)
- List household members (GET /api/household/:id/members)
- Remove a user from a household (DELETE /api/household/:id/members/:userId)
- Endpoints for finance features

### React

- Creating a new household
- Joining a household
- Viewing household info
- Managing household members
- Updating household details
- Finance Feaatures

### Household Finance Features:

Integrating household finance management features, such as:

- Shared expense tracking
- Budgeting and expense categories for the entire household
- Financial goals and savings for the household
- Reports and analytics that consider the entire household's finances
