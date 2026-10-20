import React from 'react';
import { AlertCircle, CheckCircle, MessageCircleHeart } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Textarea } from './ui/textarea';

export function EmergencyMode() {
  const [showPreview, setShowPreview] = React.useState(false);
  const [showFeedback, setShowFeedback] = React.useState(false);
  const [notes, setNotes] = React.useState('');
  const [notice, setNotice] = React.useState('');

  const saveNotes = () => {
    setShowFeedback(false);
    setShowPreview(false);
    setNotice('Notes saved in this page only. They are not stored after refresh.');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center space-y-4">
        <AlertCircle className="h-16 w-16 text-amber-600 mx-auto" aria-hidden="true" />
        <h1 className="text-3xl font-semibold">Reassurance Preview</h1>
        <p className="text-muted-foreground text-lg">
          A sample screen for a caregiver to review a gentle reassurance message.
        </p>
      </div>

      <Card className="border-2 border-amber-500/40 bg-amber-500/5">
        <div className="p-5 space-y-2 text-sm">
          <strong>Not an emergency service.</strong>
          <p className="text-muted-foreground">
            This prototype does not play audio, call anyone, or send alerts. If someone is in immediate danger
            or needs urgent medical help, contact your local emergency number or a qualified professional directly.
          </p>
        </div>
      </Card>

      {!showPreview && !showFeedback && (
        <Card className="border-2 border-destructive/40">
          <div className="p-8 text-center space-y-4">
            <MessageCircleHeart className="h-12 w-12 text-primary mx-auto" aria-hidden="true" />
            <h2 className="text-xl font-semibold">Review a reassurance message</h2>
            <p className="text-sm text-muted-foreground">
              This button opens a text preview only; no audio or external action is triggered.
            </p>
            <Button type="button" className="w-full" onClick={() => { setShowPreview(true); setNotice(''); }}>
              Show sample message
            </Button>
          </div>
        </Card>
      )}

      {showPreview && !showFeedback && (
        <Card className="border-2 border-primary/30">
          <div className="p-8 space-y-5">
            <h2 className="text-xl font-semibold">Sample reassurance message</h2>
            <blockquote className="border-l-4 border-primary pl-4 text-lg leading-relaxed">
              You are not alone. We can sit together for a moment. You are with someone who cares about you.
              Let’s take one slow, comfortable breath together.
            </blockquote>
            <p className="text-xs text-muted-foreground">
              Example wording for interface testing only. Adapt any real care communication to the individual and their caregiver’s guidance.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button type="button" className="flex-1" onClick={() => setShowFeedback(true)}>Continue to notes</Button>
              <Button type="button" variant="outline" className="flex-1" onClick={() => setShowPreview(false)}>Back</Button>
            </div>
          </div>
        </Card>
      )}

      {showFeedback && (
        <Card className="border-2 border-primary">
          <div className="p-8 space-y-5">
            <CheckCircle className="h-10 w-10 text-primary" aria-hidden="true" />
            <h2 className="text-xl font-semibold">Caregiver notes</h2>
            <label htmlFor="reassurance-notes" className="text-sm">
              Optional notes about the preview
            </label>
            <Textarea
              id="reassurance-notes"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Add notes for this demo session..."
              maxLength={2000}
              rows={4}
            />
            <p className="text-xs text-muted-foreground text-right">{notes.length}/2000 characters</p>
            <div className="flex flex-wrap gap-3">
              <Button type="button" className="flex-1" onClick={saveNotes}>Save notes locally</Button>
              <Button type="button" variant="outline" className="flex-1" onClick={() => setShowFeedback(false)}>Back</Button>
            </div>
          </div>
        </Card>
      )}

      {notice && <p className="text-sm text-muted-foreground" role="status">{notice}</p>}
    </div>
  );
}
