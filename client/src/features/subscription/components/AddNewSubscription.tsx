import React, { useState } from "react";
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
import { format, parseISO } from "date-fns";
import { cn } from "../../../../lib/utils";
import Toast from "../../../components/Toast";
import { z } from "zod";
import { SubscriptionSchema } from "../../../../lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../../context/AuthContext";
import { subscriptionService } from "..";

type FormData = z.infer<typeof SubscriptionSchema>;

const AddNewSubscription = () => {
  const [step, setStep] = useState(0);
  const [showAddSubscriptionDialog, setShowAddSubscriptionDialog] =
    useState(false);
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formTitles = ["Add New Subscription", "Additional Information"];

  const [formData, setFormData] = useState<FormData>({
    subscriptionName: "",
    startDate: undefined,
    endDate: undefined,
    monthlyCost: 0,
    renewalDate: undefined,
    category: "",
    isCancelled: false,
  });
  const handleInputChange = (
    name: keyof FormData,
    value: FormData[keyof FormData]
  ) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const { token } = useAuth();

  const addSubscriptionMutation = useMutation({
    mutationFn: async (data: FormData) => {
      await subscriptionService.addSubscription(data, token);
    },

    onSuccess: () => {
      console.log("Subscription added successfully");
      Toast.fire({
        icon: "success",
        title: "🌟 Hooray! Your subscription has been added.",
        text: "You're all set to enjoy your new subscription!",
      });
    },
    onError: (error) => {
      console.error(error);
      Toast.fire({
        icon: "error",
        title: "😟 Oops! Something went wrong.",
        text: "Please double-check your information and try again.",
      });
    },
  });

  const onSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    console.log(formData);
    await addSubscriptionMutation.mutateAsync(formData);
    setFormData({
      subscriptionName: "",
      startDate: undefined,
      endDate: undefined,
      monthlyCost: 0,
      renewalDate: undefined,
      category: "",
      isCancelled: false,
    });
    queryClient.invalidateQueries({ queryKey: ["subscriptions"] });

    setStep(0);
    setIsSubmitting(false);
  };

  const stepDisplay = () => {
    if (step === 0) {
      return (
        <div className="flex flex-col gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="subscriptionName">Subscription Name</Label>
            <Input
              id="subscriptionName"
              type="text"
              placeholder="Enter subscription name"
              value={formData.subscriptionName}
              onChange={(e) =>
                handleInputChange("subscriptionName", e.target.value)
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="monthlyCost">Monthly Cost</Label>
            <Input
              id="monthlyCost"
              type="number"
              placeholder="Enter monthly cost"
              onChange={(e) =>
                handleInputChange("monthlyCost", parseFloat(e.target.value))
              }
              ref={null}
            />
          </div>
          <div className="space-y-2 flex flex-col pt-2">
            <Label htmlFor="startDate">Start Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full pt justify-start text-left font-normal",
                    !formData.startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.startDate ? (
                    format(formData.startDate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  initialFocus
                  selected={formData.startDate}
                  onSelect={(e) => {
                    handleInputChange(
                      "startDate",
                      e ? parseISO(e.toISOString()) : undefined
                    );
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      );
    } else if (step === 1) {
      return (
        <div className="flex flex-col gap-4 py-4">
          <div className="space-y-2 flex flex-col pt-2">
            <Label htmlFor="endDate">End Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full pt justify-start text-left font-normal",
                    !formData.endDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.endDate ? (
                    format(formData.endDate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  initialFocus
                  selected={formData.endDate}
                  onSelect={(e) => {
                    handleInputChange(
                      "endDate",
                      e ? parseISO(e.toISOString()) : undefined
                    );
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <Label htmlFor="renewalDate">Renewal Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full pt justify-start text-left font-normal",
                    !formData.renewalDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.renewalDate ? (
                    format(formData.renewalDate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  initialFocus
                  selected={formData.renewalDate}
                  onSelect={(e) => {
                    handleInputChange(
                      "renewalDate",
                      e ? parseISO(e.toISOString()) : undefined
                    );
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
          {/* Additional fields for subscription */}
          <div className="space-y-2 flex flex-col pt-2">
            <Label htmlFor="category">Subscription Category</Label>
            <Select onValueChange={(e) => handleInputChange("category", e)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="entertainment">
                  <span className="font-medium">Entertainment</span>
                </SelectItem>
                <SelectItem value="streaming">
                  <span className="font-medium">Streaming</span>
                </SelectItem>
                {/* Add more categories as needed */}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-row items-center justify-between rounded-lg border border-border p-4">
            <div className="space-y-0.5">
              <Label className="text-base">Is Subscription Cancelled?</Label>
              <div className="text-sm text-muted-foreground">
                Mark whether the subscription has been cancelled.
              </div>
            </div>
            <div>
              <Switch
                checked={formData.isCancelled}
                onCheckedChange={(e) => handleInputChange("isCancelled", e)}
              />
            </div>
          </div>
          {/* ... Add more fields as needed */}
        </div>
      );
    }
  };

  return (
    <Dialog
      open={showAddSubscriptionDialog}
      onOpenChange={setShowAddSubscriptionDialog}
    >
      <DialogTrigger>
        <div className=" w-48 border-dashed border-2 border-border rounded-sm p-6 text-muted-foreground cursor-pointer flex flex-col items-center">
          <div>
            <Icons.plus className="h-6 w-6 text-muted-foreground border rounded-full" />
          </div>
          <div className="text-center font-semibold mt-2">New Subscription</div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>{formTitles[step]}</DialogTitle>
            <DialogDescription>
              Provide details for the new subscription you want to add.
            </DialogDescription>
          </DialogHeader>

          <div>{stepDisplay()}</div>
          <DialogFooter className="justify-between">
            <Button
              type="button"
              variant="outline"
              className={step !== 0 ? "hidden" : ""}
              onClick={() => setShowAddSubscriptionDialog(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              disabled={step === 0}
              variant="outline"
              className={step === 0 ? "hidden" : ""}
              onClick={() => setStep((currStep) => currStep - 1)}
            >
              Prev
            </Button>
            <div className="flex gap-3">
              <Button
                type="button"
                variant="secondary"
                className={
                  step === 0 || step === formTitles.length - 1 ? "hidden" : ""
                }
                onClick={() => setStep((currStep) => currStep + 1)}
              >
                Skip
              </Button>
              <Button
                type="button"
                className={step === formTitles.length - 1 ? "hidden" : ""}
                onClick={() => setStep((currStep) => currStep + 1)}
              >
                Next
              </Button>
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className={step === formTitles.length - 1 ? "" : "hidden"}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />{" "}
                  <span>Adding ...</span>
                </div>
              ) : (
                <span>Add Subscription</span>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewSubscription;
