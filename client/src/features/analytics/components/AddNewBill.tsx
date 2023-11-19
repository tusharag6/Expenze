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
import { format } from "date-fns";
import { cn } from "../../../../lib/utils";
import Toast from "../../../components/Toast";

const billSchema = z.object({
  billName: z.string().min(1, "Bill Name is required"),
  dueDate: z.date().optional(),
  billAmount: z
    .number()
    .min(0, "Bill Amount must be greater than or equal to 0"),
  isRecurring: z.boolean().optional(),
  interval: z.string().optional(),
  category: z.string().optional(),
  isPaid: z.boolean().optional(),
});

type FormData = z.infer<typeof billSchema>;

const AddNewBill = () => {
  const [step, setStep] = useState(0);
  const [showAddTransactionDialog, setShowAddTransactionDialog] =
    useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formTitles = [
    "Add New Bill",
    "Recurring Details",
    "Additional Information",
  ];
  let isRecurring: boolean = true;

  const [formData, setFormData] = useState<FormData>({
    billName: "",
    dueDate: undefined,
    billAmount: 0,
    isRecurring: false,
    interval: "",
    category: "",
    isPaid: false,
  });
  const handleInputChange = (
    name: keyof FormData,
    value: FormData[keyof FormData]
  ) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const onSubmit = async (event: any) => {
    event.preventDefault();
    setIsSubmitting(true);

    console.log(formData);
    // Toast.fire({
    //   icon: "error",
    //   title: "😟 Oops! Something went wrong.",
    //   text: "Please double-check your information and try again.",
    // });
    setTimeout(() => {
      Toast.fire({
        icon: "success",
        title: "🌟 Hooray! Your bill has been added.",
        text: "Great job staying on top of your expenses!",
      });
      setFormData({
        billName: "",
        dueDate: undefined,
        billAmount: 0,
        isRecurring: false,
        interval: "",
        category: "",
        isPaid: false,
      });
      setStep(0);
      setIsSubmitting(false);
    }, 5000);
  };

  const stepDisplay = () => {
    if (step == 0) {
      return (
        <div className="flex flex-col gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="billName">Bill Name</Label>
            <Input
              id="billName"
              type="text"
              placeholder="Enter bill name"
              value={formData.billName}
              onChange={(e) => handleInputChange("billName", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="billAmount">Amount</Label>
            <Input
              id="billAmount"
              type="number"
              placeholder="Enter amount"
              onChange={(e) => handleInputChange("billAmount", e.target.value)}
              ref={null}
            />
          </div>
          <div className="space-y-2 flex flex-col pt-2">
            <Label htmlFor="dueDate">Due Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full pt justify-start text-left font-normal",
                    !formData.dueDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.dueDate ? (
                    format(formData.dueDate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  initialFocus
                  selected={formData.dueDate}
                  onSelect={(e) => {
                    handleInputChange("dueDate", e);
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      );
    } else if (step == 1) {
      return (
        <div className="flex flex-col gap-4 py-4">
          {/* Recurring Bill Switch */}
          <div className="flex flex-row items-center justify-between rounded-lg border border-border p-4">
            <div className="space-y-0.5">
              <Label className="text-base">Bill Recurrence</Label>
              <div className="text-sm text-muted-foreground">
                Choose whether this bill is recurring.
              </div>
            </div>
            <div>
              <Switch
                checked={formData.isRecurring}
                onCheckedChange={(e) => handleInputChange("isRecurring", e)}
              />
            </div>
          </div>

          {/* Interval Selection for Recurring Bills */}
          {isRecurring && (
            <div className="space-y-2">
              <Label htmlFor="interval">Billing Interval</Label>
              <Select onValueChange={(e) => handleInputChange("interval", e)}>
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
        <div className="flex flex-col gap-4 py-4">
          {/* Bill Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Bill Category</Label>
            <Select onValueChange={(e) => handleInputChange("category", e)}>
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
              <Switch
                checked={formData.isPaid}
                onCheckedChange={(e) => handleInputChange("isPaid", e)}
              />
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <Dialog
      open={showAddTransactionDialog}
      onOpenChange={setShowAddTransactionDialog}
    >
      <DialogTrigger>
        <div className=" w-36 border-dashed border-2 border-border rounded-sm p-6 text-muted-foreground cursor-pointer flex flex-col items-center">
          <div>
            <Icons.plus className="h-6 w-6 text-muted-foreground border rounded-full" />
          </div>
          <div className="text-center font-semibold mt-2">New Bill</div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>{formTitles[step]}</DialogTitle>
            <DialogDescription>
              Provide details for the new bill you want to add.
            </DialogDescription>
          </DialogHeader>

          <div>{stepDisplay()}</div>
          <DialogFooter className="justify-between">
            <Button
              type="button"
              variant="outline"
              className={step != 0 ? "hidden" : ""}
              onClick={() => setShowAddTransactionDialog(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
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
                type="button"
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
                type="button"
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
                <div className="flex items-center justify-center">
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />{" "}
                  <span>Adding ...</span>
                </div>
              ) : (
                <span>Add Bill</span>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewBill;
