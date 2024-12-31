"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"

// Mock data for valve groups and valves
const valveGroups = [
  {
    id: 1,
    name: "North Field",
    valves: [
      { id: 1, name: "Valve 1", status: true },
      { id: 2, name: "Valve 2", status: false },
      { id: 3, name: "Valve 3", status: true },
    ],
  },
  {
    id: 2,
    name: "South Field",
    valves: [
      { id: 4, name: "Valve 4", status: false },
      { id: 5, name: "Valve 5", status: true },
    ],
  },
  {
    id: 3,
    name: "East Greenhouse",
    valves: [
      { id: 6, name: "Valve 6", status: true },
      { id: 7, name: "Valve 7", status: false },
      { id: 8, name: "Valve 8", status: true },
    ],
  },
]

export default function Dashboard() {
  const [groups, setGroups] = useState(valveGroups)

  const toggleValve = (groupId: number, valveId: number) => {
    setGroups(
        groups.map((group) => {
          if (group.id === groupId) {
            return {
              ...group,
              valves: group.valves.map((valve) =>
                  valve.id === valveId ? { ...valve, status: !valve.status } : valve
              ),
            }
          }
          return group
        })
    )
  }

  return (
      <div>
        <h2 className="text-3xl font-bold mb-6">Valve Control Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => (
              <Card key={group.id}>
                <CardHeader>
                  <CardTitle>{group.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  {group.valves.map((valve) => (
                      <div key={valve.id} className="flex items-center justify-between mb-4">
                        <div>
                          <p className="font-medium">{valve.name}</p>
                          <Badge variant={valve.status ? "success" : "destructive"}>
                            {valve.status ? "Open" : "Closed"}
                          </Badge>
                        </div>
                        <Switch
                            checked={valve.status}
                            onCheckedChange={() => toggleValve(group.id, valve.id)}
                        />
                      </div>
                  ))}
                </CardContent>
              </Card>
          ))}
        </div>
      </div>
  )
}