import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Activity, Battery, Droplet, Settings, Signal} from "lucide-react";
import React, {useState} from "react";
import {Input} from "@/components/ui/input";
import ValveCard from "@/app/(appLayout)/_components/valve-card";

const getStatusColor = (status) => status === 'active' ? 'bg-emerald-500' : 'bg-slate-500';
const getSignalColor = (strength) => strength > 80 ? 'text-emerald-500' : strength > 60 ? 'text-amber-500' : 'text-red-500';

const ValveControlSection = ({zones, activeZone}) => {

    const [searchQuery, setSearchQuery] = useState('');

    const stats = {
        totalValves: 24,
        activeValves: 8,
        waterFlow: '156.7 L/min',
        pressure: '2.4 bar'
    };

    const valves = [
        { id: 1, name: 'Valve N1', sector: 'North Field', status: 'active', flow: '2.3 L/min' },
        { id: 2, name: 'Valve S1', sector: 'South Field', status: 'active', flow: '2.1 L/min' }
    ];


    const filteredValves = valves.filter(valve =>
        valve.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        valve.sector.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
            {zones[activeZone].valves.map((valve) => (
                <ValveCard valve={valve} key={valve.id} />
            ))}
        </div>
    </CardContent>
</Card>
    )
}

export default ValveControlSection;
