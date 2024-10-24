"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { Loader } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const formSchema = z.object({
  username: z.string().min(1, {
    message: "Required",
  }),
  password: z.string().min(1, {
    message: "Required",
  }),
});

export default function LoginForm() {
  const [pending, setPending] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setPending(true);
    // make call to backend and store token
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-4 space-y-3 w-[75vw]"
        >
          <div className="w-full flex-1 rounded-lg px-6 pb-4  md:w-96">
            <h1 className="mb-3 text-2xl font-bold">Sign in</h1>
            <div className="w-full">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      htmlFor="username"
                      className="mb-3 mt-5 block text-xs font-medium text-zinc-400"
                    >
                      Username
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          className="peer block rounded-md border bg-zinc-50 px-2 py-[9px] text-sm outline-none placeholder:text-zinc-500"
                          id="username"
                          type="text"
                          name="username"
                          placeholder="Enter your username"
                          required
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel
                      htmlFor="password"
                      className="mb-3 mt-5 block text-xs font-medium text-zinc-400"
                    >
                      Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          className="peer block w-full rounded-md border bg-zinc-50 px-2 py-[9px] text-sm outline-none placeholder:text-zinc-500"
                          id="password"
                          type="password"
                          name="password"
                          placeholder="Enter password"
                          required
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="my-4 flex h-10 border-blue-600 w-full flex-row items-center justify-center bg-[#6366f1] px-8 text-sm font-medium text-white shadow transition-colors hover:bg-[#4f46e5] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                aria-disabled={pending}
                disabled={pending}
              >
                {pending ? <Loader className="animate-spin" /> : "Log in"}
              </Button>{" "}
            </div>
          </div>

          <Link
            to="/signup"
            className="flex flex-row gap-1 text-sm text-zinc-400"
          >
            No account yet?{" "}
            <div className="font-semibold underline">Sign up</div>
          </Link>
        </form>
      </Form>
    </div>
  );
}
