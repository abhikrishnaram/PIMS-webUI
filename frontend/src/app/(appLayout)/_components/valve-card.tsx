import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {Power, Clock, Settings, Droplet, Battery, Activity, Signal, EditIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import {clsx} from "clsx";
import Link from "next/link";
import Spinner from '@/components/ui/spinner';

const ValveControl = ({ valve, isActive, toggleActive, loading }) => {
    
    const [isHovered, setIsHovered] = useState(false);
    const getStatusColor = (status) => status ? 'bg-emerald-500' : 'bg-red-500';

    return (
        <Card className="relative bg-slate-800/50 border-slate-700 overflow-hidden">
            <CardContent className={clsx("p-0", valve.status === 'fault' && 'opacity-50')}>
                <div className="flex">
                    {/* Main Content */}
                    <div className="flex-grow p-4">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                                <span className="text-emerald-600">
                                    #{valve.id}
                                </span>
                                <span className="font-medium text-white">{valve.name}</span>
                                <span className="text-xs text-slate-400 border-l border-slate-500 pl-4">{valve.group?.name || "test"}</span>
                            </div>
                            <Link href={`/valves/${valve.id}`}>
                                <EditIcon className="h-4 w-4 text-slate-400" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center text-sm text-slate-300">
                                    <Activity className="h-4 w-4 mr-2 text-purple-400" />
                                    <div>
                                        <div>{valve.memory}</div>
                                        <div className="text-xs text-slate-400">Memory Usage</div>
                                    </div>
                                </div>
                                <div className="flex items-center text-sm text-slate-300">
                                    <Signal className="h-4 w-4 mr-2 text-amber-400" />
                                    <div>
                                        <div>{valve.signal}%</div>
                                        <div className="text-xs text-slate-400">Signal Strength</div>
                                    </div>
                                </div>
                        </div>
                    </div>

                    {/* Status Control */}
                    <div className="w-32 bg-slate-900/50 flex flex-col items-center justify-between border-l border-slate-700">
                        <div className="flex-grow flex flex-col items-center justify-center py-4 space-y-4">
                        {valve.status === 'fault' ? (
                                <div className="flex items-center justify-center h-full text-white">
                                    <h3>
                                        Disabled
                                    </h3>
                            </div>
                        ) : (
                            <>
                                <div className={`transition-all duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}>
                                    <Button
                                        onClick={toggleActive}
                                        className={clsx(
                                            'h-12 w-12 rounded-full flex items-center justify-center hover:bg-emerald-950/20 transition-colors duration-300',
                                            isActive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-700/20 text-red-400',
                                            loading && 'cursor-not-allowed opacity-50 bg-slate-900/20 text-slate-400'
                                        )}
                                        disabled={loading}
                                    >
                                        {loading ? (<Spinner />) : (<Power className="h-6 w-6" />)}
                                    </Button>
                                </div>

                                <span className="text-xs text-slate-400">
                                {isActive ? 'Turn Off' : 'Turn On'}
                                </span>
                            </>
                        )}
                        </div>

                        <div className="w-full p-3 text-center border-t border-slate-700">
                          <span className="text-xs text-slate-500">
                                <Badge className={`${getStatusColor(isActive)} capitalize`}>
                                    {isActive ? 'Active' : 'Inactive'}
                                </Badge>
                          </span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ValveControl;