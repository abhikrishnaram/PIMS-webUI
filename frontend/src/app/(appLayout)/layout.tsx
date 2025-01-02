"use client"
import useAuth from "@/hooks/use-auth";
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import Topbar from "@/app/(appLayout)/_components/topbar";
import Fetcher from "@/lib/fetcher";

const AppLayout = ({ children }) => {

    const { isLoggedOut, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loading && isLoggedOut) router.push('/login')
    }, [loading]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100">
            <Topbar />
            <main className="flex-1 overflow-y-auto max-w-[1600px] p-6 mx-auto">
              {children}
          </main>
        </div>
    )
}

export default AppLayout;