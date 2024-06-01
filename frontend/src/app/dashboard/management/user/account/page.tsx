import { Path } from "@/app/dashboard/Path";
import { AccounInfo } from "./_components/AccountInfo";

export default function Page() {
  return (
    <div className="flex flex-col gap-5 py-2">
      <Path />
      <AccounInfo />
    </div>
  );
}
