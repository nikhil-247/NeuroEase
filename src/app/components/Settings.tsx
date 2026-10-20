import { Bell, Database, Download, LogOut, Shield, User } from 'lucide-react';
import { mockPatient } from '../data/mockData';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Switch } from './ui/switch';

export function Settings() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <header>
        <h1 className="text-3xl font-semibold mb-2">Settings Preview</h1>
        <p className="text-muted-foreground">Sample account and preference controls.</p>
        <p className="text-xs text-muted-foreground mt-2" role="note">
          This prototype has no authentication, server-side storage, encryption layer, or notification service.
          All profile details are sample data. Do not enter real patient or account information.
        </p>
      </header>

      <Card>
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <User className="h-5 w-5 text-primary" aria-hidden="true" />
            <h2 className="font-medium text-lg">Sample Patient Profile</h2>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <img src={mockPatient.photoUrl} alt="Sample profile portrait" loading="lazy" className="w-20 h-20 rounded-full object-cover" />
            <div className="flex-1">
              <div className="font-medium text-lg">{mockPatient.name}</div>
              <div className="text-sm text-muted-foreground">
                {mockPatient.age} years · {mockPatient.dementiaStage} stage
              </div>
            </div>
            <Button type="button" variant="outline" disabled title="Profile editing is not connected">Edit profile unavailable</Button>
          </div>
        </div>
      </Card>

      <Card>
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="h-5 w-5 text-primary" aria-hidden="true" />
            <h2 className="font-medium text-lg">Notifications</h2>
          </div>
          <p className="text-sm text-muted-foreground">These sample preferences are display-only. No reminders or reports are sent.</p>
          <div className="space-y-4">
            {[
              { title: 'Session Reminders', description: 'Would notify before scheduled sessions' },
              { title: 'Feedback Prompts', description: 'Would remind a caregiver to record feedback' },
              { title: 'Weekly Reports', description: 'Would summarize sample session activity' },
            ].map((item) => (
              <div key={item.title} className="flex items-center justify-between gap-4">
                <div>
                  <div className="font-medium">{item.title}</div>
                  <div className="text-sm text-muted-foreground">{item.description}</div>
                </div>
                <Switch disabled aria-label={`${item.title} unavailable in prototype`} />
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Card>
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <Database className="h-5 w-5 text-primary" aria-hidden="true" />
            <h2 className="font-medium text-lg">Data Management</h2>
          </div>
          <Button type="button" variant="outline" className="w-full justify-start" disabled title="There is no persistent data store to export">
            <Download className="h-4 w-4 mr-2" aria-hidden="true" />
            Export unavailable — no stored data
          </Button>
          <div className="bg-secondary/50 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-primary mt-0.5" aria-hidden="true" />
              <div className="flex-1 text-sm text-muted-foreground">
                No encryption or privacy control is implemented in this UI-only prototype. The visible profile and sessions are sample fixtures, not a secure health-record system.
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="p-6 space-y-4">
          <h2 className="font-medium text-lg">Sample Caregiver Account</h2>
          <div className="space-y-3">
            <div className="space-y-2">
              <label htmlFor="sample-email" className="text-sm">Email</label>
              <Input id="sample-email" value="caregiver@example.com" readOnly />
            </div>
            <div className="space-y-2">
              <label htmlFor="sample-name" className="text-sm">Name</label>
              <Input id="sample-name" value="Sample Caregiver" readOnly />
            </div>
            <Button type="button" variant="outline" className="w-full" disabled title="Authentication is not implemented">
              Password management unavailable
            </Button>
          </div>
        </div>
      </Card>

      <Card className="border-destructive/30">
        <div className="p-6">
          <Button type="button" variant="outline" className="w-full text-destructive" disabled title="There is no signed-in account in this prototype">
            <LogOut className="h-4 w-4 mr-2" aria-hidden="true" />
            Sign out unavailable
          </Button>
        </div>
      </Card>

      <div className="text-center text-sm text-muted-foreground space-y-1">
        <p>NeuroEase UI prototype · v0.1.0</p>
        <p>Design demonstration only · No medical advice or real patient data storage</p>
      </div>
    </div>
  );
}
