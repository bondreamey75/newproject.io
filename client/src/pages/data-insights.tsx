import { useLocation } from "wouter";
import { ArrowLeft, BarChart3, TrendingUp, Brain, Calendar, BookOpen, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { ThemeToggle } from "@/components/ThemeToggle";
import type { JournalEntry } from "@shared/schema";

export default function DataInsights() {
  const [, setLocation] = useLocation();

  const goBack = () => {
    setLocation("/");
  };

  const { data: journalEntries = [] } = useQuery({
    queryKey: ['/api/journal-entries'],
    queryFn: async (): Promise<JournalEntry[]> => {
      const response = await fetch('/api/journal-entries');
      if (!response.ok) {
        throw new Error('Failed to fetch journal entries');
      }
      return response.json();
    },
  });

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
        <div className="max-w-6xl mx-auto">
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
                Your Data Insights
              </span>
            </h1>
            <p className="text-lg font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-sm text-[#5a4da1]">
              Discover patterns in your emotional journey and track your wellness progress over time
            </p>
          </div>

          {/* Insights Grid */}
          <div className="space-y-8 mb-8">
            {/* Mood Tracking Interface */}
            <Card className="glassmorphism border-white/20 bg-card/90 backdrop-blur-xl" data-testid="card-mood-tracking">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-card-foreground text-xl">
                  ☀️ Your Mood Today
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Current Mood */}
                <div className="bg-white/30 rounded-xl p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-3 relative">
                    {/* Neutral mood icon - circular outline with neutral expression */}
                    <svg viewBox="0 0 64 64" className="w-full h-full">
                      {/* Circle background */}
                      <circle
                        cx="32"
                        cy="32"
                        r="30"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="3"
                        className="opacity-80"
                      />
                      {/* Eyes */}
                      <circle cx="24" cy="26" r="3" fill="#10b981" />
                      <circle cx="40" cy="26" r="3" fill="#10b981" />
                      {/* Neutral mouth - straight line */}
                      <line
                        x1="24"
                        y1="42"
                        x2="40"
                        y2="42"
                        stroke="#10b981"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div className="text-lg font-medium text-card-foreground mb-1">Neutral</div>
                  <div className="text-sm text-muted-foreground">Last updated: 12:52</div>
                </div>

                {/* This Week */}
                <div>
                  <h3 className="text-lg font-semibold text-card-foreground mb-4">This Week</h3>
                  <div className="relative h-32 mb-4">
                    {/* Graph Background */}
                    <div className="absolute inset-0 flex items-end justify-between px-4">
                      {/* Grid lines */}
                      <div className="absolute inset-0 flex flex-col justify-between">
                        {[0, 1, 2, 3, 4].map((i) => (
                          <div key={i} className="w-full h-px bg-gray-300/30"></div>
                        ))}
                      </div>
                      
                      {/* Graph line and points */}
                      <svg viewBox="0 0 300 100" className="absolute inset-0 w-full h-full">
                        {/* Line path */}
                        <path
                          d="M 25,60 L 67,75 L 109,85 L 151,40 L 193,60 L 235,45 L 275,40"
                          stroke="#fb923c"
                          strokeWidth="3"
                          fill="none"
                          className="drop-shadow-sm"
                        />
                        {/* Data points */}
                        {[
                          { x: 25, y: 60 },
                          { x: 67, y: 75 },
                          { x: 109, y: 85 },
                          { x: 151, y: 40 },
                          { x: 193, y: 60 },
                          { x: 235, y: 45 },
                          { x: 275, y: 40 }
                        ].map((point, index) => (
                          <circle
                            key={index}
                            cx={point.x}
                            cy={point.y}
                            r="4"
                            fill="#fb923c"
                            className="drop-shadow-sm"
                          />
                        ))}
                      </svg>
                    </div>
                    
                    {/* Day labels */}
                    <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4 -mb-6">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                        <span key={index} className="text-xs text-muted-foreground">{day}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Motivational Message */}
                <div className="bg-white/30 rounded-xl p-4 text-center">
                  <div className="text-2xl mb-2">☀️</div>
                  <div className="text-base font-medium text-card-foreground mb-1">
                    You're taking care of yourself
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Every conversation is a step forward
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Centered Grid for Activity Patterns and Wellness Score */}
            <div className="flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl w-full">
                {/* Activity Patterns */}
                <Card className="glassmorphism border-white/20 bg-card/90 backdrop-blur-xl" data-testid="card-activity-patterns">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-card-foreground">
                      <BarChart3 className="w-5 h-5 text-accent" />
                      Activity Patterns
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Check-ins</span>
                        <span className="text-sm font-medium text-accent">12 this month</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Best Time</span>
                        <span className="text-sm font-medium text-accent">Evening</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        You're most active in sharing thoughts during evening hours
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Wellness Score */}
                <Card className="glassmorphism border-white/20 bg-card/90 backdrop-blur-xl" data-testid="card-wellness-score">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-card-foreground">
                      <Brain className="w-5 h-5 text-primary" />
                      Wellness Score
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary mb-1">8.2</div>
                        <div className="text-sm text-muted-foreground">out of 10</div>
                      </div>
                      <div className="w-full bg-secondary/30 rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full w-4/5"></div>
                      </div>
                      <p className="text-xs text-muted-foreground text-center">
                        Your overall wellness score has improved by 1.2 points this month
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Journal Insights Section */}
            <Card className="glassmorphism border-white/20 bg-card/90 backdrop-blur-xl" data-testid="card-journal-insights">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-card-foreground">
                  <BookOpen className="w-6 h-6 text-primary" />
                  Journal Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                {journalEntries.length > 0 ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary mb-1">{journalEntries.length}</div>
                        <div className="text-sm text-muted-foreground">Total Entries</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-accent mb-1">
                          {Math.round(journalEntries.reduce((acc, entry) => 
                            acc + entry.content.split(' ').length, 0) / journalEntries.length)}
                        </div>
                        <div className="text-sm text-muted-foreground">Avg Words/Entry</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary mb-1">
                          {journalEntries.filter(entry => 
                            new Date(entry.createdAt).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000
                          ).length}
                        </div>
                        <div className="text-sm text-muted-foreground">This Week</div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-card-foreground mb-3">Recent Entries</h4>
                      <div className="space-y-3 max-h-48 overflow-y-auto">
                        {journalEntries.slice(0, 3).map((entry) => (
                          <div key={entry.id} className="bg-white/20 rounded-lg p-3">
                            <p className="text-sm text-muted-foreground mb-1">
                              {new Date(entry.createdAt).toLocaleDateString()}
                            </p>
                            <p className="text-sm text-card-foreground line-clamp-2">
                              {entry.content.length > 100 
                                ? `${entry.content.substring(0, 100)}...` 
                                : entry.content}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <BookOpen className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
                    <p className="text-muted-foreground">No journal entries yet</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Start journaling to see your insights here
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Heart Rate Variability (HRV) Section */}
          <Card className="glassmorphism border-white/20 bg-card/90 backdrop-blur-xl" data-testid="card-hrv-insights">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-card-foreground">
                <Activity className="w-6 h-6 text-red-500" />
                Heart Rate Variability (HRV)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* HRV Score Display */}
                <div className="text-center bg-white/20 rounded-xl p-6">
                  <div className="text-3xl font-bold text-red-500 mb-2">52.3 ms</div>
                  <div className="text-sm text-muted-foreground mb-4">Average RMSSD</div>
                  <div className="w-full bg-secondary/30 rounded-full h-3">
                    <div className="bg-red-500 h-3 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">Good Range</div>
                </div>

                {/* HRV Trend Chart */}
                <div>
                  <h3 className="text-lg font-semibold text-card-foreground mb-4">7-Day HRV Trend</h3>
                  <div className="relative h-32 mb-4">
                    {/* Graph Background */}
                    <div className="absolute inset-0 flex items-end justify-between px-4">
                      {/* Grid lines */}
                      <div className="absolute inset-0 flex flex-col justify-between">
                        {[0, 1, 2, 3, 4].map((i) => (
                          <div key={i} className="w-full h-px bg-gray-300/30"></div>
                        ))}
                      </div>
                      
                      {/* HRV Graph line and points */}
                      <svg viewBox="0 0 300 100" className="absolute inset-0 w-full h-full">
                        {/* Line path */}
                        <path
                          d="M 25,50 L 67,45 L 109,60 L 151,55 L 193,40 L 235,50 L 275,45"
                          stroke="#ef4444"
                          strokeWidth="3"
                          fill="none"
                          className="drop-shadow-sm"
                        />
                        {/* Data points */}
                        {[
                          { x: 25, y: 50 },
                          { x: 67, y: 45 },
                          { x: 109, y: 60 },
                          { x: 151, y: 55 },
                          { x: 193, y: 40 },
                          { x: 235, y: 50 },
                          { x: 275, y: 45 }
                        ].map((point, index) => (
                          <circle
                            key={index}
                            cx={point.x}
                            cy={point.y}
                            r="4"
                            fill="#ef4444"
                            className="drop-shadow-sm"
                          />
                        ))}
                      </svg>
                    </div>
                    
                    {/* Day labels */}
                    <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4 -mb-6">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                        <span key={index} className="text-xs text-muted-foreground">{day}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* HRV Statistics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-red-500 mb-1">48.2</div>
                    <div className="text-xs text-muted-foreground">Weekly Min</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-red-500 mb-1">58.1</div>
                    <div className="text-xs text-muted-foreground">Weekly Max</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-500 mb-1">+2.3%</div>
                    <div className="text-xs text-muted-foreground">Improvement</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-500 mb-1">85%</div>
                    <div className="text-xs text-muted-foreground">Recovery</div>
                  </div>
                </div>

                {/* HRV Insights */}
                <div className="bg-white/20 rounded-xl p-4">
                  <h4 className="font-medium text-card-foreground mb-2">HRV Insights</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Your HRV shows good recovery patterns this week</li>
                    <li>• Stress levels appear well-managed with consistent readings</li>
                    <li>• Consider maintaining your current wellness routine</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Coming Soon Section */}
          <Card className="glassmorphism border-white/20 bg-card/90 backdrop-blur-xl" data-testid="card-coming-soon">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-card-foreground">
                <Calendar className="w-5 h-5 text-accent" />
                More Insights Coming Soon
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-card-foreground">Emotional Mapping</h4>
                  <p className="text-sm text-muted-foreground">
                    Visual representations of your emotional journey and triggers
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-card-foreground">Personalized Recommendations</h4>
                  <p className="text-sm text-muted-foreground">
                    AI-powered suggestions based on your unique patterns
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-card-foreground">Progress Milestones</h4>
                  <p className="text-sm text-muted-foreground">
                    Celebrate your achievements and track your wellness goals
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-card-foreground">Weekly Reports</h4>
                  <p className="text-sm text-muted-foreground">
                    Comprehensive summaries of your mental health journey
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
