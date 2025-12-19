import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { mockPatient, mockSessions, mockSchedules } from '../data/mockData';
import { PlusCircle, Play, Calendar, Clock, AlertCircle } from 'lucide-react';

export function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Patient Card */}
      <Card className="border-2 border-primary/20 bg-gradient-to-br from-card to-secondary/30">
        <div className="p-6">
          <div className="flex items-start gap-6">
            <img
              src={mockPatient.photoUrl}
              alt={mockPatient.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-primary/20"
            />
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-foreground">{mockPatient.name}</h2>
                  <p className="text-muted-foreground">
                    {mockPatient.age} years old · {mockPatient.dementiaStage} Stage · {mockPatient.relationship}
                  </p>
                </div>
                <Link to="/patient-setup">
                  <Button variant="outline" size="sm">
                    Edit Profile
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link to="/memory-builder">
            <Card className="h-full hover:border-primary transition-colors cursor-pointer">
              <div className="p-6 flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-xl">
                  <PlusCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="font-medium">Add Memory</div>
                  <div className="text-sm text-muted-foreground">Build therapy content</div>
                </div>
              </div>
            </Card>
          </Link>

          <Link to="/session-generator">
            <Card className="h-full hover:border-accent transition-colors cursor-pointer">
              <div className="p-6 flex items-center gap-4">
                <div className="bg-accent/10 p-3 rounded-xl">
                  <Play className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <div className="font-medium">Generate Session</div>
                  <div className="text-sm text-muted-foreground">Create new therapy</div>
                </div>
              </div>
            </Card>
          </Link>

          <Link to="/playback">
            <Card className="h-full hover:border-secondary-foreground transition-colors cursor-pointer">
              <div className="p-6 flex items-center gap-4">
                <div className="bg-secondary p-3 rounded-xl">
                  <Play className="h-6 w-6 text-secondary-foreground" />
                </div>
                <div>
                  <div className="font-medium">Start Playback</div>
                  <div className="text-sm text-muted-foreground">Begin therapy now</div>
                </div>
              </div>
            </Card>
          </Link>
        </div>
      </div>

      {/* Upcoming Sessions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Upcoming Scheduled Sessions</h3>
          <Link to="/scheduling">
            <Button variant="ghost" size="sm">View All</Button>
          </Link>
        </div>
        <div className="space-y-3">
          {mockSchedules.filter(s => s.isActive).map((schedule) => (
            <Card key={schedule.id} className="border-l-4 border-l-primary">
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">{schedule.title}</div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {schedule.time}
                        </span>
                        <span>{schedule.days.join(', ')}</span>
                        <span>· {schedule.device}</span>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Edit
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Last Played Session */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Last Played Therapy Session</h3>
        <Card className="bg-gradient-to-br from-accent/5 to-accent/10 border-accent/30">
          <div className="p-6">
            <div className="flex items-start gap-4">
              <div className="bg-accent p-3 rounded-xl">
                <Play className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-medium text-lg">{mockSessions[0].title}</div>
                    <div className="text-sm text-muted-foreground">
                      {mockSessions[0].type} · {mockSessions[0].duration}
                    </div>
                  </div>
                  <Link to="/feedback">
                    <Button size="sm" variant="outline">
                      Give Feedback
                    </Button>
                  </Link>
                </div>
                <p className="text-sm text-muted-foreground">
                  {mockSessions[0].contentSummary}
                </p>
                <div className="mt-4 flex gap-2">
                  <Button size="sm" className="bg-accent hover:bg-accent/90">
                    <Play className="h-4 w-4 mr-2" />
                    Play Again
                  </Button>
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Emergency Button */}
      <Card className="border-2 border-destructive/20 bg-gradient-to-br from-destructive/5 to-destructive/10">
        <div className="p-6">
          <div className="flex items-center gap-4">
            <div className="bg-destructive p-3 rounded-xl">
              <AlertCircle className="h-6 w-6 text-destructive-foreground" />
            </div>
            <div className="flex-1">
              <div className="font-medium text-lg">Emergency Reassurance</div>
              <p className="text-sm text-muted-foreground">
                If your loved one is confused or anxious, tap here for immediate calming support
              </p>
            </div>
            <Link to="/emergency">
              <Button size="lg" variant="destructive">
                <AlertCircle className="h-5 w-5 mr-2" />
                Emergency Mode
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
