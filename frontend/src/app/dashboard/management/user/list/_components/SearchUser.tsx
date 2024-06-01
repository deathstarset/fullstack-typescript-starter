import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
export const SearchUser = () => {
  return (
    <div className="w-full rounded relative">
      <Input placeholder="Search" className="lg:h-12 pl-10" />
      <Search className="absolute top-1/2 left-2 translate-y-[-50%]" />
    </div>
  );
};
