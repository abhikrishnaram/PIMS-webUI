import {Badge} from "@/components/ui/badge";
import React from "react";

const Topbar = () => {
    return (
        <div className="border-b border-slate-700 bg-slate-800/50 backdrop-blur-sm">
            <div className="flex items-center justify-between p-4 max-w-[1600px] mx-auto">
                <div className="flex items-center space-x-4">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                        PIMS Dashboard™
                    </h1>
                </div>
                <div className="flex items-center space-x-4">
                    {/*<Button variant="ghost" size="icon">*/}
                    {/*  <Settings className="h-5 w-5" />*/}
                    {/*</Button>*/}
                    {/*<Button variant="ghost" size="icon">*/}
                    {/*  <BellIcon className="h-5 w-5" />*/}
                    {/*</Button>*/}
                    <Badge className="bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30">
                        <div className="h-2 w-2 bg-emerald-500 rounded-full mr-2"/>
                        System Online
                    </Badge>
                </div>
            </div>
        </div>
    )
}

export default Topbar;