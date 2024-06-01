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
import { LoginSchema, LoginSchemaType } from "@/types/user";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { loginUser } from "@/requests/user";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
export const LoginCard = () => {
  const router = useRouter();
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const onSubmit = async (data: LoginSchemaType) => {
    const res = await loginUser(data);
    const cookies = new Cookies(null, { path: "/" });
    cookies.set("token", res.data.accessToken);
    cookies.set("role", res.data.role);
    router.push("/dashboard");
  };
  const [hidePassword, setHidePassword] = useState(true);
  return (
    <Card className="p-6 lg:w-[380px] h-[430px] flex flex-col gap-8">
      <h1 className="text-2xl font-bold">Sign In To Website</h1>
      <span className="text-sm">
        New user?{" "}
        <Link href={"/auth/register"} className="text-blue-400 hover:underline">
          Create an account
        </Link>
      </span>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="lg:flex lg:flex-col lg:gap-5"
        >
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
          <span className="lg:text-sm self-end underline">
            Forgot Password?
          </span>
          <Button className="py-6">Login</Button>
        </form>
      </Form>
    </Card>
  );
};
