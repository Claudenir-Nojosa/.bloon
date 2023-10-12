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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LoginSchema } from "@/lib/validations/user";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import { title as textTitle } from "../shared/primitives";
import Image from "next/image";
import MaxWidthWrapper from "../shared/MaxWidthWrapper";
import { LockKeyhole } from "lucide-react";
import { GithubIcon, GoogleIcon } from "../shared/icons";

const LoginForm = () => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/");
    }
  });
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
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

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    console.log(values);
    try {
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (res?.error == null) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <MaxWidthWrapper className="max-w-xl mb-12 sm:mt-15 flex flex-col items-center justify-center text-center">
      <Card className="border rounded-2xl p-2 pb-2 mt-6 min-w-[20rem]">
        <CardHeader className="flex flex-col text-lg  dark:text-zinc-300 justify-center items-center text-center">
          <Image
            src="https://github.com/Claudenir-Nojosa/servidor_estaticos/raw/main/site-bloon-favicon.ico"
            alt="Logo"
            height={60}
            width={60}
            className="m-6"
          />
          <h1>Seja bem vindo!</h1>
          <p className="text-zinc-400">Por gentileza, realize o login.</p>
        </CardHeader>
        <Form {...form}>
          <CardBody>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                      <Input type="password" placeholder="Senha" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-center items-center">
                <Button
                  className="hover:text-zinc-400 w-full mt-[20px] rounded-2xl"
                  variant="outline"
                  type="submit"
                >
                  Login
                </Button>
              </div>
            </form>
          </CardBody>
          <CardFooter className="flex text-center items-center justify-center">
            <div className="flex flex-col justify-center items-center">
              <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
                ou continue com
              </div>
              <div className="gap-3 flex justify-center items-center w-full">
                <Button
                  size="icon"
                  className="dark:hover:bg-zinc-900  w-full"
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
              <p className="text-center text-sm text-slate-300 mt-20">
                Não possui conta?
                <Link
                  className="text-blue-500 hover:underline ml-2"
                  href="/register"
                >
                  Crie uma agora
                </Link>
              </p>
            </div>
          </CardFooter>
        </Form>
      </Card>
    </MaxWidthWrapper>
  );
};

export default LoginForm;
