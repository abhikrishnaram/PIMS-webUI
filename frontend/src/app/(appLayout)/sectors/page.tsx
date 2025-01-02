"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

// Mock data for groups
const mockGroups = [
    { id: 1, name: "North Field", valveCount: 3, activeValves: 2 },
    { id: 2, name: "South Field", valveCount: 2, activeValves: 1 },
    { id: 3, name: "East Greenhouse", valveCount: 3, activeValves: 1 },
]

export default function GroupList() {
    const [searchTerm, setSearchTerm] = useState("")

    const filteredGroups = mockGroups.filter((group) =>
        group.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="p-6 rounded-lg shadow-md text-white">
            <h2 className="text-3xl font-bold text-gray-300 mb-6">List of Sectors</h2>
            <Input
                type="text"
                placeholder="Search groups..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4 p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-left text-gray-600">ID</TableHead>
                        <TableHead className="text-left text-gray-600">Name</TableHead>
                        <TableHead className="text-left text-gray-600">Total Valves</TableHead>
                        <TableHead className="text-left text-gray-600">Active Valves</TableHead>
                        <TableHead className="text-left text-gray-600">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredGroups.map((group) => (
                        <TableRow key={group.id}>
                            <TableCell className="text-gray-700">{group.id}</TableCell>
                            <TableCell className="text-gray-700">{group.name}</TableCell>
                            <TableCell className="text-gray-700">{group.valveCount}</TableCell>
                            <TableCell className="text-gray-700">{group.activeValves}</TableCell>
                            <TableCell>
                                <Badge variant={group.activeValves > 0 ? "success" : "secondary"}>
                                    {group.activeValves > 0 ? "Active" : "Inactive"}
                                </Badge>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
