"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { RegisterSchema } from "@/lib/validations/user";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import { title as textTitle } from "../shared/primitives";
import MaxWidthWrapper from "../shared/MaxWidthWrapper";
import Image from "next/image";
import { GithubIcon, GoogleIcon } from "../shared/icons";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  });
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const router = useRouter();
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  const googleSignInHandler = async () => {
    try {
      const res = await signIn("google");
      if (res?.error == null) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const githubSignInHandler = async () => {
    try {
      const res = await signIn("github");
      if (res?.error == null) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit: SubmitHandler<z.infer<typeof RegisterSchema>> = async (
    values
  ) => {
    console.log(values);
    try {
      const response = await axios.post(
        "/api/register",
        {
          name: values.username,
          email: values.email,
          password: values.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const user = response.data;
      toast.success("Conta criada com sucesso.");
      router.push("/login");
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <MaxWidthWrapper className="max-w-xl mb-12 sm:mt-15 flex flex-col items-center justify-center text-center">
      <Card className="border rounded-2xl p-2 pb-2 mt-6 min-w-[20rem]">
        <CardHeader className="flex flex-col text-lg  dark:text-zinc-300 text-black justify-center items-center text-center">
          <Image
            src="https://github.com/Claudenir-Nojosa/servidor_estaticos/raw/main/site-bloon-favicon.ico"
            alt="Logo"
            height={60}
            width={60}
            className="m-6"
          />
          <h1>Seja bem vindo!</h1>
          <p className="text-zinc-400">Por gentileza, crie sua conta.</p>
        </CardHeader>
        <Form {...form}>
          <CardBody>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="text" placeholder="Seu nome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="email" placeholder="E-mail" {...field} />
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
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Sua senha"
                          {...field}
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer">
                          {showPassword ? (
                            <EyeIcon
                              className="h-6 w-6"
                              onClick={togglePasswordVisibility}
                            />
                          ) : (
                            <EyeOffIcon
                              className="h-6 w-6"
                              onClick={togglePasswordVisibility}
                            />
                          )}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-center items-center">
                <Button
                  className="hover:text-zinc-400 w-full mt-5 rounded-2xl"
                  variant="outline"
                  type="submit"
                >
                  Criar conta
                </Button>
              </div>
            </form>
          </CardBody>
          <CardFooter className="flex justify-center items-center">
            <div>
              <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
                ou continue com
              </div>
              <div className="gap-3 flex justify-center items-center">
                <Button
                  size="icon"
                  className="dark:hover:bg-zinc-900 w-full"
                  variant="outline"
                  onClick={githubSignInHandler}
                >
                  <GithubIcon />
                </Button>
                <Button
                  size="icon"
                  className="dark:hover:bg-zinc-900  w-full"
                  variant="outline"
                  onClick={googleSignInHandler}
                >
                  <GoogleIcon />
                </Button>
              </div>
              <p className="text-center text-sm text-slate-300 mt-10">
                Você já possui uma conta?
                <Link
                  className="text-blue-500  hover:underline ml-2"
                  href="/login"
                >
                  Login
                </Link>
              </p>
            </div>
          </CardFooter>
        </Form>
      </Card>
    </MaxWidthWrapper>
  );
};

export default RegisterForm;
