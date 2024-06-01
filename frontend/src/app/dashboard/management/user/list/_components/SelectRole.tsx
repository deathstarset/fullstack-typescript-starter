import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const SelectRole = () => {
  return (
    <Select>
      <SelectTrigger className="w-[180px] lg:h-12">
        <SelectValue placeholder="Select a Role" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="apple">Admin</SelectItem>
          <SelectItem value="banana">User</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
