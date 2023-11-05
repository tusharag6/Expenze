import SingleBillsCard from "./SingleBillsCard";
import { ScrollArea, ScrollBar } from "../../../../components/ui/scroll-area";

const Bills = () => {
  const billsData = [
    { title: "Netflix", amount: 125, date: "22/11/2023" },
    {
      title: "Electricity",
      img: "https://listcarbrands.com/wp-content/uploads/2017/10/Tata-Motors-Logo-1988.png",
      amount: 75,
      date: "15/11/2023",
    },
    {
      title: "Internet",
      img: "https://s3-ap-southeast-1.amazonaws.com/bsy/iportal/images/airtel-logo-white-text-horizontal.jpg",
      amount: 60,
      date: "10/11/2023",
    },
    {
      title: "Water",
      img: "https://listcarbrands.com/wp-content/uploads/2017/10/Tata-Motors-Logo-1988.png",
      amount: 40,
      date: "18/11/2023",
    },
    { title: "Gas", amount: 50, date: "20/11/2023" },
    { title: "Phone", amount: 30, date: "14/11/2023" },
    { title: "Credit Card", amount: 100, date: "28/11/2023" },
  ];

  return (
    <ScrollArea className="whitespace-nowrap rounded-">
      <div className="flex space-x-4 p-4">
        {billsData.map((bill, index) => (
          <SingleBillsCard
            key={index}
            title={bill.title}
            img={bill.img}
            amount={bill.amount}
            date={bill.date}
          />
        ))}
      </div>
      <ScrollBar className="" orientation="horizontal" />
    </ScrollArea>
  );
};

export default Bills;
