import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Heart, Lightbulb, Shield, Clock } from "lucide-react";

type Virtue = "bravery" | "kindness" | "creativity" | "patience";

interface VirtueResult {
  title: string;
  icon: typeof Heart;
  description: string;
  color: string;
}

const virtues: Record<Virtue, VirtueResult> = {
  bravery: {
    title: "Bravery",
    icon: Shield,
    description: "Your tooth carries the courage to face the unknown. It will help someone take a leap of faith when they're afraid.",
    color: "from-primary to-accent",
  },
  kindness: {
    title: "Kindness",
    icon: Heart,
    description: "Your tooth holds gentle compassion. It will help someone show love to a stranger or friend in need.",
    color: "from-accent to-fairy-glow",
  },
  creativity: {
    title: "Creativity",
    icon: Lightbulb,
    description: "Your tooth sparkles with imagination. It will inspire someone to dream up something wonderful.",
    color: "from-primary to-workshop-gold",
  },
  patience: {
    title: "Patience",
    icon: Clock,
    description: "Your tooth holds calm persistence. It will help someone wait for the right moment with grace.",
    color: "from-fairy-glow to-accent",
  },
};

const questions = [
  {
    question: "When you see someone having a hard day, what do you do?",
    options: [
      { text: "Give them a hug or kind words", virtue: "kindness" as Virtue },
      { text: "Think of something fun to cheer them up", virtue: "creativity" as Virtue },
      { text: "Stay with them quietly until they feel better", virtue: "patience" as Virtue },
      { text: "Help them face what's bothering them", virtue: "bravery" as Virtue },
    ],
  },
  {
    question: "What's your favorite way to spend a rainy day?",
    options: [
      { text: "Drawing, building, or making something new", virtue: "creativity" as Virtue },
      { text: "Reading a cozy book or doing a puzzle", virtue: "patience" as Virtue },
      { text: "Calling a friend to keep them company", virtue: "kindness" as Virtue },
      { text: "Trying something I've never done before", virtue: "bravery" as Virtue },
    ],
  },
];

const VirtueQuizSection = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Virtue[]>([]);
  const [result, setResult] = useState<VirtueResult | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);

  const handleAnswer = (virtue: Virtue) => {
    const newAnswers = [...selectedAnswers, virtue];
    setSelectedAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      // Calculate result
      const counts = newAnswers.reduce((acc, v) => {
        acc[v] = (acc[v] || 0) + 1;
        return acc;
      }, {} as Record<Virtue, number>);

      const topVirtue = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Virtue;
      setResult(virtues[topVirtue]);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setResult(null);
  };

  const scrollToSignup = () => {
    document.getElementById("signup")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container px-6">
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-block text-xs font-semibold uppercase tracking-wide text-primary bg-primary/10 px-3 py-1 rounded-full mb-4">
            Discover Your Tooth's Gift
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            What virtue is in your tooth?
          </h2>
          <p className="text-muted-foreground mb-8">
            Every tooth carries something special—a virtue that belongs to you. 
            Take a quick peek to see what gift your tooth might hold.
          </p>

          {!showQuiz ? (
            <Button variant="magical" size="lg" onClick={() => setShowQuiz(true)}>
              <Sparkles className="w-4 h-4" />
              Discover Your Virtue
            </Button>
          ) : result ? (
            /* Result Card */
            <div className="magical-card text-center animate-fade-in-up">
              <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-br ${result.color} flex items-center justify-center mb-6 shadow-magical`}>
                <result.icon className="w-10 h-10 text-primary-foreground" />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                Your tooth holds: {result.title}
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {result.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="magical" onClick={scrollToSignup}>
                  <Sparkles className="w-4 h-4" />
                  Join the Workshop for updates
                </Button>
                <Button variant="outline" onClick={resetQuiz}>
                  Try again
                </Button>
              </div>
            </div>
          ) : (
            /* Quiz */
            <div className="magical-card animate-fade-in-up">
              <div className="mb-6">
                <div className="flex gap-2 justify-center mb-4">
                  {questions.map((_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        i === currentQuestion ? "bg-primary" : i < currentQuestion ? "bg-accent" : "bg-muted"
                      }`}
                    />
                  ))}
                </div>
                <h3 className="font-display text-xl font-semibold text-card-foreground">
                  {questions[currentQuestion].question}
                </h3>
              </div>
              <div className="grid gap-3">
                {questions[currentQuestion].options.map((option, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(option.virtue)}
                    className="w-full p-4 text-left rounded-xl border-2 border-border bg-background hover:border-primary hover:bg-secondary/50 transition-all text-foreground font-medium"
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default VirtueQuizSection;
