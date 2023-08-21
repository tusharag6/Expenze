import { Payment, columns } from "./Columns";
import { DataTable } from "./DataTable";

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

export default function RecentTransaction() {
  return (
    <div className="container">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
