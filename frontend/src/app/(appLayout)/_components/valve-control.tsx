import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Activity, Battery, Droplet, Settings, Signal} from "lucide-react";
import React, {useState} from "react";
import {Input} from "@/components/ui/input";
import ValveCard from "@/app/(appLayout)/_components/valve-card";
import Fetcher from "@/lib/fetcher";
import { toast } from "@/hooks/use-toast";

const getStatusColor = (status) => status === 'active' ? 'bg-emerald-500' : 'bg-slate-500';
const getSignalColor = (strength) => strength > 80 ? 'text-emerald-500' : strength > 60 ? 'text-amber-500' : 'text-red-500';

const ValveControlSection = ({ valves, groups, setValves }) => {

    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState([]);

    const stats = {
        totalValves: 24,
        activeValves: 8,
        waterFlow: '156.7 L/min',
        pressure: '2.4 bar'
    };

    const filteredValves = valves.filter(valve => {
        return valve.name.toLowerCase().includes(searchQuery.toLowerCase()) || valve.group.name.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const handleUpdate = async (valve) => {
        setLoading([...loading, valve.id]);

        const res = await Fetcher(`/api/valves/${valve.id}/toggle`)
        const data = await res.json()

        if (data.valve_status !== null) {
            const updatedValves = valves.map(v => {
                if (v.id === valve.id) {
                    return {
                        ...v,
                        status: data.valve_status
                    }
                }
                return v
            })

            setValves(updatedValves)
        } else {
            toast({
                title: 'Error',
                description: 'Failed to update valve status',
            })
        }
        setLoading(loading.filter(id => id !== valve.id))
    }

    return (
        <Card className="bg-slate-800/50 border-slate-700">
    <CardHeader>
        <CardTitle className="flex items-center justify-between">
            <span className="text-white">Valve Control Panel</span>
            <Input
                placeholder="Search valves..."
                className="max-w-xs text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </CardTitle>
    </CardHeader>
    <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredValves.map((valve) => (
                <ValveCard
                    isActive={valve.status === 'on'}
                    toggleActive={() => handleUpdate(valve)}
                    valve={{
                        ...valve,
                        memory: '40%',
                        signal: 90,
                    }} 
                    key={valve.id} 
                    loading={loading.includes(valve.id)}
                />
            ))}
        </div>
    </CardContent>
</Card>
    )
}

export default ValveControlSection;
