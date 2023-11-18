import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../../../components/ui/dialog";
import { Icons } from "../../../components/Icons";

const AddNewBill = () => {
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
      <DialogContent>Hi</DialogContent>
    </Dialog>
  );
};

export default AddNewBill;
