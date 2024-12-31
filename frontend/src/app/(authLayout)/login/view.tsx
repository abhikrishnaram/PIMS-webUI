"use client";
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import Fetcher from "@/lib/fetcher";
import {FormEvent} from "react";
import {useRouter} from "next/navigation";
import {useToast} from "@/hooks/use-toast";

const LoginView = () => {

    const router = useRouter()
    const { toast } = useToast()

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(e.target?.username?.value)
        console.log(e.target?.password?.value)
        const res = await Fetcher('/api/login', true, {
            username: e.target?.username?.value,
            password: e.target?.password?.value,
        })

        if (res.ok){
            router.push('/')
        } else {
            const error = await res.json()
            toast({
                variant: 'destructive',
                title: 'Login Failed',
                description: error?.detail
            })
        }
    }

    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                    Enter your email below to login to your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleLogin} className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            name="username"
                            type="text"
                            placeholder="johndoe"
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="**********"
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full">
                        Login
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}

export default LoginView;