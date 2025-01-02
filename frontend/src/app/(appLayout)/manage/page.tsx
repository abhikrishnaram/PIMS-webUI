"use client"
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table, TableBody, TableCell, TableHead,
    TableHeader, TableRow
} from "@/components/ui/table";
import { Plus, Edit, Trash2 } from "lucide-react";

const FarmManagement = () => {
    const [activeTab, setActiveTab] = useState('sectors');
    const [searchQuery, setSearchQuery] = useState('');

    // Sample data
    const sectors = [
        { id: 1, name: 'North Field', description: 'Northern irrigation zone', valveCount: 5, activeValves: 2 },
        { id: 2, name: 'South Field', description: 'Southern irrigation zone', valveCount: 3, activeValves: 1 }
    ];

    const valves = [
        { id: 1, name: 'Valve N1', sector: 'North Field', status: 'active', nodeId: 'ESP-001', lastMaintenance: '2024-01-15' },
        { id: 2, name: 'Valve S1', sector: 'South Field', status: 'inactive', nodeId: 'ESP-002', lastMaintenance: '2024-01-10' }
    ];

    const SectorManagement = () => (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <Input
                    placeholder="Search sectors..."
                    className="max-w-xs"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Sector
                </Button>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Valves</TableHead>
                        <TableHead>Active</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {sectors.map(sector => (
                        <TableRow key={sector.id}>
                            <TableCell className="font-medium">{sector.name}</TableCell>
                            <TableCell>{sector.description}</TableCell>
                            <TableCell>{sector.valveCount}</TableCell>
                            <TableCell>{sector.activeValves}</TableCell>
                            <TableCell className="flex space-x-2">
                                <Button variant="ghost" size="icon">
                                    <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="text-red-500">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );

    const ValveManagement = () => (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <Input
                    placeholder="Search valves..."
                    className="max-w-xs"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Valve
                </Button>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Sector</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Node ID</TableHead>
                        <TableHead>Last Maintenance</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {valves.map(valve => (
                        <TableRow key={valve.id}>
                            <TableCell className="font-medium">{valve.name}</TableCell>
                            <TableCell>{valve.sector}</TableCell>
                            <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs ${
                    valve.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {valve.status}
                </span>
                            </TableCell>
                            <TableCell>{valve.nodeId}</TableCell>
                            <TableCell>{valve.lastMaintenance}</TableCell>
                            <TableCell className="flex space-x-2">
                                <Button variant="ghost" size="icon">
                                    <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="text-red-500">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <Card>
                <CardHeader>
                    <CardTitle>Farm Management</CardTitle>
                </CardHeader>
                <CardContent>
                    <div value={activeTab} onValueChange={setActiveTab}>
                        <div className="mb-4">
                            <div value="sectors">Sectors</div>
                            <div value="valves">Valves</div>
                        </div>
                        <a value="sectors">
                            <SectorManagement />
                        </a>
                        <as value="valves">
                            <ValveManagement />
                        </as>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default FarmManagement;