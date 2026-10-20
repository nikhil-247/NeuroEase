import React from 'react';
import { Play, RotateCcw, Save, Sparkles } from 'lucide-react';
import { mockSessions, sessionTypes, type Session } from '../data/mockData';
import { Button } from './ui/button';
import { Card } from './ui/card';

function buildSessionPreview(type: (typeof sessionTypes)[number], revision: number): Session {
  const existing = mockSessions.find((session) => session.type === type.name);
  const safeTitle = existing?.title ?? `${type.name} Session Preview`;
  const suffix = revision > 0 ? ` · Preview ${revision + 1}` : '';

  return {
    id: `preview-${type.id}-${revision}`,
    type: type.name,
    title: `${safeTitle}${suffix}`,
    duration: existing?.duration ?? '5 min',
    contentSummary: existing?.contentSummary
      ? `${existing.contentSummary}${revision > 0 ? ' Preview refreshed locally; no AI model was called.' : ''}`
      : `${type.description}. This is a local template preview, not AI-generated or clinically validated content.`,
    audioUrl: '',
    createdAt: new Date().toISOString(),
  };
}

export function SessionGenerator() {
  const [selectedType, setSelectedType] = React.useState(sessionTypes[0]);
  const [previewRevision, setPreviewRevision] = React.useState(0);
  const [generatedSession, setGeneratedSession] = React.useState<Session>(() =>
    buildSessionPreview(sessionTypes[0], 0)
  );
  const [savedSessions, setSavedSessions] = React.useState<Session[]>(() => [...mockSessions]);
  const [notice, setNotice] = React.useState('');

  const selectType = (type: (typeof sessionTypes)[number]) => {
    setSelectedType(type);
    setPreviewRevision(0);
    setGeneratedSession(buildSessionPreview(type, 0));
    setNotice('');
  };

  const refreshPreview = () => {
    const nextRevision = previewRevision + 1;
    setPreviewRevision(nextRevision);
    setGeneratedSession(buildSessionPreview(selectedType, nextRevision));
    setNotice('Preview refreshed locally. No AI service was called.');
  };

  const saveSession = () => {
    const saved: Session = {
      ...generatedSession,
      id: `session-${Date.now()}`,
      createdAt: new Date().toISOString(),
      audioUrl: '',
    };
    setSavedSessions((current) => [saved, ...current]);
    setNotice('Session added to this page only. It will be lost when you refresh.');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <header>
        <h1 className="text-3xl font-semibold mb-2">Session Template Builder</h1>
        <p className="text-muted-foreground">Preview and save a local session template.</p>
        <p className="text-xs text-muted-foreground mt-2" role="note">
          Prototype only: no AI generation, audio playback, persistent storage, or scheduled notifications are connected.
          Use fictional data only.
        </p>
      </header>

      <Card>
        <div className="p-6 space-y-4">
          <h2 className="font-medium">Select Session Type</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {sessionTypes.map((type) => (
              <button
                type="button"
                key={type.id}
                onClick={() => selectType(type)}
                aria-pressed={selectedType.id === type.id}
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

      <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="p-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" aria-hidden="true" />
              <h2 className="font-medium text-lg">Template Preview</h2>
            </div>
            <Button type="button" variant="outline" size="sm" onClick={refreshPreview}>
              <RotateCcw className="h-4 w-4 mr-2" aria-hidden="true" />
              Refresh preview
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
                <div className="text-sm text-muted-foreground mb-1">Suggested duration</div>
                <div>{generatedSession.duration}</div>
              </div>
            </div>

            <div>
              <div className="text-sm text-muted-foreground mb-1">Content Summary</div>
              <p className="text-sm">{generatedSession.contentSummary}</p>
            </div>

            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <div className="text-sm font-medium mb-2">Audio Preview</div>
              <div className="flex flex-wrap items-center gap-3">
                <Button type="button" size="sm" disabled title="No audio source is configured">
                  <Play className="h-4 w-4 mr-2" aria-hidden="true" />
                  Audio not configured
                </Button>
                <span className="text-xs text-muted-foreground">The sample audio asset is not included in this repository.</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button type="button" className="flex-1" onClick={saveSession}>
                <Save className="h-4 w-4 mr-2" aria-hidden="true" />
                Save preview to list
              </Button>
              <Button type="button" variant="outline" className="flex-1" disabled title="Persistent scheduling is not implemented">
                Schedule playback unavailable
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {notice && <p className="text-sm text-muted-foreground" role="status">{notice}</p>}

      <section aria-labelledby="recent-sessions-heading">
        <h2 id="recent-sessions-heading" className="font-medium mb-4">Local Sessions ({savedSessions.length})</h2>
        <div className="grid gap-3">
          {savedSessions.map((session) => (
            <Card key={session.id}>
              <div className="p-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="font-medium">{session.title}</div>
                  <div className="text-sm text-muted-foreground">{session.type} · {session.duration}</div>
                </div>
                <Button type="button" size="sm" variant="outline" disabled title="No audio asset is configured">
                  <Play className="h-4 w-4 mr-2" aria-hidden="true" />
                  Audio unavailable
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
