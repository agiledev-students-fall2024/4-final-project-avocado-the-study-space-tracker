import { API_URL } from "@/config";
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
import useAuth from "@/context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

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
  const location = useLocation();
  const from = location.state?.from || "/"; // Default to home if no previous location
  const navigate = useNavigate();
  const { login } = useAuth();
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
    const response = await fetch(`${API_URL}/user/login`, {
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
        description: `Welcome back, ${username}`,
        duration: 1000,
      });
      login(token);
      navigate(from); // Navigate to the previous page or home
    } else {
      const { message } = await response.json();
      toast({
        variant: "destructive",
        title: "Log in failed",
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
              Sign in
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
                {pending ? <Loader style={{ animation: "spin 1s linear infinite" }} /> : "Log in"}
              </Button>{" "}
            </div>
          </div>

          <Link
            to="/signup"
            state={{ from: from }} // Pass the same 'from' location
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "4px",
              fontSize: "14px",
              color: "#a1a1aa",
            }}
          >
            No account yet?{" "}
            <div style={{ fontWeight: "600", textDecoration: "underline" }}>Sign up</div>
          </Link>
        </form>
      </Form>
    </div>
  );
}
