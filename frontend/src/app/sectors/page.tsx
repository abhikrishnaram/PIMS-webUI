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
        <div>
            <h2 className="text-3xl font-bold mb-6">Group List</h2>
            <Input
                type="text"
                placeholder="Search groups..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4"
            />
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Total Valves</TableHead>
                        <TableHead>Active Valves</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredGroups.map((group) => (
                        <TableRow key={group.id}>
                            <TableCell>{group.id}</TableCell>
                            <TableCell>{group.name}</TableCell>
                            <TableCell>{group.valveCount}</TableCell>
                            <TableCell>{group.activeValves}</TableCell>
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