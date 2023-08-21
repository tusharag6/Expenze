import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
// import { MainNav } from "./components/MainNav";
import { Overview } from "../components/Overview";
import AccountSwitcher from "../components/AccountSwitcher";
import { UserNav } from "../components/UserNav";
import React from "react";
import { Sidebar } from "../components/Sidebar";
// import { Ov2 } from "../components/Ov2";
import RecentTransaction from "../components/RecentTransaction";

export default function Dashboard() {
  const [showAddTransactionDialog, setShowAddTransactionDialog] =
    React.useState(false);
  const [open, setOpen] = React.useState(false);

  // Detect window width and set a flag for small screens
  // const isSmallScreen = window.innerWidth <= 768;
  return (
    <Dialog
      open={showAddTransactionDialog}
      onOpenChange={setShowAddTransactionDialog}
    >
      <div className="grid lg:grid-cols-6">
        {/* Sidebar */}
        <Sidebar className="hidden lg:block" />

        <div className="md:flex-col md:flex col-span-3 lg:col-span-5 lg:border-l">
          {/* Navbar */}
          <div className="border-b">
            <div className="flex h-16 items-center px-7 md:px-14">
              <h1 className="text-3xl font-bold tracking-tight ">Expenze</h1>
              {/* <MainNav className="mx-6" /> */}
              <div className="ml-auto flex items-center space-x-4">
                <AccountSwitcher />
                <UserNav />
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="flex-1 space-y-4 pt-6 px-7 md:px-14">
            <Tabs defaultValue="overview" className="space-y-6">
              {/* Tabs and add transaction button */}
              <div className="flex items-center justify-between max-[450px]:flex-col max-[450px]:items-start">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  <TabsTrigger value="notifications">Budget</TabsTrigger>
                </TabsList>
                <div className="flex items-center space-x-2 max-[450px]:mt-4">
                  <DialogTrigger asChild>
                    <Button
                      onSelect={() => {
                        setOpen(false);
                      }}
                    >
                      Add Transaction
                    </Button>
                  </DialogTrigger>
                </div>
              </div>

              {/* Overview Content */}
              <TabsContent value="overview" className="md:space-y-4">
                {/* Crads */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Current Balance
                      </CardTitle>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-muted-foreground"
                      >
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                      </svg>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$45,231.89</div>
                      <p className="text-xs text-muted-foreground">
                        +20.1% from last month
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Total Income
                      </CardTitle>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-muted-foreground"
                      >
                        <rect width="20" height="14" x="2" y="5" rx="2" />
                        <path d="M2 10h20" />
                      </svg>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$12,234</div>
                      <p className="text-xs text-muted-foreground">
                        +19% from last month
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Total Expense
                      </CardTitle>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-muted-foreground"
                      >
                        <rect width="20" height="14" x="2" y="5" rx="2" />
                        <path d="M2 10h20" />
                      </svg>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$2,125</div>
                      <p className="text-xs text-muted-foreground">
                        +19% from last month
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Todays Transaction
                      </CardTitle>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-muted-foreground"
                      >
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                      </svg>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">+573</div>
                      <p className="text-xs text-muted-foreground">
                        +201 since last hour
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid gap-4 grid-cols-2 pt-4">
                  {/* Chart */}
                  <Card className="col-span-4">
                    <CardHeader>
                      <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                      <Overview />
                    </CardContent>
                  </Card>

                  {/* <Card className="col-span-4">
                    <CardHeader>
                      <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                      <Ov2 />
                    </CardContent>
                  </Card> */}

                  {/* Recent Transaction */}
                  <Card className="col-span-4 mb-6 lg:col-span-3 md:col-span-4">
                    <CardHeader>
                      <CardTitle>Recent Transactions</CardTitle>
                      <CardDescription>
                        {/* You made 265 sales this month. */}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <RecentTransaction />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Add transaction form */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Transaction</DialogTitle>
            <DialogDescription>
              Add a new transaction with the following details.
            </DialogDescription>
          </DialogHeader>
          <div>
            <div className="space-y-4 py-2 pb-4">
              <div className="space-y-2">
                <Label htmlFor="name">Amount</Label>
                <Input id="amount" type="number" placeholder="Enter amount" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Transaction Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="income">
                      <span className="font-medium">Income</span>
                      {/* <span className="text-muted-foreground">
                        Trial for two weeks
                      </span> */}
                    </SelectItem>
                    <SelectItem value="expense">
                      <span className="font-medium">Expense</span>
                      {/* <span className="text-muted-foreground">
                        $9/month per user
                      </span> */}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Budget Category</Label>
                <Input id="category" type="text" placeholder="Enter category" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="memo">Memo / Description</Label>
                <Input
                  id="memo"
                  type="text"
                  placeholder="Enter memo or description"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAddTransactionDialog(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Add Transaction</Button>
          </DialogFooter>
        </DialogContent>
      </div>
    </Dialog>
  );
}
