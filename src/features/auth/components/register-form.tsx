"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from 'react-hook-form';
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";

const registerSchema = z.object({
    email: z.email("please enter a valid email address"),
    password: z.string().min(1, "password is required"),
    confirmPassword: z.string(),
})
    .refine((data) => data.password === data.confirmPassword, {
        message: "passwords don't match",
        path: ["confirmPassword"]
})

type registerFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
    const router = useRouter(); 

    const form = useForm<registerFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: ""
        },
    });

    const onSubmit = async (data: registerFormValues) => {
        console.log("form data is  ", data);

        await authClient.signUp.email({
            name: data.email,
            email: data.email,
            password: data.password,
            callbackURL: "/"
        }, {
            onSuccess: () => {
                router.push("/");
            },
            onError: (ctx) => {
                toast.error(ctx.error.message);
            }
        });
    }

    const isPending = form.formState.isSubmitting;

    return (
        <div className="flex flex-col gap-6 md:min-w-[35%]">
            <Card>
                <CardHeader className="text-center">
                    <CardTitle>
                        Get Started
                    </CardTitle>
                    <CardDescription>
                        Create your account to get started
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="grid gap-6">
                                <div className="flex flex-col gap-4">
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        type="button"
                                        disabled={isPending}>
                                        continue with google
                                    </Button>
                                </div>

                                <div className="grid gap-6">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Email
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="email"
                                                        placeholder="abc@gmail.com"
                                                        {...field}>
                                                    </Input>
                                                </FormControl>
                                                <FormMessage></FormMessage>
                                            </FormItem>
                                        )}>

                                    </FormField>

                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Password
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="password"
                                                        placeholder="*******"
                                                        {...field}>
                                                    </Input>
                                                </FormControl>
                                                <FormMessage></FormMessage>
                                            </FormItem>
                                        )}>
                                    </FormField>

                                    <FormField
                                        control={form.control}
                                        name="confirmPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    confirmPassword
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="password"
                                                        placeholder="*******"
                                                        {...field}>
                                                    </Input>
                                                </FormControl>
                                                <FormMessage></FormMessage>
                                            </FormItem>
                                        )}>
                                    </FormField>
                                    <div>
                                        <Button type="submit" className="w-full" disabled={isPending}>
                                            Login
                                        </Button>
                                    </div>
                                    <div className="text-center text-sm">
                                       Already have an account? {" "}
                                        <Link href="/signup"
                                            className="underline underlien-offset-4">Login</Link>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
