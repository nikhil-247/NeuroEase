import React from 'react';
import { Image, Edit, Mic, Plus, Trash2 } from 'lucide-react';
import { mockMemories, memoryCategories, type Memory } from '../data/mockData';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

type MemoryForm = Pick<Memory, 'category' | 'question' | 'answer'>;

const EMPTY_FORM: MemoryForm = {
  category: memoryCategories[0],
  question: '',
  answer: '',
};

export function MemoryBuilder() {
  const [memories, setMemories] = React.useState<Memory[]>(() => [...mockMemories]);
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const [isAdding, setIsAdding] = React.useState(false);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [form, setForm] = React.useState<MemoryForm>(EMPTY_FORM);
  const [formError, setFormError] = React.useState('');

  const filteredMemories = selectedCategory
    ? memories.filter((memory) => memory.category === selectedCategory)
    : memories;

  const resetForm = () => {
    setIsAdding(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
    setFormError('');
  };

  const saveMemory = () => {
    const question = form.question.trim();
    const answer = form.answer.trim();
    if (!question || !answer) {
      setFormError('Add both a question and a memory detail before saving.');
      return;
    }
    if (question.length > 200 || answer.length > 4_000) {
      setFormError('Keep the question under 200 characters and the memory under 4,000 characters.');
      return;
    }

    if (editingId) {
      setMemories((current) =>
        current.map((memory) =>
          memory.id === editingId
            ? { ...memory, category: form.category, question, answer }
            : memory
        )
      );
    } else {
      const created: Memory = {
        id: `memory-${Date.now()}`,
        category: form.category,
        question,
        answer,
      };
      setMemories((current) => [created, ...current]);
    }

    setSelectedCategory(null);
    resetForm();
  };

  const editMemory = (memory: Memory) => {
    setEditingId(memory.id);
    setForm({
      category: memory.category,
      question: memory.question,
      answer: memory.answer,
    });
    setFormError('');
    setIsAdding(true);
  };

  const deleteMemory = (id: string) => {
    setMemories((current) => current.filter((memory) => memory.id !== id));
    if (editingId === id) resetForm();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <header>
        <h1 className="text-3xl font-semibold text-foreground mb-2">Memory Builder</h1>
        <p className="text-muted-foreground">
          Organize personal memory prompts and stories for a caregiver session.
        </p>
        <p className="text-xs text-muted-foreground mt-2" role="note">
          Demo prototype: changes stay in page memory and reset on refresh. Use fictional data only;
          photo uploads and voice recording are not connected.
        </p>
      </header>

      <Card>
        <div className="p-6">
          <h2 className="font-medium mb-4">Memory Categories</h2>
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant={selectedCategory === null ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(null)}
              aria-pressed={selectedCategory === null}
            >
              All Memories
            </Button>
            {memoryCategories.map((category) => (
              <Button
                key={category}
                type="button"
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                aria-pressed={selectedCategory === category}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {!isAdding ? (
        <Button
          type="button"
          variant="outline"
          className="w-full h-auto min-h-28 border-dashed flex-col gap-2 py-7"
          onClick={() => {
            setEditingId(null);
            setForm(EMPTY_FORM);
            setFormError('');
            setIsAdding(true);
          }}
        >
          <Plus className="h-8 w-8 text-primary" aria-hidden="true" />
          <span className="font-medium text-lg">Add New Memory</span>
          <span className="text-sm text-muted-foreground">Add a question and its memory details</span>
        </Button>
      ) : (
        <Card className="border-2 border-primary">
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-medium text-lg">{editingId ? 'Edit Memory' : 'New Memory'}</h2>
              <Button type="button" variant="ghost" size="sm" onClick={resetForm}>Cancel</Button>
            </div>

            <div className="space-y-2">
              <label htmlFor="memory-category" className="text-sm">Category</label>
              <select
                id="memory-category"
                value={form.category}
                onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}
                className="w-full p-2 border border-border rounded-lg bg-input-background"
              >
                {memoryCategories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="memory-question" className="text-sm">Question or Prompt</label>
              <Input
                id="memory-question"
                maxLength={200}
                placeholder="e.g., Tell me about your wedding day"
                value={form.question}
                onChange={(event) => setForm((current) => ({ ...current, question: event.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="memory-answer" className="text-sm">Memory Details</label>
              <Textarea
                id="memory-answer"
                maxLength={4_000}
                placeholder="Share the memory or story..."
                rows={4}
                value={form.answer}
                onChange={(event) => setForm((current) => ({ ...current, answer: event.target.value }))}
              />
              <p className="text-xs text-muted-foreground text-right">{form.answer.length}/4000 characters</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button type="button" variant="outline" size="sm" disabled title="Photo upload is not connected in this prototype">
                <Image className="h-4 w-4 mr-2" aria-hidden="true" />
                Photo upload unavailable
              </Button>
              <Button type="button" variant="outline" size="sm" disabled title="Voice recording is not connected in this prototype">
                <Mic className="h-4 w-4 mr-2" aria-hidden="true" />
                Voice recording unavailable
              </Button>
            </div>

            {formError && <p className="text-sm text-destructive" role="alert">{formError}</p>}
            <Button type="button" className="w-full" onClick={saveMemory}>
              {editingId ? 'Update Memory' : 'Save Memory'}
            </Button>
          </div>
        </Card>
      )}

      <section aria-labelledby="saved-memories-heading">
        <h2 id="saved-memories-heading" className="font-medium text-lg mb-4">
          Memories ({filteredMemories.length})
        </h2>
        {filteredMemories.length === 0 ? (
          <Card><div className="p-6 text-sm text-muted-foreground">No memories in this category yet.</div></Card>
        ) : (
          <div className="grid gap-4">
            {filteredMemories.map((memory) => (
              <Card key={memory.id} className="hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex gap-4">
                    {memory.imageUrl && (
                      <img
                        src={memory.imageUrl}
                        alt=""
                        loading="lazy"
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                    )}
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs rounded-md mb-2">
                            {memory.category}
                          </span>
                          <h3 className="font-medium break-words">{memory.question}</h3>
                        </div>
                        <div className="flex gap-1 shrink-0">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            aria-label={`Edit ${memory.question}`}
                            onClick={() => editMemory(memory)}
                          >
                            <Edit className="h-4 w-4" aria-hidden="true" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            aria-label={`Delete ${memory.question}`}
                            onClick={() => deleteMemory(memory.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" aria-hidden="true" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap break-words">{memory.answer}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
