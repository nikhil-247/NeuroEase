import React from 'react';
import { Frown, Meh, Smile, TrendingUp } from 'lucide-react';
import { mockSessions } from '../data/mockData';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Textarea } from './ui/textarea';

type Mood = 'positive' | 'neutral' | 'negative';
type FeedbackEntry = {
  id: string;
  mood: Mood;
  anxietyLevel: number;
  notes: string;
  submittedAt: string;
};

const moodOptions: { id: Mood; label: string; Icon: typeof Smile; activeClass: string }[] = [
  { id: 'positive', label: 'Positive', Icon: Smile, activeClass: 'border-primary bg-primary/5' },
  { id: 'neutral', label: 'Neutral', Icon: Meh, activeClass: 'border-muted-foreground bg-muted/30' },
  { id: 'negative', label: 'Negative', Icon: Frown, activeClass: 'border-destructive bg-destructive/5' },
];

export function Feedback() {
  const [selectedMood, setSelectedMood] = React.useState<Mood | null>(null);
  const [anxietyLevel, setAnxietyLevel] = React.useState(3);
  const [notes, setNotes] = React.useState('');
  const [recentFeedback, setRecentFeedback] = React.useState<FeedbackEntry[]>([]);
  const [error, setError] = React.useState('');
  const [notice, setNotice] = React.useState('');

  const submitFeedback = () => {
    if (!selectedMood) {
      setError('Choose a response before submitting.');
      return;
    }

    const entry: FeedbackEntry = {
      id: `feedback-${Date.now()}`,
      mood: selectedMood,
      anxietyLevel,
      notes: notes.trim(),
      submittedAt: new Date().toLocaleString(),
    };
    setRecentFeedback((current) => [entry, ...current]);
    setError('');
    setNotice('Feedback added to this page only. It is not sent to a server and will be cleared on refresh.');
    setSelectedMood(null);
    setAnxietyLevel(3);
    setNotes('');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <header>
        <h1 className="text-3xl font-semibold mb-2">Session Feedback Preview</h1>
        <p className="text-muted-foreground">Try the feedback form with sample session data.</p>
        <p className="text-xs text-muted-foreground mt-2" role="note">
          Prototype only: feedback is stored in this page's memory, not sent to a server. Use fictional data only.
        </p>
      </header>

      <Card className="bg-gradient-to-br from-accent/10 to-accent/5">
        <div className="p-6">
          <div className="text-sm text-muted-foreground mb-1">Sample session</div>
          <h2 className="text-xl font-semibold">{mockSessions[0].title}</h2>
          <p className="text-sm text-muted-foreground mt-1">{mockSessions[0].type} · {mockSessions[0].duration}</p>
        </div>
      </Card>

      <Card>
        <div className="p-6 space-y-6">
          <fieldset className="space-y-3">
            <legend className="font-medium">How did they respond to the session?</legend>
            <div className="grid grid-cols-3 gap-3">
              {moodOptions.map(({ id, label, Icon, activeClass }) => (
                <button
                  type="button"
                  key={id}
                  aria-pressed={selectedMood === id}
                  onClick={() => { setSelectedMood(id); setError(''); }}
                  className={`p-4 sm:p-6 rounded-xl border-2 transition-all ${selectedMood === id ? activeClass : 'border-border hover:border-primary/50'}`}
                >
                  <Icon className="h-7 w-7 mx-auto mb-2" aria-hidden="true" />
                  <span className="text-sm font-medium">{label}</span>
                </button>
              ))}
            </div>
          </fieldset>

          <div className="space-y-3">
            <label htmlFor="anxiety-level" className="font-medium">Self-reported anxiety level after the session</label>
            <input
              id="anxiety-level"
              type="range"
              min={1}
              max={5}
              value={anxietyLevel}
              onChange={(event) => setAnxietyLevel(Number(event.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Very calm</span><span>Moderate</span><span>Very anxious</span>
            </div>
            <div className="text-center">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                Level {anxietyLevel}/5
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="feedback-notes" className="font-medium">Additional observations (optional)</label>
            <Textarea
              id="feedback-notes"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              maxLength={2000}
              placeholder="Add a short note for this demo..."
              rows={4}
            />
            <p className="text-xs text-muted-foreground text-right">{notes.length}/2000 characters</p>
          </div>

          {error && <p className="text-sm text-destructive" role="alert">{error}</p>}
          <Button type="button" className="w-full" onClick={submitFeedback}>Add feedback locally</Button>
          {notice && <p className="text-sm text-muted-foreground" role="status">{notice}</p>}
          <div className="flex items-center gap-2 text-sm text-muted-foreground justify-center">
            <TrendingUp className="h-4 w-4" aria-hidden="true" />
            <span>No clinical conclusions are inferred from these sample inputs.</span>
          </div>
        </div>
      </Card>

      <section aria-labelledby="feedback-history">
        <h2 id="feedback-history" className="font-medium mb-4">Feedback in this page ({recentFeedback.length})</h2>
        {recentFeedback.length === 0 ? (
          <Card><div className="p-4 text-sm text-muted-foreground">No feedback has been added in this session.</div></Card>
        ) : (
          <div className="space-y-3">
            {recentFeedback.map((entry) => {
              const mood = moodOptions.find((item) => item.id === entry.mood);
              const Icon = mood?.Icon ?? Meh;
              return (
                <Card key={entry.id}>
                  <div className="p-4">
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <div className="font-medium">{mood?.label ?? 'Unspecified'}</div>
                      <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                    </div>
                    <div className="text-sm text-muted-foreground">Added {entry.submittedAt} · Selected level: {entry.anxietyLevel}/5</div>
                    {entry.notes && <p className="text-sm mt-2 whitespace-pre-wrap">{entry.notes}</p>}
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
