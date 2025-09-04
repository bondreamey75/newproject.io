import { useLocation } from "wouter";
import { BarChart3, Heart, Sparkles, MessageCircle, BookOpen, Moon } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  const [, setLocation] = useLocation();

  const playPopSound = () => {
    // Create a simple pop sound using Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  };

  const navigateToDataInsights = () => {
    playPopSound();
    setTimeout(() => setLocation("/data-insights"), 100);
  };

  const navigateToDailyCheckin = () => {
    playPopSound();
    setTimeout(() => setLocation("/daily-checkin"), 100);
  };

  const navigateToExplore = () => {
    playPopSound();
    setTimeout(() => setLocation("/explore"), 100);
  };

  const navigateToLunaChatBot = () => {
    playPopSound();
    setTimeout(() => setLocation("/luna-chatbot"), 100);
  };

  const navigateToJournaling = () => {
    playPopSound();
    setTimeout(() => setLocation("/journaling"), 100);
  };

  return (
    <div className="min-h-screen aura-background relative overflow-hidden">
      {/* Theme Toggle */}
      <div className="absolute top-8 right-8 z-20">
        <ThemeToggle />
      </div>
      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 dark:bg-white/5 rounded-full floating-animation gentle-pulse" />
        <div className="absolute bottom-40 right-16 w-24 h-24 bg-white/5 dark:bg-white/3 rounded-full floating-animation" />
        <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-white/8 dark:bg-white/4 rounded-full floating-animation gentle-pulse" />
      </div>
      {/* Main content container */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        {/* Header */}
        <header className="text-center mb-20">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-light mb-6 drop-shadow-xl flex items-center justify-center gap-4">
            <span className="bg-gradient-to-r from-gray-800 to-purple-900 bg-clip-text text-transparent font-semibold">
              Luna
            </span>
            <Moon className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 text-purple-600/80 drop-shadow-lg" />
          </h1>
          <p className="text-xl md:text-2xl font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-lg text-[#c499da]">
            Your AI companion for mental wellness and emotional support
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-purple-600 to-transparent mx-auto mt-8 rounded-full" />
        </header>

        {/* Navigation Cards */}
        <div className="flex flex-col gap-8 max-w-lg mx-auto w-full mb-20">
          {/* Know Your Data Card */}
          <div 
            className="navigation-card px-8 py-6 bg-card glassmorphism rounded-full cursor-pointer group flex items-center justify-between hover:shadow-lg transition-all duration-300" 
            onClick={navigateToDataInsights}
            data-testid="button-data-insights"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navigateToDataInsights();
              }
            }}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 nav-subheading">
                  Know Your Data
                </h2>
                <p className="text-base text-gray-600 dark:text-gray-400 font-medium">
                  Explore insights and trends
                </p>
              </div>
            </div>
            <svg className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>

          {/* Tell Us About Your Day Card */}
          <div 
            className="navigation-card px-8 py-6 bg-card glassmorphism rounded-full cursor-pointer group flex items-center justify-between hover:shadow-lg transition-all duration-300" 
            onClick={navigateToDailyCheckin}
            data-testid="button-daily-checkin"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navigateToDailyCheckin();
              }
            }}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 nav-subheading">
                  Tell Us About Your Day
                </h2>
                <p className="text-base font-medium text-[#979eaa]">
                  Share your thoughts and feelings
                </p>
              </div>
            </div>
            <svg className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>

          {/* Explore Card */}
          <div 
            className="navigation-card px-8 py-6 bg-card glassmorphism rounded-full cursor-pointer group flex items-center justify-between hover:shadow-lg transition-all duration-300" 
            onClick={navigateToExplore}
            data-testid="button-explore"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navigateToExplore();
              }
            }}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 nav-subheading flex items-center gap-2">
                  Explore <span className="text-2xl">✨</span>
                </h2>
                <p className="text-base text-gray-600 dark:text-gray-400 font-medium">
                  Discover wellness resources and techniques
                </p>
              </div>
            </div>
            <svg className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>

          {/* Luna ChatBot Assistant Card */}
          <div 
            className="navigation-card px-8 py-6 bg-card glassmorphism rounded-full cursor-pointer group flex items-center justify-between hover:shadow-lg transition-all duration-300" 
            onClick={navigateToLunaChatBot}
            data-testid="button-luna-chatbot"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navigateToLunaChatBot();
              }
            }}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 nav-subheading">
                  Luna ChatBot Assistant
                </h2>
                <p className="text-base text-gray-600 dark:text-gray-400 font-medium">
                  AI-powered emotional support and guidance
                </p>
              </div>
            </div>
            <svg className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>

          {/* Journaling Card */}
          <div 
            className="navigation-card px-8 py-6 bg-card glassmorphism rounded-full cursor-pointer group flex items-center justify-between hover:shadow-lg transition-all duration-300" 
            onClick={navigateToJournaling}
            data-testid="button-journaling"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navigateToJournaling();
              }
            }}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 nav-subheading">
                  Personal Journaling
                </h2>
                <p className="text-base text-gray-600 dark:text-gray-400 font-medium">
                  Express your thoughts and feelings freely
                </p>
              </div>
            </div>
            <svg className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>

        {/* Inspirational Quote */}
        <div className="text-center mb-16">
          <div className="max-w-2xl mx-auto p-8 bg-white/20 glassmorphism rounded-3xl border border-white/30 text-[#9883ff]">
            <p className="text-xl md:text-2xl font-medium leading-relaxed italic text-[#8971ff]">
              "Every emotion you feel is valid. I'm here to listen without judgement."
            </p>
            <div className="w-12 h-1 bg-gradient-to-r from-purple-600 to-pink-500 mx-auto mt-6 rounded-full" />
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center">
          <p className="text-gray-700 text-base font-medium mb-6">
            Your privacy is our priority. All conversations are encrypted and secure.
          </p>
          <div className="flex items-center justify-center space-x-8">
            <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors duration-300 text-base font-medium">Privacy Policy</a>
            <span className="text-gray-500">•</span>
            <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors duration-300 text-base font-medium">Terms of Service</a>
            <span className="text-gray-500">•</span>
            <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors duration-300 text-base font-medium">Support</a>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mt-6">
            Created by Vedant Gophane, Arya Yadav, Kaivalya Lehekar, Chirashree Bapuli and Amey Bondre
          </p>
        </footer>
      </div>
    </div>
  );
}
