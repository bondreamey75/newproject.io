import { useLocation } from "wouter";
import { ArrowLeft, BookOpen, Music, Wind, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Explore() {
  const [, setLocation] = useLocation();

  const goBack = () => {
    setLocation("/");
  };

  const exploreTopics = [
    {
      id: "reading",
      title: "Reading Work",
      icon: BookOpen,
      color: "from-blue-400 to-indigo-500",
      items: [
        { text: "The Body Keeps the Score - Bessel van der Kolk", url: "https://www.goodreads.com/book/show/18693771-the-body-keeps-the-score" },
        { text: "Mindfulness for Beginners - Jon Kabat-Zinn", url: "https://www.goodreads.com/book/show/94049.Mindfulness_for_Beginners" },
        { text: "The Gifts of Imperfection - Brené Brown", url: "https://www.goodreads.com/book/show/7015403-the-gifts-of-imperfection" },
        { text: "Lost Connections - Johann Hari", url: "https://www.goodreads.com/book/show/34921573-lost-connections" },
        { text: "Maybe You Should Talk to Someone - Lori Gottlieb", url: "https://www.goodreads.com/book/show/37570546-maybe-you-should-talk-to-someone" },
        { text: "The Anxiety and Phobia Workbook - Edmund Bourne", url: "https://www.goodreads.com/book/show/180901.The_Anxiety_and_Phobia_Workbook" }
      ]
    },
    {
      id: "music",
      title: "Music Recommendations",
      icon: Music,
      color: "from-purple-400 to-pink-500",
      items: [
        { text: "Weightless - Marconi Union (scientifically proven to reduce anxiety)", url: "https://www.youtube.com/watch?v=UfcAVejslrU" },
        { text: "Clair de Lune - Claude Debussy", url: "https://www.youtube.com/watch?v=CvFH_6DNRCY" },
        { text: "Aqueous Transmission - Incubus", url: "https://www.youtube.com/watch?v=eQK7KSTQfaw" },
        { text: "Spiegel im Spiegel - Arvo Pärt", url: "https://www.youtube.com/watch?v=TJ6Mzvh3XCc" },
        { text: "River - Joni Mitchell", url: "https://www.youtube.com/watch?v=3NH-ctddY9o" },
        { text: "Mad World - Gary Jules", url: "https://www.youtube.com/watch?v=4N3N1MlvVc4" }
      ]
    },
    {
      id: "breathwork",
      title: "Breathwork Techniques",
      icon: Wind,
      color: "from-green-400 to-teal-500",
      items: [
        { text: "4-7-8 Breathing: Inhale 4, hold 7, exhale 8", url: "https://www.youtube.com/watch?v=YRPh_GaiL8s" },
        { text: "Box Breathing: Inhale 4, hold 4, exhale 4, hold 4", url: "https://www.youtube.com/watch?v=tEmt1Znux58" },
        { text: "Belly Breathing: Deep diaphragmatic breathing", url: "https://www.youtube.com/watch?v=nzCaZQqAs9I" },
        { text: "Alternate Nostril Breathing: Balance your nervous system", url: "https://www.youtube.com/watch?v=8VwufJrUhic" },
        { text: "Coherent Breathing: 5-6 breaths per minute rhythm", url: "https://www.youtube.com/watch?v=kSZKIupBUuc" },
        { text: "Three-Part Breathing: Belly, ribs, chest expansion", url: "https://www.youtube.com/watch?v=2Zv7jzpYgdE" }
      ]
    },
    {
      id: "yoga",
      title: "Yoga for Daily Practice",
      icon: Activity,
      color: "from-orange-400 to-red-500",
      items: [
        { text: "Child's Pose: Grounding and calming", url: "https://www.youtube.com/watch?v=2Y1LvdUoMLY" },
        { text: "Cat-Cow Stretch: Spine mobility and mindfulness", url: "https://www.youtube.com/watch?v=kqnua4rHVVA" },
        { text: "Downward Dog: Full-body energizer", url: "https://www.youtube.com/watch?v=pvgGWyBU45g" },
        { text: "Legs Up the Wall: Stress relief and restoration", url: "https://www.youtube.com/watch?v=E9mKmUudHss" },
        { text: "Mountain Pose: Foundation for presence", url: "https://www.youtube.com/watch?v=baCmEADhc9o" },
        { text: "Gentle Twist: Release tension and detox", url: "https://www.youtube.com/watch?v=9l7jKqjAx1c" }
      ]
    }
  ];

  return (
    <div className="min-h-screen aura-background relative">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-24 h-24 bg-white/8 rounded-full floating-animation gentle-pulse" />
        <div className="absolute bottom-40 right-16 w-16 h-16 bg-white/5 rounded-full floating-animation" />
        <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-white/6 rounded-full floating-animation gentle-pulse" />
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

          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-light mb-6 drop-shadow-lg">
              <span className="bg-gradient-to-r from-gray-800 to-purple-900 bg-clip-text text-transparent font-semibold flex items-center justify-center gap-3">
                Explore <span className="text-5xl">✨</span>
              </span>
            </h1>
            <p className="text-lg font-medium max-w-3xl mx-auto leading-relaxed drop-shadow-sm text-[#8770f5]">
              Discover curated resources for your mental health journey - from inspiring reads to calming music, breathwork techniques, and gentle yoga practices
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto mt-8 rounded-full" />
          </div>

          {/* Explore Topics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {exploreTopics.map((topic) => {
              const IconComponent = topic.icon;
              return (
                <Card 
                  key={topic.id} 
                  className="glassmorphism border-white/20 bg-card/90 backdrop-blur-xl rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105" 
                  data-testid={`card-${topic.id}`}
                >
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-gray-800">
                      <div className={`w-10 h-10 bg-gradient-to-br ${topic.color} rounded-2xl flex items-center justify-center`}>
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-xl font-bold text-[#9b87ff]">{topic.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {topic.items.map((item, index) => (
                        <a 
                          key={index}
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start gap-3 p-3 bg-white/30 rounded-2xl hover:bg-white/40 transition-colors duration-300 cursor-pointer group"
                          data-testid={`link-${topic.id}-${index}`}
                        >
                          <div className="w-2 h-2 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-700 font-medium text-sm leading-relaxed group-hover:text-gray-900 transition-colors">
                            {item.text}
                          </p>
                        </a>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Bottom Message */}
          <div className="text-center mt-16 mb-8">
            <div className="max-w-2xl mx-auto p-6 bg-white/20 glassmorphism rounded-3xl border border-white/30">
              <p className="text-lg font-medium leading-relaxed text-[#df5ab7]">
                Remember, healing is not linear. Take what serves you and leave what doesn't. Your journey is uniquely yours. ✨
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}