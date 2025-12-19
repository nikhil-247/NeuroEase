import React from 'react';
import { Button } from './ui/button';
import { mockSessions } from '../data/mockData';
import { Play, Pause, SkipForward, Volume2, Bluetooth } from 'lucide-react';

export function PlaybackMode() {
  const [isPlaying, setIsPlaying] = React.useState(false);

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/10 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8">
        {/* Now Playing */}
        <div className="text-center space-y-4">
          <div className="inline-block px-4 py-1 bg-accent text-accent-foreground rounded-full text-sm">
            Now Playing
          </div>
          <h1 className="text-4xl font-semibold">{mockSessions[0].title}</h1>
          <p className="text-muted-foreground text-lg">{mockSessions[0].type} · {mockSessions[0].duration}</p>
        </div>

        {/* Large Playback Controls */}
        <div className="bg-card border border-border rounded-3xl p-12 space-y-8">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary w-1/3 transition-all"></div>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>1:24</span>
              <span>{mockSessions[0].duration}</span>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-center gap-6">
            <Button size="lg" variant="outline" className="h-16 w-16 rounded-full">
              <SkipForward className="h-6 w-6 rotate-180" />
            </Button>
            
            <Button
              size="lg"
              className="h-24 w-24 rounded-full bg-primary hover:bg-primary/90"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? (
                <Pause className="h-10 w-10" />
              ) : (
                <Play className="h-10 w-10 ml-1" />
              )}
            </Button>
            
            <Button size="lg" variant="outline" className="h-16 w-16 rounded-full">
              <SkipForward className="h-6 w-6" />
            </Button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-4">
            <Volume2 className="h-5 w-5 text-muted-foreground" />
            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary w-2/3"></div>
            </div>
          </div>
        </div>

        {/* Next Session */}
        <div className="bg-secondary/50 border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Next Session</div>
              <div className="font-medium">{mockSessions[1].title}</div>
            </div>
            <Button variant="outline" size="sm">
              <Play className="h-4 w-4 mr-2" />
              Play Next
            </Button>
          </div>
        </div>

        {/* Device Connection */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <Bluetooth className="h-6 w-6 text-primary" />
            <div className="flex-1">
              <div className="font-medium">Connected to Bedroom Speaker</div>
              <div className="text-sm text-muted-foreground">Amazon Echo Dot</div>
            </div>
            <Button variant="outline" size="sm">
              Change
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
