import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { CheckCircle2, User, Image } from 'lucide-react';

export function PatientSetup() {
  const [step, setStep] = React.useState(1);
  const totalSteps = 5;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-semibold mb-2">Patient Profile Setup</h1>
        <p className="text-muted-foreground">Let's create a personalized memory profile</p>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Step {step} of {totalSteps}</span>
          <span>{Math.round((step / totalSteps) * 100)}% Complete</span>
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <div className="h-full bg-primary transition-all duration-300" style={{ width: `${(step / totalSteps) * 100}%` }}></div>
        </div>
      </div>

      {/* Steps */}
      {step === 1 && (
        <Card>
          <div className="p-8 space-y-6">
            <div className="text-center">
              <User className="h-16 w-16 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Basic Details</h2>
              <p className="text-muted-foreground">Tell us about your loved one</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm">Full Name</label>
                <Input placeholder="Margaret Thompson" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm">Age</label>
                  <Input type="number" placeholder="78" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm">Relationship</label>
                  <Input placeholder="Mother" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm">Dementia Stage</label>
                <select className="w-full p-2 border border-border rounded-lg bg-input-background">
                  <option>Early</option>
                  <option>Moderate</option>
                  <option>Advanced</option>
                </select>
              </div>
            </div>
          </div>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <div className="p-8 space-y-6 text-center">
            <Image className="h-16 w-16 text-primary mx-auto" />
            <div>
              <h2 className="text-2xl font-semibold mb-2">Upload Photos</h2>
              <p className="text-muted-foreground">Add photos that bring comfort and joy</p>
            </div>
            <div className="border-2 border-dashed border-border rounded-lg p-12 hover:border-primary/50 transition-colors cursor-pointer">
              <p className="text-muted-foreground">Click to upload or drag and drop</p>
              <p className="text-sm text-muted-foreground mt-2">PNG, JPG up to 10MB</p>
            </div>
          </div>
        </Card>
      )}

      {step === totalSteps && (
        <Card className="border-2 border-primary bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="p-8 text-center space-y-6">
            <CheckCircle2 className="h-20 w-20 text-primary mx-auto" />
            <div>
              <h2 className="text-2xl font-semibold mb-2">Profile Created!</h2>
              <p className="text-muted-foreground">You're ready to start creating memory therapy sessions</p>
            </div>
          </div>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" disabled={step === 1} onClick={() => setStep(step - 1)}>
          Previous
        </Button>
        <Button className="bg-primary hover:bg-primary/90" onClick={() => setStep(Math.min(step + 1, totalSteps))}>
          {step === totalSteps ? 'Complete' : 'Next'}
        </Button>
      </div>
    </div>
  );
}
