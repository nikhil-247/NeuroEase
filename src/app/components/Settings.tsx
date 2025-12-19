import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { mockPatient } from '../data/mockData';
import { User, Database, Download, Bell, Shield, LogOut } from 'lucide-react';
import { Switch } from './ui/switch';

export function Settings() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-semibold mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      {/* Patient Profile */}
      <Card>
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <User className="h-5 w-5 text-primary" />
            <h3 className="font-medium text-lg">Patient Profile</h3>
          </div>
          <div className="flex items-center gap-4">
            <img src={mockPatient.photoUrl} alt={mockPatient.name} className="w-20 h-20 rounded-full object-cover" />
            <div className="flex-1">
              <div className="font-medium text-lg">{mockPatient.name}</div>
              <div className="text-sm text-muted-foreground">
                {mockPatient.age} years · {mockPatient.dementiaStage} Stage
              </div>
            </div>
            <Button variant="outline">Edit Profile</Button>
          </div>
        </div>
      </Card>

      {/* Notifications */}
      <Card>
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="h-5 w-5 text-primary" />
            <h3 className="font-medium text-lg">Notifications</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Session Reminders</div>
                <div className="text-sm text-muted-foreground">Get notified before scheduled sessions</div>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Feedback Prompts</div>
                <div className="text-sm text-muted-foreground">Reminder to provide session feedback</div>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Weekly Reports</div>
                <div className="text-sm text-muted-foreground">Summary of therapy progress</div>
              </div>
              <Switch />
            </div>
          </div>
        </div>
      </Card>

      {/* Data Management */}
      <Card>
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <Database className="h-5 w-5 text-primary" />
            <h3 className="font-medium text-lg">Data Management</h3>
          </div>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Download className="h-4 w-4 mr-2" />
              Export All Data
            </Button>
            <div className="bg-secondary/50 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-primary mt-0.5" />
                <div className="flex-1 text-sm text-muted-foreground">
                  <p>Your data is encrypted and stored securely. We never share personal information with third parties.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Caregiver Account */}
      <Card>
        <div className="p-6 space-y-4">
          <h3 className="font-medium text-lg">Caregiver Account</h3>
          <div className="space-y-3">
            <div className="space-y-2">
              <label className="text-sm">Email</label>
              <Input value="caregiver@example.com" readOnly />
            </div>
            <div className="space-y-2">
              <label className="text-sm">Name</label>
              <Input value="Sarah Thompson" readOnly />
            </div>
            <Button variant="outline" className="w-full">
              Change Password
            </Button>
          </div>
        </div>
      </Card>

      {/* Sign Out */}
      <Card className="border-destructive/30">
        <div className="p-6">
          <Button variant="outline" className="w-full text-destructive hover:bg-destructive/10">
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </Card>

      {/* App Info */}
      <div className="text-center text-sm text-muted-foreground space-y-1">
        <p>NeuroEase v1.0.0</p>
        <p>© 2025 NeuroEase · Privacy Policy · Terms of Service</p>
      </div>
    </div>
  );
}
