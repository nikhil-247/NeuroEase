import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Textarea } from './ui/textarea';
import { AlertCircle, Play, CheckCircle } from 'lucide-react';

export function EmergencyMode() {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [showFeedback, setShowFeedback] = React.useState(false);

  const handleEmergencyPlay = () => {
    setIsPlaying(true);
    setTimeout(() => {
      setIsPlaying(false);
      setShowFeedback(true);
    }, 3000);
  };

  if (showFeedback) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        <Card className="border-2 border-primary">
          <div className="p-8 text-center space-y-6">
            <CheckCircle className="h-16 w-16 text-primary mx-auto" />
            <div>
              <h2 className="text-2xl font-semibold mb-2">Reassurance Complete</h2>
              <p className="text-muted-foreground">How did this help?</p>
            </div>
            <Textarea placeholder="Optional: Add notes about what happened and how they responded..." rows={4} />
            <div className="flex gap-3">
              <Button className="flex-1 bg-primary hover:bg-primary/90" onClick={() => setShowFeedback(false)}>
                Save Notes
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => setShowFeedback(false)}>
                Skip
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (isPlaying) {
    return (
      <div className="min-h-[calc(100vh-8rem)] bg-gradient-to-br from-destructive/10 to-destructive/5 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full text-center space-y-8">
          <div className="relative">
            <div className="h-32 w-32 bg-destructive/20 rounded-full mx-auto flex items-center justify-center animate-pulse">
              <Play className="h-16 w-16 text-destructive" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-semibold mb-2">Playing Reassurance</h1>
            <p className="text-muted-foreground text-lg">Calming audio is now playing...</p>
          </div>
          <Button size="lg" variant="outline" onClick={() => setIsPlaying(false)}>
            Stop
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
      <div className="text-center space-y-4">
        <AlertCircle className="h-20 w-20 text-destructive mx-auto" />
        <h1 className="text-3xl font-semibold">Emergency Reassurance</h1>
        <p className="text-muted-foreground text-lg">
          Use this when your loved one is confused, anxious, or distressed
        </p>
      </div>

      {/* Emergency Button */}
      <Card className="border-4 border-destructive">
        <button
          onClick={handleEmergencyPlay}
          className="w-full p-16 text-center space-y-4 hover:bg-destructive/5 transition-colors"
        >
          <div className="h-32 w-32 bg-destructive rounded-full mx-auto flex items-center justify-center">
            <Play className="h-16 w-16 text-destructive-foreground ml-1" />
          </div>
          <div>
            <div className="text-2xl font-semibold text-destructive">Play Reassurance Now</div>
            <p className="text-muted-foreground mt-2">
              Immediate calming audio to help restore comfort
            </p>
          </div>
        </button>
      </Card>

      {/* Info */}
      <Card className="bg-secondary/50">
        <div className="p-6 space-y-3">
          <h3 className="font-medium">What this does:</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Plays a calming, familiar voice with reassuring messages</li>
            <li>• Reminds them they are safe and loved</li>
            <li>• Helps ground them in the present moment</li>
            <li>• Typically lasts 2-3 minutes</li>
          </ul>
        </div>
      </Card>
    </div>
  );
}
