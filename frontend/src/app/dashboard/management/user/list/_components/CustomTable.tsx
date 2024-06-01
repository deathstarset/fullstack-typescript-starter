"use client";
import { getUsers } from "@/requests/user";
import { DataTable } from "./data-table";
import { columns } from "./columns";

import useSWR from "swr";

export const CustomTable = () => {
  const { data, error, isLoading } = useSWR("users", getUsers);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (data) {
    return <DataTable columns={columns} data={data.users} />;
  }
};
