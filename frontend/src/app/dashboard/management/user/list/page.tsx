import { Path } from "@/app/dashboard/Path";
import { Card } from "@/components/ui/card";
import { SelectRole } from "./_components/SelectRole";
import { SearchUser } from "./_components/SearchUser";
import { Extract } from "./_components/Extract";
import { CustomTable } from "./_components/CustomTable";

export default function Page() {
  return (
    <div className="flex flex-col gap-5 py-2">
      <Path />
      <Card className="lg:flex lg:flex-col lg:gap-3 p-4">
        <div className="lg:flex lg:gap-2">
          <SelectRole />
          <SearchUser />
          <Extract />
        </div>
        <CustomTable />
      </Card>
    </div>
  );
}
