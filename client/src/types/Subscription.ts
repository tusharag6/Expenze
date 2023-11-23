export interface Subscription {
  subscriptionName: string;
  img?: string;
  monthlyCost: number;
  category?: string;
  startDate: Date;
  endDate?: Date;
  renewalDate?: Date;
  isCancelled?: boolean;
}
