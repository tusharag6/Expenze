export interface Bill {
  billName: string;
  img?: string;
  billAmount: number;
  isRecurring: boolean;
  interval?: string;
  category?: string;
  dueDate: Date;
}
