import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Home from "@/pages/home";
import DataInsights from "@/pages/data-insights";
import DailyCheckin from "@/pages/daily-checkin";
import Explore from "@/pages/explore";
import LunaChatBot from "@/pages/luna-chatbot";
import Journaling from "@/pages/journaling";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/data-insights" component={DataInsights} />
      <Route path="/daily-checkin" component={DailyCheckin} />
      <Route path="/explore" component={Explore} />
      <Route path="/luna-chatbot" component={LunaChatBot} />
      <Route path="/journaling" component={Journaling} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
