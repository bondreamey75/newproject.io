import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, Heart, Send, Smile, Meh, Frown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function DailyCheckin() {
  const [, setLocation] = useLocation();
  const [selectedMood, setSelectedMood] = useState<string>("");
  const [thoughts, setThoughts] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const goBack = () => {
    setLocation("/");
  };

  const handleSubmit = async () => {
    if (!selectedMood || !thoughts.trim()) {
      toast({
        title: "Please complete your check-in",
        description: "Select your mood and share your thoughts to continue.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Check-in recorded!",
        description: "Thank you for sharing. Your wellness journey matters to us.",
      });
      
      // Reset form
      setSelectedMood("");
      setThoughts("");
    }, 1500);
  };

  const moods = [
    { id: "great", label: "Great", icon: Smile, color: "text-green-500", bgColor: "bg-green-500/20" },
    { id: "okay", label: "Okay", icon: Meh, color: "text-yellow-500", bgColor: "bg-yellow-500/20" },
    { id: "struggling", label: "Struggling", icon: Frown, color: "text-red-500", bgColor: "bg-red-500/20" },
  ];

  return (
    <div className="min-h-screen aura-background relative">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-24 h-24 bg-white/8 rounded-full floating-animation gentle-pulse" />
        <div className="absolute bottom-40 right-16 w-16 h-16 bg-white/5 rounded-full floating-animation" />
      </div>
      <div className="relative z-10 min-h-screen p-4 md:p-8">
        {/* Header */}
        <div className="max-w-2xl mx-auto">
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

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-light mb-4 drop-shadow-lg">
              <span className="bg-gradient-to-r from-gray-800 to-purple-900 bg-clip-text text-transparent font-semibold">
                Daily Check-in
              </span>
            </h1>
            <p className="text-lg font-medium max-w-xl mx-auto leading-relaxed drop-shadow-sm text-[#af83d1]">
              Take a moment to reflect on your day and share how you're feeling
            </p>
          </div>

          {/* Check-in Form */}
          <Card className="glassmorphism border-white/20 bg-card/90 backdrop-blur-xl mb-6" data-testid="card-checkin-form">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-card-foreground">
                <Heart className="w-5 h-5 text-primary" />
                How are you feeling today?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Mood Selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-card-foreground">
                  Select your mood
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {moods.map((mood) => {
                    const IconComponent = mood.icon;
                    const isSelected = selectedMood === mood.id;
                    
                    return (
                      <button
                        key={mood.id}
                        onClick={() => setSelectedMood(mood.id)}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                          isSelected
                            ? `border-primary ${mood.bgColor} scale-105`
                            : "border-white/20 hover:border-white/40 hover:scale-102"
                        }`}
                        data-testid={`button-mood-${mood.id}`}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <IconComponent className={`w-8 h-8 ${isSelected ? mood.color : "text-muted-foreground"}`} />
                          <span className={`text-sm font-medium ${isSelected ? "text-card-foreground" : "text-muted-foreground"}`}>
                            {mood.label}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Thoughts Section */}
              <div className="space-y-3">
                <label htmlFor="thoughts" className="text-sm font-medium text-card-foreground dark:!text-white">
                  Tell us about your day
                </label>
                <Textarea
                  id="thoughts"
                  placeholder="What's on your mind? Share your thoughts, feelings, or anything that happened today..."
                  value={thoughts}
                  onChange={(e) => setThoughts(e.target.value)}
                  className="min-h-[120px] resize-none bg-white/10 border-white/20 text-card-foreground placeholder:text-muted-foreground focus:border-primary"
                  data-testid="textarea-thoughts"
                />
                <p className="text-xs text-muted-foreground">
                  Your thoughts are private and secure. Share as much or as little as you'd like.
                </p>
              </div>

              {/* Submit Button */}
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting || !selectedMood || !thoughts.trim()}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                data-testid="button-submit-checkin"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Recording...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Submit Check-in
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Support Message */}
          <Card className="glassmorphism border-white/20 bg-card/90 backdrop-blur-xl" data-testid="card-support-message">
            <CardContent className="pt-6">
              <div className="text-center space-y-3">
                <Heart className="w-8 h-8 text-primary mx-auto" />
                <h3 className="font-medium text-card-foreground">You're not alone</h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  Every day is a new opportunity for growth and healing. Thank you for taking the time to check in with yourself.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
