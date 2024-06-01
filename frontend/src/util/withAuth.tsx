import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export async function AuthenticatedComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = cookies().get("token")?.value;
  console.log(token);
  if (!token) {
    redirect("/auth/login");
  }

  return <>{children}</>;
}
