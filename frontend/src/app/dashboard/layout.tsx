import { SideBar } from "@/components/layout/sidebar";
import { Nav } from "@/components/layout/nav";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const accessToken = cookies().get("token");
  if (!accessToken) {
    return redirect("/auth/login");
  }
  return (
    <div className="flex">
      <SideBar />
      <div className="w-full">
        <Nav />
        <div className="px-4">{children}</div>
      </div>
    </div>
  );
}
