import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Textarea } from './ui/textarea';
import { mockSessions } from '../data/mockData';
import { Smile, Meh, Frown, TrendingUp } from 'lucide-react';

export function Feedback() {
  const [selectedMood, setSelectedMood] = React.useState<string | null>(null);
  const [anxietyLevel, setAnxietyLevel] = React.useState(3);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-semibold mb-2">Session Feedback</h1>
        <p className="text-muted-foreground">Help us improve therapy sessions</p>
      </div>

      {/* Session Info */}
      <Card className="bg-gradient-to-br from-accent/10 to-accent/5">
        <div className="p-6">
          <div className="text-sm text-muted-foreground mb-1">Last Session</div>
          <h2 className="text-xl font-semibold">{mockSessions[0].title}</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {mockSessions[0].type} · {mockSessions[0].duration} · Played 2 hours ago
          </p>
        </div>
      </Card>

      {/* Feedback Form */}
      <Card>
        <div className="p-6 space-y-6">
          {/* Overall Response */}
          <div className="space-y-3">
            <label className="font-medium">How did they respond to this session?</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'positive', icon: Smile, label: 'Positive', color: 'primary' },
                { id: 'neutral', icon: Meh, label: 'Neutral', color: 'muted' },
                { id: 'negative', icon: Frown, label: 'Negative', color: 'destructive' },
              ].map((mood) => {
                const Icon = mood.icon;
                return (
                  <button
                    key={mood.id}
                    onClick={() => setSelectedMood(mood.id)}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      selectedMood === mood.id
                        ? `border-${mood.color} bg-${mood.color}/5`
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <Icon className="h-8 w-8 mx-auto mb-2" />
                    <div className="text-sm font-medium">{mood.label}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Anxiety Level */}
          <div className="space-y-3">
            <label className="font-medium">Anxiety Level After Session</label>
            <div className="space-y-2">
              <input
                type="range"
                min="1"
                max="5"
                value={anxietyLevel}
                onChange={(e) => setAnxietyLevel(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Very Calm</span>
                <span>Moderate</span>
                <span>Very Anxious</span>
              </div>
              <div className="text-center">
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  Level {anxietyLevel}/5
                </span>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <label className="font-medium">Additional Observations</label>
            <Textarea
              placeholder="What worked well? What could be improved? Any specific reactions or comments?"
              rows={4}
            />
          </div>

          {/* Submit */}
          <div className="space-y-4 pt-4">
            <Button className="w-full bg-primary hover:bg-primary/90">
              Submit Feedback
            </Button>
            <div className="flex items-center gap-2 text-sm text-muted-foreground justify-center">
              <TrendingUp className="h-4 w-4" />
              <span>Your feedback helps improve future sessions</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Recent Feedback */}
      <div>
        <h3 className="font-medium mb-4">Recent Feedback History</h3>
        <div className="space-y-3">
          <Card>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium">{mockSessions[1].title}</div>
                <Smile className="h-5 w-5 text-primary" />
              </div>
              <div className="text-sm text-muted-foreground">Submitted 3 days ago · Anxiety Level: 2/5</div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
