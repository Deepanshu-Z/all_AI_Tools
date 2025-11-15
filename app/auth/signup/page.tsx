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
import { signUpSchema, signUpInput } from "@/schemas/signUpSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
// import { Router, useRouter } from "next/router";
import { useState } from "react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function page() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<signUpInput>({
    resolver: zodResolver(signUpSchema),
  });
  const router = useRouter();
  const [msg, setMsg] = useState();

  const onSubmit = async (data: signUpInput) => {
    try {
      const res = await axios.post(
        "/api/auth/signup",
        {
          dob: data.dob || "",
          email: data.email,
          password: data.password,
          username: data.username,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Printing response: ", res.data);
      if (res.status === 200) {
        router.push("/signin");
      } else {
        setMsg(res.data);
      }
    } catch (err: any) {
      setMsg(err?.response?.data.error);
      console.log(
        "Error on client onSubmit (SignUp form): ",
        err?.response?.data
      );
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Signup to your account</CardTitle>
          <CardDescription>Enter your details below to signup</CardDescription>
          <CardAction>
            <Link href="/signin">
              <Button variant="link">Log In</Button>
            </Link>
          </CardAction>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 w-full max-w-md mx-auto p-6 border rounded"
          >
            <div>
              <Label htmlFor="username">Username</Label>
              <Input id="username" {...register("username")} />
              {errors.username && (
                <p className="text-red-500 text-sm">
                  {errors.username.message}
                </p>
              )}
            </div>
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
            <div>
              <Label htmlFor="dob">Date of Birth</Label>
              <Input id="dob" type="date" {...register("dob")} />
              {errors.dob && (
                <p className="text-red-500 text-sm">{errors.dob.message}</p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Signing up..." : "Sign Up"}
            </Button>
            {msg && <p className="text-center text-red-500">{msg}</p>}
          </form>
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => signIn("google", { callbackUrl: "/signin" })}
          >
            SignUp with Google
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
