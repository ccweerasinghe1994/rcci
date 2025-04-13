"use client";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { emailSchema } from "@/validation/emailSchema";
// import { passwordSchema } from "@/validation/passwordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react"; // Change import from @/auth to next-auth/react
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Login() {
  const router = useRouter();

  const formSchema = z.object({
    email: emailSchema,
    password: z.string().min(2),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      
      if (result?.error) {
        form.setError("root", {
          message: "Invalid email or password",
        });
      } else {
        router.push("/my-account");
      }
    } catch (error) {
      console.error("Login error:", error);
      form.setError("root", {
        message: "An error occurred during login",
      });
    }
  };

  return (
    <main className={"flex min-h-screen justify-center items-center"}>
      <Card className={"w-[380px]"}>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Login in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <fieldset
                className={"flex flex-col gap-2"}
                disabled={form.formState.isSubmitting}
              >
                <FormField
                  control={form.control}
                  name={"email"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input {...field} type={"password"} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  name={"password"}
                />
                {!!form.formState.errors.root?.message && (
                  <FormMessage>
                    {form.formState.errors.root.message}
                  </FormMessage>
                )}
                <Button type={"submit"} className={"w-full"}>
                  Login
                </Button>
              </fieldset>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <div className="text-muted-foreground text-sm">
            Don&apos;t have and account?{" "}
            <Link href={"/register"} className="underline text-sm">
              {" "}
              Register
            </Link>
          </div>
          <div className="text-muted-foreground text-sm">
            Forgot your password?{" "}
            <Link href={"/reset-password"} className="underline text-sm">
              {" "}
              Reset My Password
            </Link>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
}
