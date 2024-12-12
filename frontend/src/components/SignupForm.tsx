import { API_URL } from "@/config";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Form,
  FormControl,
  FormDescription,
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
import useAuth from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  username: z.string().min(4, {
    message: "Username must be at least 4 characters",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
});

export default function SignupForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const [pending, setPending] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setPending(true);
    const response = await fetch(`${API_URL}/user/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: values.username,
        password: values.password,
      }),
    });
    if (response.ok) {
      const { token, username } = await response.json();
      toast({
        description: `Welcome, ${username}!`,
        duration: 1000,
      });
      login(token);
      navigate(from);
    } else {
      const { message } = await response.json();
      toast({
        variant: "destructive",
        title: "Sign up failed",
        description: message,
      });
      setPending(false);
    }
  }

  return (
    <div
      style={{
        height: "calc(100vh - 68px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
            width: "75vw",
          }}
        >
          <div
            style={{
              width: "100%",
              flex: "1",
              borderRadius: "8px",
              padding: "24px 24px 16px",
            }}
          >
            <h1 style={{ marginBottom: "12px", fontSize: "24px", fontWeight: "bold" }}>
              Sign Up
            </h1>
            <div style={{ width: "100%" }}>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      htmlFor="username"
                      style={{
                        marginBottom: "12px",
                        marginTop: "20px",
                        display: "block",
                        fontSize: "12px",
                        fontWeight: "500",
                        color: "#a1a1aa",
                      }}
                    >
                      Username
                    </FormLabel>
                    <FormControl>
                      <div style={{ position: "relative" }}>
                        <Input
                          {...field}
                          style={{
                            display: "block",
                            width: "100%",
                            borderRadius: "8px",
                            border: "1px solid",
                            backgroundColor: "#f5f5f7",
                            padding: "8px",
                            fontSize: "14px",
                            outline: "none",
                          }}
                          id="username"
                          type="text"
                          name="username"
                          placeholder="Enter your username"
                          required
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                    <FormDescription>
                      Your username will be shared when sharing routes.
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem style={{ marginTop: "16px" }}>
                    <FormLabel
                      htmlFor="password"
                      style={{
                        marginBottom: "12px",
                        marginTop: "20px",
                        display: "block",
                        fontSize: "12px",
                        fontWeight: "500",
                        color: "#a1a1aa",
                      }}
                    >
                      Password
                    </FormLabel>
                    <FormControl>
                      <div style={{ position: "relative" }}>
                        <Input
                          {...field}
                          style={{
                            display: "block",
                            width: "100%",
                            borderRadius: "8px",
                            border: "1px solid",
                            backgroundColor: "#f5f5f7",
                            padding: "8px",
                            fontSize: "14px",
                            outline: "none",
                          }}
                          id="password"
                          type="password"
                          name="password"
                          placeholder="Enter password"
                          required
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                    <FormDescription>
                      {form.getValues("password") &&
                      form.getValues("password").length < 6
                        ? "Password must be at least 6 characters."
                        : ""}
                    </FormDescription>
                  </FormItem>
                )}
              />
              <Button
                style={{
                  margin: "16px 0",
                  display: "flex",
                  height: "40px",
                  border: "1px solid #3b82f6",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "8px",
                  backgroundColor: "#6366f1",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#fff",
                }}
                aria-disabled={pending}
                disabled={pending}
              >
                {pending ? <Loader style={{ animation: "spin 1s linear infinite" }} /> : "Sign Up"}
              </Button>{" "}
            </div>
          </div>

          <Link
            to="/login"
            state={{ from: from }}
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "4px",
              fontSize: "14px",
              color: "#a1a1aa",
            }}
          >
            Have an account?{" "}
            <div style={{ fontWeight: "600", textDecoration: "underline" }}>Log In</div>
          </Link>
        </form>
      </Form>
    </div>
  );
}
