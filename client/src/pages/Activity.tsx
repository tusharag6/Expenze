import { Payment, columns } from "../components/Columns";
import { DataTable } from "../components/DataTable";

const data: Payment[] = [
  {
    id: "1",
    name: "Amazon",
    dateTime: "2023-08-21 15:30",
    category: "Entertainment",
    type: "Expense",
    amount: 50,
  },
  {
    id: "2",
    name: "Netflix",
    dateTime: "2023-08-20 10:15",
    category: "Entertainment",
    type: "Expense",
    amount: 12.99,
  },
  {
    id: "3",
    name: "Starbucks",
    dateTime: "2023-08-19 08:45",
    category: "Food",
    type: "Expense",
    amount: 7.5,
  },
  {
    id: "4",
    name: "Salary",
    dateTime: "2023-08-18 12:30",
    category: "Income",
    type: "Income",
    amount: 2500,
  },
  {
    id: "5",
    name: "Freelance Gig",
    dateTime: "2023-08-17 17:00",
    category: "Income",
    type: "Income",
    amount: 500,
  },
];

const Activity = () => {
  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of your transactions for this month!
          </p>
        </div>
        {/* <div className="flex items-center space-x-2">
          <UserNav />
        </div> */}
      </div>
      <DataTable data={data} columns={columns} />
      {/* <RecentTransaction /> */}
    </div>
  );
};

export default Activity;
