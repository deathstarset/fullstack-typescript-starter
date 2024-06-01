"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema, RegisterSchemaType } from "@/types/user";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { RegisterUser } from "@/requests/user";
import { useRouter } from "next/navigation";

export const RegisterCard = () => {
  const router = useRouter();
  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });
  const onSubmit = async (data: RegisterSchemaType) => {
    await RegisterUser(data);
    router.push("/auth/login");
  };
  const [hidePassword, setHidePassword] = useState(true);
  return (
    <Card className="p-6 lg:w-[380px] min-h-[430px] flex flex-col gap-8">
      <h1 className="text-2xl font-bold">Get started absolutely free</h1>
      <span className="text-sm">
        Already have an account?
        <Link
          href={"/auth/login"}
          className="text-blue-400 hover:underline ml-2"
        >
          Sign in
        </Link>
      </span>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="lg:flex lg:flex-col lg:gap-5"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Email"
                    {...field}
                    className="py-6"
                    type="text"
                  />
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
                    placeholder="Username"
                    {...field}
                    className="py-6"
                    type="text"
                  />
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
                  <div className="lg:relative rounded">
                    <Input
                      placeholder="Password"
                      {...field}
                      type={hidePassword ? "password" : "text"}
                      className="lg:py-6 lg:w-full"
                    />
                    <Eye
                      className={`lg:absolute lg:right-3 top-1/2 lg:translate-y-[-50%] lg:cursor-pointer ${
                        hidePassword && "hidden"
                      }`}
                      onClick={() => setHidePassword(true)}
                    />
                    <EyeOff
                      className={`lg:absolute lg:right-3 lg:top-1/2 lg:translate-y-[-50%] lg:cursor-pointer ${
                        !hidePassword && "hidden"
                      }`}
                      onClick={() => setHidePassword(false)}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="lg:py-6" disabled={form.formState.isLoading}>
            Register
          </Button>
        </form>
      </Form>
    </Card>
  );
};
