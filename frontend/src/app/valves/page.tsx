"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"

// Mock data for valves
const mockValves = [
    { id: 1, name: "Valve 1", group: "North Field", status: true },
    { id: 2, name: "Valve 2", group: "North Field", status: false },
    { id: 3, name: "Valve 3", group: "South Field", status: true },
    { id: 4, name: "Valve 4", group: "South Field", status: false },
    { id: 5, name: "Valve 5", group: "East Greenhouse", status: true },
    { id: 6, name: "Valve 6", group: "East Greenhouse", status: false },
]

export default function ValveList() {
    const [searchTerm, setSearchTerm] = useState("")
    const [valves, setValves] = useState(mockValves)

    const filteredValves = valves.filter(
        (valve) =>
            valve.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            valve.group.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const toggleValve = (id: number) => {
        setValves(valves.map(valve =>
            valve.id === id ? { ...valve, status: !valve.status } : valve
        ))
    }

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">Valve List</h2>
            <Input
                type="text"
                placeholder="Search valves..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4"
            />
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Group</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredValves.map((valve) => (
                        <TableRow key={valve.id}>
                            <TableCell>{valve.id}</TableCell>
                            <TableCell>{valve.name}</TableCell>
                            <TableCell>{valve.group}</TableCell>
                            <TableCell>
                                <Badge variant={valve.status ? "success" : "destructive"}>
                                    {valve.status ? "Open" : "Closed"}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <Switch
                                    checked={valve.status}
                                    onCheckedChange={() => toggleValve(valve.id)}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}