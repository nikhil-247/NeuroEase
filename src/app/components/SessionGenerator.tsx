import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { sessionTypes, mockSessions } from '../data/mockData';
import { Play, RotateCcw, Save, Sparkles } from 'lucide-react';

export function SessionGenerator() {
  const [selectedType, setSelectedType] = React.useState(sessionTypes[0]);
  const [generatedSession, setGeneratedSession] = React.useState(mockSessions[0]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-semibold mb-2">Session Generator</h1>
        <p className="text-muted-foreground">Create AI-powered therapy sessions</p>
      </div>

      {/* Session Type Selection */}
      <Card>
        <div className="p-6 space-y-4">
          <h3 className="font-medium">Select Session Type</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {sessionTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type)}
                className={`p-4 rounded-lg border-2 text-left transition-all ${
                  selectedType.id === type.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="font-medium">{type.name}</div>
                <div className="text-sm text-muted-foreground mt-1">{type.description}</div>
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Generated Session Preview */}
      <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <h3 className="font-medium text-lg">Generated Session</h3>
            </div>
            <Button variant="outline" size="sm" onClick={() => {}}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Regenerate
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Title</div>
              <div className="font-medium text-lg">{generatedSession.title}</div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Type</div>
                <div>{generatedSession.type}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Duration</div>
                <div>{generatedSession.duration}</div>
              </div>
            </div>

            <div>
              <div className="text-sm text-muted-foreground mb-1">Content Summary</div>
              <p className="text-sm">{generatedSession.contentSummary}</p>
            </div>

            {/* Audio Preview */}
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="text-sm font-medium mb-3">Audio Preview</div>
              <div className="flex items-center gap-4">
                <Button size="sm" className="bg-accent hover:bg-accent/90">
                  <Play className="h-4 w-4 mr-2" />
                  Play Preview
                </Button>
                <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                  <div className="h-full bg-accent w-0"></div>
                </div>
                <span className="text-sm text-muted-foreground">0:00 / {generatedSession.duration}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button className="flex-1 bg-primary hover:bg-primary/90">
                <Save className="h-4 w-4 mr-2" />
                Save Session
              </Button>
              <Button variant="outline" className="flex-1">
                Schedule Playback
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Recent Sessions */}
      <div>
        <h3 className="font-medium mb-4">Recent Sessions</h3>
        <div className="grid gap-3">
          {mockSessions.map((session) => (
            <Card key={session.id}>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <div className="font-medium">{session.title}</div>
                  <div className="text-sm text-muted-foreground">{session.type} · {session.duration}</div>
                </div>
                <Button size="sm" variant="outline">
                  <Play className="h-4 w-4 mr-2" />
                  Play
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
