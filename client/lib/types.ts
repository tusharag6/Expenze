import { z } from "zod";

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

const SubscriptionSchema = z.object({
  subscriptionName: z.string().min(1, "Subscription Name is required"),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  monthlyCost: z.number(),
  renewalDate: z.date().optional(),
  category: z.string().optional(),
  isCancelled: z.boolean().optional(),
});

export { billSchema, SubscriptionSchema };
