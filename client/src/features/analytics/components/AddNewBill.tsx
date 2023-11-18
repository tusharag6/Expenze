import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/ui/dialog";
import { Icons } from "../../../components/Icons";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Label } from "../../../../components/ui/label";
import { Input } from "../../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { Button } from "../../../../components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../../components/ui/popover";
import { Calendar } from "../../../../components/ui/calendar";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Switch } from "../../../../components/ui/switch";
import { useState } from "react";

const billSchema = z.object({
  billName: z.string().min(1, "Bill Name is required"),
  dueDate: z.date(),
  billAmount: z
    .number()
    .min(0, "Bill Amount must be greater than or equal to 0"),
  isRecurring: z.boolean(),
  interval: z.string().optional(),
  category: z.string().optional(),
  isPaid: z.boolean().optional(),
});

type FormData = z.infer<typeof billSchema>;

const AddNewBill = () => {
  const [step, setStep] = useState(0);

  const formTitles = [
    "Add New Bill",
    "Recurring Details",
    "Additional Information",
  ];
  let isRecurring: boolean = true;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(billSchema),
  });

  const onSubmit = async (data: FormData) => {
    // TODO: submit to server
    // ...
    await new Promise((resolve) => setTimeout(resolve, 1000));

    reset();
  };

  const stepDisplay = () => {
    if (step == 0) {
      return (
        <div className="flex flex-col gap-4 pb-2">
          <div className="space-y-2">
            <Label htmlFor="billName">Bill Name</Label>
            <Input
              id="billName"
              type="text"
              placeholder="Enter bill name"
              {...register("billName")}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="billAmount">Amount</Label>
            <Input
              id="billAmount"
              type="number"
              placeholder="Enter amount"
              {...register("billAmount")}
            />
          </div>
          <div className="space-y-2 flex flex-col">
            <Label htmlFor="dueDate">Due Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className="pl-3 text-left font-normal"
                >
                  <span>Pick a date</span>

                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      );
    } else if (step == 1) {
      return (
        <div className="flex flex-col gap-4 pb-2">
          {/* Recurring Bill Switch */}
          <div className="flex flex-row items-center justify-between rounded-lg border border-border p-4">
            <div className="space-y-0.5">
              <Label className="text-base">Bill Recurrence</Label>
              <div className="text-sm text-muted-foreground">
                Choose whether this bill is recurring.
              </div>
            </div>
            <div>
              <Switch />
            </div>
          </div>

          {/* Interval Selection for Recurring Bills */}
          {isRecurring && (
            <div className="space-y-2">
              <Label htmlFor="interval">Billing Interval</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select an interval" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">
                    <span className="font-medium">Weekly</span>
                  </SelectItem>
                  <SelectItem value="monthly">
                    <span className="font-medium">Monthly</span>
                  </SelectItem>
                  <SelectItem value="quarterly">
                    <span className="font-medium">Quarterly</span>
                  </SelectItem>
                  <SelectItem value="annually">
                    <span className="font-medium">Annually</span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      );
    } else if (step == 2) {
      return (
        <div className="flex flex-col gap-4 pb-2">
          {/* Bill Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Bill Category</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="utilities">
                  <span className="font-medium">Utilities</span>
                </SelectItem>
                <SelectItem value="rent">
                  <span className="font-medium">Rent</span>
                </SelectItem>
                <SelectItem value="groceries">
                  <span className="font-medium">Groceries</span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Is Paid */}
          <div className="flex flex-row items-center justify-between rounded-lg border border-border p-4">
            <div className="space-y-0.5">
              <Label className="text-base">Is Bill Paid?</Label>
              <div className="text-sm text-muted-foreground">
                Mark whether the bill has been paid.
              </div>
            </div>
            <div>
              <Switch />
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div className=" w-36 border-dashed border-2 border-border rounded-sm p-6 text-muted-foreground cursor-pointer flex flex-col items-center">
          <div>
            <Icons.plus className="h-6 w-6 text-muted-foreground border rounded-full" />
          </div>
          <div className="text-center font-semibold mt-2">New Bill</div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{formTitles[step]}</DialogTitle>
          <DialogDescription>
            Provide details for the new bill you want to add.
          </DialogDescription>
        </DialogHeader>

        <div>{stepDisplay()}</div>
        <DialogFooter className="justify-between">
          <Button variant="outline" className={step != 0 ? "hidden" : ""}>
            Cancel
          </Button>
          <Button
            disabled={step == 0}
            variant="outline"
            className={step == 0 ? "hidden" : ""}
            onClick={() => {
              setStep((currStep) => currStep - 1);
            }}
          >
            Prev
          </Button>
          <div className="flex gap-3">
            <Button
              variant="secondary"
              className={
                step == 0 || step == formTitles.length - 1 ? "hidden" : ""
              }
              onClick={() => {
                setStep((currStep) => currStep + 1);
              }}
            >
              Skip
            </Button>
            <Button
              className={step == formTitles.length - 1 ? "hidden" : ""}
              onClick={() => {
                setStep((currStep) => currStep + 1);
              }}
            >
              Next
            </Button>
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className={step == formTitles.length - 1 ? "" : "hidden"}
          >
            {isSubmitting ? (
              <div>
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />{" "}
                <span>Adding</span>
              </div>
            ) : (
              " "
            )}
            Add Bill
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewBill;
