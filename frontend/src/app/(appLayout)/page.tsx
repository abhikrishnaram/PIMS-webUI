"use client"
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Wifi, Cloud, Server, Power, Database, Activity,
  Droplet, Thermometer, Battery, Signal, Settings,
  BarChart2, AlertTriangle, BellIcon, ListPlus, PlusCircle, LayoutGrid, Settings2
} from "lucide-react";
import {Input} from "@/components/ui/input";
import ValveControlSection from "@/app/(appLayout)/_components/valve-control";
import Topbar from "@/app/(appLayout)/_components/topbar";
import Fetcher from '@/lib/fetcher';

const Dashboard = () => {

  const [valves, setValves] = useState([]);
  const [groups, setGroups] = useState([]);

  const metrics = {
    totalFlow: '45.2 L/min',
    avgPressure: '2.3 bar',
    activeValves: 3,
    alerts: 0
  }

  useEffect(() => {
    const getData = async () => {
      const dgroups = await Fetcher('/api/groups/?format=json')
      const groupResponse = await dgroups.json()
      setGroups(groupResponse);

      const data = await Fetcher('/api/valves/?format=json')
      const response = await data.json()
      
      console.log(response)
      console.log(groupResponse)

      setValves(response.map(valve => {
        valve.group = groupResponse.find(group => group.id === valve.group)
        return valve
      }))
    }
    getData()
  }, [])

  return (
        <>
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              {icon: Droplet, label: 'Total Flow', value: '156.7 L/min', trend: '+2.3%'},
              {icon: Signal, label: 'Network Status', value: '8% Online', trend: '2 Nodes'},
              {icon: Activity, label: 'System Load', value: '76%', trend: 'Normal'},
              {icon: AlertTriangle, label: 'Active Alerts', value: '0', trend: 'All Clear'}
            ].map((stat, index) => (
                <Card key={index} className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-slate-400 text-sm">{stat.label}</span>
                        <span className="text-2xl font-bold mt-1 text-white">{stat.value}</span>
                        <span className="text-emerald-400 text-sm mt-1">{stat.trend}</span>
                      </div>
                      <stat.icon className="h-8 w-8 text-slate-400"/>
                    </div>
                  </CardContent>
                </Card>
            ))}
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quick Actions */}
            <Card className="bg-slate-800/50 lg:col-span-2 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-slate-100">Quick Actions</span>
                  {/*<Button variant="outline" className="text-sm border-slate-600 hover:bg-slate-700">*/}
                  {/*  <Settings2 className="h-4 w-4 mr-2"/>*/}
                  {/*  Settings*/}
                  {/*</Button>*/}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Add Valve Card */}
                  <Card
                      className="group bg-slate-800/50 border-slate-600 hover:bg-slate-700/80 transition-all hover:border-emerald-500/50 cursor-pointer w-full">
                    <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-3">
                      <div
                          className="h-12 w-12 rounded-full bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors flex items-center justify-center">
                        <PlusCircle className="h-6 w-6 text-emerald-400"/>
                      </div>
                      <h3 className="font-medium text-slate-100">Manage Valve</h3>
                      <p className="text-sm text-slate-400">
                        Organize and control irrigation valves
                      </p>
                      <Button
                          variant="ghost"
                          className="w-full border border-slate-700 hover:bg-emerald-500/10 hover:text-emerald-400 text-emerald-400"
                      >
                        View Valves
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Manage Sectors Card */}
                  <Card
                      className="group bg-slate-800/50 border-slate-600 hover:bg-slate-700/80 transition-all hover:border-emerald-500/50 cursor-pointer w-full">
                    <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-3">
                      <div
                          className="h-12 w-12 rounded-full bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors flex items-center justify-center">
                        <LayoutGrid className="h-6 w-6 text-emerald-400"/>
                      </div>
                      <h3 className="font-medium text-slate-100">Manage Sectors</h3>
                      <p className="text-sm text-slate-400">Organize farm sectors and zones</p>
                      <Button
                          variant="ghost"
                          className="w-full border border-slate-700 hover:bg-emerald-500/10 hover:text-emerald-400 text-emerald-400"
                      >
                        View Sectors
                      </Button>
                    </CardContent>
                  </Card>

                  {/* View All Card */}
                  {/*<Card*/}
                  {/*    className="group bg-slate-800/50 border-slate-600 hover:bg-slate-700/80 transition-all hover:border-emerald-500/50 cursor-pointer">*/}
                  {/*  <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-3">*/}
                  {/*    <div*/}
                  {/*        className="h-12 w-12 rounded-full bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors flex items-center justify-center">*/}
                  {/*      <ListPlus className="h-6 w-6 text-emerald-400"/>*/}
                  {/*    </div>*/}
                  {/*    <h3 className="font-medium text-slate-100">View All</h3>*/}
                  {/*    <p className="text-sm text-slate-400">Complete system overview</p>*/}
                  {/*    <Button*/}
                  {/*        variant="ghost"*/}
                  {/*        className="w-full border border-slate-700 hover:bg-emerald-500/10 hover:text-emerald-400"*/}
                  {/*    >*/}
                  {/*      View All*/}
                  {/*    </Button>*/}
                  {/*  </CardContent>*/}
                  {/*</Card>*/}
                </div>
              </CardContent>
            </Card>

            {/* System Status */}
            <div>
              <Card className="bg-slate-800/50 text-white border-slate-700">
                <CardHeader>
                  <CardTitle>System Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Mesh Network Status */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">Mesh Network</span>
                      <Badge className="bg-emerald-500/20 text-emerald-400">
                        2/23 Online
                      </Badge>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 w-[8%]"/>
                    </div>
                  </div>

                  {/* Server Status */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">Server Load</span>
                      <Badge className="bg-emerald-500/20 text-emerald-400">
                        Normal
                      </Badge>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 w-[76%]"/>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="space-y-3">
                    <h3 className="font-medium">Recent Activity</h3>
                    <div className="space-y-2">
                      {[
                        {event: 'Schedule Updated', time: '2 mins ago'},
                        {event: 'Backup Completed', time: '15 mins ago'},
                        {event: 'System Check', time: '1 hour ago'}
                      ].map((activity, index) => (
                          <div key={index} className="flex items-center justify-between text-sm">
                            <span className="text-slate-300">{activity.event}</span>
                            <span className="text-slate-500">{activity.time}</span>
                          </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="lg:col-span-2 mt-6">
            <ValveControlSection valves={valves} groups={groups} setValves={setValves} />
          </div>
        </>
  );
};

export default Dashboard;