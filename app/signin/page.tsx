"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { signUpSchema, signUpInput } from "@/schemas/signUpScehma";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

export default function page() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<signUpInput>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: signUpInput) => {
    console.log("@@@HEY", data);
    try {
      const res = await axios.post(
        "/api/auth",
        {
          email: data.email,
          password: data.password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Printing response: ", res.data);
      if (res.status === 200) {
        console.log(res);
      } else {
        console.log("ERROR");
      }
    } catch (err: any) {
      console.log("Error on client onSubmit (SignUp form): ", err);
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Link href="/signup">
              <Button variant="link">Sign Up</Button>
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 w-full max-w-md mx-auto p-6 border rounded"
          >
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register("email")} />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" {...register("password")} />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Login in..." : "Log in"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
