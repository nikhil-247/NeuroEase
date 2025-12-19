import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { mockSchedules } from '../data/mockData';
import { Calendar, Clock, Smartphone, Plus, Edit, Trash2 } from 'lucide-react';
import { Switch } from './ui/switch';

export function Scheduling() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Scheduling & Automation</h1>
          <p className="text-muted-foreground">Manage automated therapy sessions</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          New Schedule
        </Button>
      </div>

      {/* Active Schedules */}
      <div className="space-y-4">
        {mockSchedules.map((schedule) => (
          <Card key={schedule.id} className={`border-l-4 ${schedule.isActive ? 'border-l-primary' : 'border-l-muted'}`}>
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-medium text-lg">{schedule.title}</h3>
                    <Switch checked={schedule.isActive} />
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {schedule.time}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {schedule.days.join(', ')}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Smartphone className="h-4 w-4" />
                      {schedule.device}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Calendar View */}
      <Card>
        <div className="p-6">
          <h3 className="font-medium mb-4">Weekly Schedule Overview</h3>
          <div className="grid grid-cols-7 gap-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <div key={day} className="text-center">
                <div className="text-sm font-medium text-muted-foreground mb-2">{day}</div>
                <div className="space-y-1">
                  {mockSchedules
                    .filter(s => s.days.includes(day) && s.isActive)
                    .map((s, i) => (
                      <div key={i} className="bg-primary/10 text-primary text-xs p-1 rounded">
                        {s.time.split(' ')[0]}
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
