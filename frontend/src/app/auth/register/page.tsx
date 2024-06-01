import { RegisterCard } from "./RegisterCard";

export default function Page() {
  return (
    <div className="lg:w-screen lg:h-screen lg:p-4 lg:flex">
      <div className="lg:w-2/3 lg:flex lg:flex-col lg:gap-5 bg-slate-50">
        <div className="lg:w-full lg:h-[7vh] flex items-center">
          <h1 className="text-3xl font-bold">Your Website</h1>
        </div>
        <div className=" h-full lg:flex lg:justify-center lg:items-center lg:flex-col gap-5">
          <h1 className="text-3xl font-bold text-center">
            Lorem ipsum dolor sit amet elit. Quod, laudantium.
          </h1>
        </div>
      </div>
      <div className="lg:h-full lg:w-1/3 ">
        <div className="lg:w-full lg:h-[7vh]"></div>
        <div className="lg:flex lg:flex-col lg:items-center lg:justify-center lg:h-full">
          <RegisterCard />
        </div>
      </div>
    </div>
  );
}
