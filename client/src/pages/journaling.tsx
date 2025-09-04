import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, Save, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Journaling() {
  const [, setLocation] = useLocation();
  const [journalContent, setJournalContent] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const goBack = () => {
    setLocation("/");
  };

  const saveJournalMutation = useMutation({
    mutationFn: async (content: string) => {
      const response = await fetch('/api/journal-entries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to save journal entry');
      }
      
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Journal Saved! ✨",
        description: "Your thoughts have been safely recorded.",
      });
      setJournalContent("");
      queryClient.invalidateQueries({ queryKey: ['/api/journal-entries'] });
    },
    onError: () => {
      toast({
        title: "Save Failed",
        description: "Unable to save your journal entry. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleFinishJournaling = () => {
    if (!journalContent.trim()) {
      toast({
        title: "Empty Journal",
        description: "Please write something before saving.",
        variant: "destructive",
      });
      return;
    }

    saveJournalMutation.mutate(journalContent.trim());
  };

  const wordCount = journalContent.trim().split(/\s+/).filter(word => word.length > 0).length;

  return (
    <div className="min-h-screen aura-background relative">
      {/* Theme Toggle */}
      <div className="absolute top-8 right-8 z-20">
        <ThemeToggle />
      </div>
      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-24 h-24 bg-white/8 dark:bg-white/4 rounded-full floating-animation gentle-pulse" />
        <div className="absolute bottom-40 right-16 w-16 h-16 bg-white/5 dark:bg-white/3 rounded-full floating-animation" />
      </div>
      <div className="relative z-10 min-h-screen p-4 md:p-8">
        {/* Header */}
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button
              onClick={goBack}
              variant="ghost"
              size="sm"
              className="text-gray-700 hover:text-gray-900 hover:bg-white/20 glassmorphism font-medium"
              data-testid="button-back-home"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-light mb-4 drop-shadow-lg">
              <span className="bg-gradient-to-r from-gray-800 to-purple-900 bg-clip-text text-transparent font-semibold">
                Personal Journaling
              </span>
            </h1>
            <p className="text-lg font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-sm text-[#9079ff]">
              Express your thoughts, feelings, and experiences in this safe space
            </p>
          </div>

          {/* Journaling Interface */}
          <Card className="glassmorphism border-white/20 bg-card/90 backdrop-blur-xl max-w-4xl mx-auto" data-testid="card-journaling-interface">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between text-card-foreground">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-primary" />
                  Your Journal Entry
                </div>
                <div className="text-sm text-muted-foreground font-normal">
                  {wordCount} words
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Writing Area */}
              <div className="space-y-4">
                <Textarea
                  value={journalContent}
                  onChange={(e) => setJournalContent(e.target.value)}
                  placeholder="Start writing about your day, your feelings, or anything on your mind..."
                  className="min-h-96 bg-white/20 border-white/30 text-card-foreground placeholder:text-muted-foreground resize-none text-base leading-relaxed"
                  data-testid="textarea-journal-content"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Your journal entries are private and securely stored
                </div>
                <Button
                  onClick={handleFinishJournaling}
                  disabled={!journalContent.trim() || saveJournalMutation.isPending}
                  className="bg-primary hover:bg-primary/90 px-8 py-2 text-lg font-medium"
                  data-testid="button-finish-journaling"
                >
                  {saveJournalMutation.isPending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5 mr-2" />
                      Finish Journaling!
                    </>
                  )}
                </Button>
              </div>

              {/* Inspirational prompts */}
              <div className="bg-white/20 rounded-xl p-6 space-y-3">
                <h3 className="text-lg font-semibold text-card-foreground mb-3">
                  ✨ Writing Prompts
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-muted-foreground">
                  <div>• How are you feeling right now?</div>
                  <div>• What made you smile today?</div>
                  <div>• What's one thing you're grateful for?</div>
                  <div>• What challenged you today?</div>
                  <div>• What are you looking forward to?</div>
                  <div>• Describe a moment of peace you had today</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}