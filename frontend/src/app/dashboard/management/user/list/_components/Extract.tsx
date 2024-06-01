import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { EllipsisVertical, Search } from "lucide-react";
import { Icon } from "@/components/ui/icon";

export const Extract = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button variant={"ghost"}>
          <EllipsisVertical />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="left" className="p-[1px]">
        <Button className="w-full" variant={"ghost"}>
          Print
        </Button>
      </PopoverContent>
    </Popover>
  );
};
