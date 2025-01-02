"use client";
import Fetcher from "@/lib/fetcher";
import {FormEvent, useEffect} from "react";
import {useRouter} from "next/navigation";
import {useToast} from "@/hooks/use-toast";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Mail, LogIn } from "lucide-react";
import useAuth from "@/hooks/use-auth";

const LoginPage = () => {

    const router = useRouter()
    const { isLoggedIn } = useAuth()
    const { toast } = useToast()

    useEffect(() => {
        if (isLoggedIn) router.push('/')
    }, []);

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(e.target?.username?.value)
        console.log(e.target?.password?.value)
        const res = await Fetcher('/api/login', true, {
            username: e.target?.username?.value,
            password: e.target?.password?.value,
        })

        if (res.ok){
            console.log(res.json())
            localStorage.setItem('isLoggedIn', 'true')
            localStorage.setItem('username', e.target?.username?.value)
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
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
                <Card className="w-full max-w-md bg-slate-800/50 border-slate-700">
                    <CardHeader className="space-y-4 text-center">
                        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                            PIMS Dashboard™
                        </CardTitle>
                        <p className="text-slate-400">Sign in to access your dashboard</p>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-2">
                                <div className="relative">
                                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                    <Input
                                        type="text"
                                        name="username"
                                        placeholder="Username"
                                        className="pl-10 bg-slate-900/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="relative">
                                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                    <Input
                                        name="password"
                                        type="password"
                                        placeholder="Password"
                                        className="pl-10 bg-slate-900/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
                                    />
                                </div>
                            </div>
                            <Button className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600">
                                <LogIn className="h-5 w-5 mr-2" />
                                Sign In
                            </Button>
                        </form>
                    </CardContent>
                    {/*<CardFooter className="flex flex-col space-y-4 text-center">*/}
                    {/*    <div className="text-sm">*/}
                    {/*        <a href="#" className="text-slate-400 hover:text-slate-300">*/}
                    {/*            Forgot your password?*/}
                    {/*        </a>*/}
                    {/*    </div>*/}
                    {/*</CardFooter>*/}
                </Card>
            </div>
        );
    };

    export default LoginPage;