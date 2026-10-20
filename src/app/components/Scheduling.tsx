import React from 'react';
import { Calendar, Clock, Smartphone, Plus, Edit, Trash2 } from 'lucide-react';
import { mockSchedules, mockSessions, type Schedule } from '../data/mockData';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Switch } from './ui/switch';

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function formatDisplayTime(value: string): string {
  const [hourText, minute] = value.split(':');
  const hour = Number(hourText);
  if (!Number.isInteger(hour) || hour < 0 || hour > 23 || !/^\d{2}$/.test(minute ?? '')) {
    return value;
  }
  const suffix = hour >= 12 ? 'PM' : 'AM';
  const twelveHour = hour % 12 || 12;
  return `${String(twelveHour).padStart(2, '0')}:${minute} ${suffix}`;
}

export function Scheduling() {
  const [schedules, setSchedules] = React.useState<Schedule[]>(() => [...mockSchedules]);
  const [isAdding, setIsAdding] = React.useState(false);
  const [sessionId, setSessionId] = React.useState(mockSessions[0]?.id ?? '');
  const [time, setTime] = React.useState('08:00');
  const [days, setDays] = React.useState<string[]>(['Mon', 'Tue', 'Wed', 'Thu', 'Fri']);
  const [device, setDevice] = React.useState('Bedroom Speaker');
  const [notice, setNotice] = React.useState('');

  const createSchedule = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const session = mockSessions.find((item) => item.id === sessionId);
    const normalizedDevice = device.trim();

    if (!session || !time || !normalizedDevice || days.length === 0) {
      setNotice('Choose a session, time, at least one day, and a device label.');
      return;
    }

    const schedule: Schedule = {
      id: `schedule-${Date.now()}`,
      sessionId: session.id,
      title: session.title,
      time: formatDisplayTime(time),
      days: WEEKDAYS.filter((day) => days.includes(day)),
      device: normalizedDevice,
      isActive: true,
    };

    setSchedules((current) => [schedule, ...current]);
    setIsAdding(false);
    setNotice('Schedule added to this page only. No real notifications are triggered.');
  };

  const toggleSchedule = (id: string, isActive: boolean) => {
    setSchedules((current) =>
      current.map((schedule) => schedule.id === id ? { ...schedule, isActive } : schedule)
    );
    setNotice('Schedule status changed in this preview only.');
  };

  const deleteSchedule = (id: string) => {
    setSchedules((current) => current.filter((schedule) => schedule.id !== id));
    setNotice('Schedule removed from this page preview.');
  };

  const toggleDay = (day: string) => {
    setDays((current) =>
      current.includes(day) ? current.filter((item) => item !== day) : [...current, day]
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Scheduling Preview</h1>
          <p className="text-muted-foreground">Organize sample session times and active states.</p>
          <p className="text-xs text-muted-foreground mt-2" role="note">
            Demo only: schedules are kept in page memory. No background jobs, push notifications, or speaker integrations are connected.
          </p>
        </div>
        <Button type="button" onClick={() => { setIsAdding((open) => !open); setNotice(''); }}>
          <Plus className="h-4 w-4 mr-2" aria-hidden="true" />
          {isAdding ? 'Cancel' : 'New Schedule'}
        </Button>
      </header>

      {isAdding && (
        <Card>
          <form onSubmit={createSchedule} className="p-6 space-y-4">
            <h2 className="font-medium text-lg">Create a sample schedule</h2>
            <div className="space-y-2">
              <label htmlFor="schedule-session" className="text-sm">Session template</label>
              <select
                id="schedule-session"
                value={sessionId}
                onChange={(event) => setSessionId(event.target.value)}
                className="w-full p-2 border border-border rounded-lg bg-input-background"
              >
                {mockSessions.map((session) => (
                  <option key={session.id} value={session.id}>{session.title}</option>
                ))}
              </select>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="schedule-time" className="text-sm">Time</label>
                <Input id="schedule-time" type="time" value={time} onChange={(event) => setTime(event.target.value)} required />
              </div>
              <div className="space-y-2">
                <label htmlFor="schedule-device" className="text-sm">Device label</label>
                <Input id="schedule-device" value={device} maxLength={80} onChange={(event) => setDevice(event.target.value)} required />
              </div>
            </div>
            <fieldset className="space-y-2">
              <legend className="text-sm">Repeat on</legend>
              <div className="flex flex-wrap gap-3">
                {WEEKDAYS.map((day) => (
                  <label key={day} className="inline-flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={days.includes(day)} onChange={() => toggleDay(day)} />
                    {day}
                  </label>
                ))}
              </div>
            </fieldset>
            <Button type="submit">Add schedule</Button>
          </form>
        </Card>
      )}

      {notice && <p className="text-sm text-muted-foreground" role="status">{notice}</p>}

      <section className="space-y-4" aria-labelledby="active-schedules-heading">
        <h2 id="active-schedules-heading" className="font-medium">Sample schedules ({schedules.length})</h2>
        {schedules.length === 0 && (
          <Card><div className="p-6 text-sm text-muted-foreground">No schedules in this preview. Create one to get started.</div></Card>
        )}
        {schedules.map((schedule) => (
          <Card key={schedule.id} className={`border-l-4 ${schedule.isActive ? 'border-l-primary' : 'border-l-muted'}`}>
            <div className="p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h3 className="font-medium text-lg">{schedule.title}</h3>
                    <label className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Switch
                        checked={schedule.isActive}
                        onCheckedChange={(checked) => toggleSchedule(schedule.id, checked)}
                        aria-label={`Toggle ${schedule.title}`}
                      />
                      {schedule.isActive ? 'Active in preview' : 'Paused in preview'}
                    </label>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" aria-hidden="true" />
                      {schedule.time}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" aria-hidden="true" />
                      {schedule.days.join(', ')}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Smartphone className="h-4 w-4" aria-hidden="true" />
                      {schedule.device}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button type="button" variant="ghost" size="sm" disabled title="Editing a saved schedule is not implemented">
                    <Edit className="h-4 w-4" aria-hidden="true" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    aria-label={`Delete ${schedule.title}`}
                    onClick={() => deleteSchedule(schedule.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </section>

      <Card>
        <div className="p-6">
          <h2 className="font-medium mb-4">Weekly Schedule Overview</h2>
          <div className="grid grid-cols-7 gap-2">
            {WEEKDAYS.map((day) => (
              <div key={day} className="text-center min-w-0">
                <div className="text-xs sm:text-sm font-medium text-muted-foreground mb-2">{day}</div>
                <div className="space-y-1">
                  {schedules
                    .filter((schedule) => schedule.days.includes(day) && schedule.isActive)
                    .map((schedule) => (
                      <div key={schedule.id} className="bg-primary/10 text-primary text-[10px] sm:text-xs p-1 rounded break-words">
                        {schedule.time.split(' ')[0]}
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
