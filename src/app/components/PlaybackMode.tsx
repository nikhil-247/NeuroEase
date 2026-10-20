import { Bluetooth, Pause, Play, SkipForward, Volume2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { mockSessions } from '../data/mockData';

export function PlaybackMode() {
  const currentSession = mockSessions[0];
  const nextSession = mockSessions[1];

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/10 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-block px-4 py-1 bg-accent text-accent-foreground rounded-full text-sm">
            Playback UI Preview
          </div>
          <h1 className="text-4xl font-semibold">{currentSession.title}</h1>
          <p className="text-muted-foreground text-lg">{currentSession.type} · {currentSession.duration}</p>
          <p className="text-sm text-muted-foreground">
            Demo only: the repository has no audio file or connected playback service.
          </p>
        </div>

        <Card>
          <div className="p-6 sm:p-10 space-y-8">
            <div className="space-y-2" aria-label="Audio progress preview">
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary w-0" />
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>—:—</span>
                <span>{currentSession.duration}</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 sm:gap-6">
              <Button type="button" size="lg" variant="outline" className="h-14 w-14 rounded-full" disabled title="Audio source not configured">
                <SkipForward className="h-5 w-5 rotate-180" aria-hidden="true" />
              </Button>
              <Button type="button" size="lg" className="h-20 w-20 rounded-full" disabled title="Audio source not configured">
                <Play className="h-8 w-8" aria-hidden="true" />
                <Pause className="hidden" aria-hidden="true" />
              </Button>
              <Button type="button" size="lg" variant="outline" className="h-14 w-14 rounded-full" disabled title="Audio source not configured">
                <SkipForward className="h-5 w-5" aria-hidden="true" />
              </Button>
            </div>

            <div className="flex items-center gap-4 text-muted-foreground">
              <Volume2 className="h-5 w-5" aria-hidden="true" />
              <div className="flex-1 h-2 bg-muted rounded-full" />
              <span className="text-xs">Unavailable</span>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Next sample session</div>
              <div className="font-medium">{nextSession?.title ?? 'No next session'}</div>
            </div>
            <Button type="button" variant="outline" size="sm" disabled title="Audio playback is not implemented">
              <Play className="h-4 w-4 mr-2" aria-hidden="true" />
              Audio unavailable
            </Button>
          </div>
        </Card>

        <Card>
          <div className="p-6 flex items-center gap-4">
            <Bluetooth className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
            <div className="flex-1">
              <div className="font-medium">No device connected</div>
              <div className="text-sm text-muted-foreground">Bluetooth speaker integration is not implemented in this prototype.</div>
            </div>
            <Button type="button" variant="outline" size="sm" disabled title="Device pairing is not implemented">
              Change
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
