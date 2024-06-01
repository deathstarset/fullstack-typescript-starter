"use client";

import { CreateUserSchema, CreateUserSchemaType } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { createUser } from "@/requests/user";

export const CreateForm = () => {
  const form = useForm<CreateUserSchemaType>({
    resolver: zodResolver(CreateUserSchema),
  });
  const onSubmit = async (data: CreateUserSchemaType) => {
    const res = await createUser(data);
    console.log(res);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="p-4 bg-slate-50 lg:grid lg:grid-cols-2 lg:gap-3">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="Email" className="lg:py-6" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Username"
                    className="lg:py-6"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select {...field}>
                    <SelectTrigger className="lg:py-6">
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Admin</SelectItem>
                      <SelectItem value="dark">User</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Password"
                    className="lg:py-6"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="lg:col-start-2 lg:flex lg:items-center lg:justify-end">
            <Button className="lg:py-6 lg:w-[130px]">Create</Button>
          </div>
        </Card>
      </form>
    </Form>
  );
};
