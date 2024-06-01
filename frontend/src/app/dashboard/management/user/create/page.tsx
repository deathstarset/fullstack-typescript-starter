import { Path } from "@/app/dashboard/Path";
import { CreateForm } from "./_components/CreateForm";

export default function Page() {
  return (
    <div className="lg:flex lg:flex-col lg:gap-5 lg:py-2">
      <Path />
      <CreateForm />
    </div>
  );
}
