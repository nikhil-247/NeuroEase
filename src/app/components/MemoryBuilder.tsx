import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { mockMemories, memoryCategories } from '../data/mockData';
import { Plus, Edit, Trash2, Image, Mic } from 'lucide-react';

export function MemoryBuilder() {
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const [isAdding, setIsAdding] = React.useState(false);
  const [newMemory, setNewMemory] = React.useState({ question: '', answer: '' });

  const filteredMemories = selectedCategory
    ? mockMemories.filter(m => m.category === selectedCategory)
    : mockMemories;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-foreground mb-2">Memory Builder</h1>
        <p className="text-muted-foreground">
          Create personalized memories to help your loved one feel safe and connected
        </p>
      </div>

      {/* Category Selection */}
      <Card>
        <div className="p-6">
          <h3 className="font-medium mb-4">Memory Categories</h3>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === null ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(null)}
              className={selectedCategory === null ? 'bg-primary' : ''}
            >
              All Memories
            </Button>
            {memoryCategories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? 'bg-primary' : ''}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Add New Memory */}
      {!isAdding ? (
        <Card className="border-2 border-dashed border-primary/30 hover:border-primary/50 transition-colors cursor-pointer" onClick={() => setIsAdding(true)}>
          <div className="p-8 text-center">
            <Plus className="h-12 w-12 text-primary mx-auto mb-3" />
            <div className="font-medium text-lg">Add New Memory</div>
            <p className="text-sm text-muted-foreground">Create a new memory entry with photos and voice notes</p>
          </div>
        </Card>
      ) : (
        <Card className="border-2 border-primary">
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-lg">New Memory</h3>
              <Button variant="ghost" size="sm" onClick={() => setIsAdding(false)}>
                Cancel
              </Button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm">Category</label>
                <select className="w-full p-2 border border-border rounded-lg bg-input-background">
                  {memoryCategories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm">Question or Prompt</label>
                <Input
                  placeholder="e.g., Tell me about your wedding day"
                  value={newMemory.question}
                  onChange={(e) => setNewMemory({ ...newMemory, question: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm">Memory Details</label>
                <Textarea
                  placeholder="Share the memory or story..."
                  rows={4}
                  value={newMemory.answer}
                  onChange={(e) => setNewMemory({ ...newMemory, answer: e.target.value })}
                />
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Image className="h-4 w-4 mr-2" />
                  Upload Photo
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Mic className="h-4 w-4 mr-2" />
                  Record Voice
                </Button>
              </div>

              <Button className="w-full bg-primary hover:bg-primary/90" onClick={() => setIsAdding(false)}>
                Save Memory
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Memory List */}
      <div>
        <h3 className="font-medium text-lg mb-4">Saved Memories ({filteredMemories.length})</h3>
        <div className="grid gap-4">
          {filteredMemories.map((memory) => (
            <Card key={memory.id} className="hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex gap-4">
                  {memory.imageUrl && (
                    <img
                      src={memory.imageUrl}
                      alt={memory.question}
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                  )}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs rounded-md mb-2">
                          {memory.category}
                        </div>
                        <h4 className="font-medium">{memory.question}</h4>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{memory.answer}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
