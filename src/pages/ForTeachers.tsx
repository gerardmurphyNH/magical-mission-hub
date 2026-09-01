import { Link } from "react-router-dom";
import {
  GraduationCap,
  ArrowLeft,
  Sparkles,
  Download,
  BookOpen,
  MessageSquare,
  LayoutGrid,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import PageSeo from "@/components/PageSeo";
import FilmEmbed from "@/components/FilmEmbed";
import { trackCTAClick } from "@/lib/analytics";

const faqs = [
  {
    question: "Is this good for back-to-school activities?",
    answer:
      "Yes. The start of the school year is exactly when this works best - it's often when kindergarten and first-grade students are first losing teeth, and a simple, low-prep activity is a great way to build classroom community in the first weeks of school.",
  },
  {
    question: "What about kindergarten students who can't write yet?",
    answer:
      "Skip the worksheet and use the Kindergarten Tooth Talk idea below instead - a spoken, show-and-tell version of the same reflection. No writing required, and it works just as well for building the same habit of noticing what a child has been growing.",
  },
  {
    question: "Do you have bulletin board or classroom display ideas?",
    answer:
      "Yes - see the Bulletin Board Ideas section below. The Tooth Fairy Virtue Wall and Class Tooth Tracker both turn this into something visible in the room, not just a one-time worksheet.",
  },
  {
    question: "What books pair well with this lesson?",
    answer:
      "Any read-aloud about a first lost tooth or about a specific character trait (bravery, kindness, patience) pairs naturally. If you want something specifically about tooth fairy traditions, Throw Your Tooth on the Roof by Selby Beeler is a well-known nonfiction picture book about how different cultures celebrate a lost tooth - a nice pairing with our own page on tooth fairy traditions around the world.",
  },
  {
    question: "Is there a note I can send home to parents?",
    answer:
      "Yes - we have a free printable parent note template on our classroom printables page that explains the classroom tradition and invites families to continue it at home.",
  },
];

const ForTeachers = () => {
  return (
    <div className="min-h-screen bg-background">
      <PageSeo
        title="Tooth Fairy Classroom Activities & Lesson Plan | Wiggly Tooth Workshop"
        description="Free back-to-school Tooth Fairy classroom activities, bulletin board ideas, and discussion questions for grades K-5, including a kindergarten-friendly option."
        canonical="https://wigglytoothworkshop.com/for-teachers"
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Wiggly Tooth Workshop",
                  item: "https://wigglytoothworkshop.com/",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "For Teachers",
                  item: "https://wigglytoothworkshop.com/for-teachers",
                },
              ],
            },
            {
              "@type": "Article",
              headline: "Tooth Fairy Classroom Activities & Lesson Plan",
              description:
                "Free Tooth Fairy classroom activities, a lesson plan, and discussion questions for grades K-5, built around the short film The Tooth Fairy's Secret Workshop.",
              about: [
                "tooth fairy classroom activities",
                "tooth fairy lesson plan",
                "tooth fairy discussion questions",
                "back to school classroom activity",
                "kindergarten tooth fairy activity",
                "tooth fairy bulletin board",
              ],
              author: { "@type": "Organization", name: "Wiggly Tooth Workshop" },
              publisher: {
                "@type": "Organization",
                name: "Wiggly Tooth Workshop",
                url: "https://wigglytoothworkshop.com/",
              },
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": "https://wigglytoothworkshop.com/for-teachers",
              },
            },
            {
              "@type": "FAQPage",
              mainEntity: faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: { "@type": "Answer", text: faq.answer },
              })),
            },
          ],
        }}
      />
      <NavBar />
      <main className="container px-6 py-16 max-w-3xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Wiggly Tooth Workshop
        </Link>

        <span className="inline-block text-xs font-semibold uppercase tracking-wide text-primary bg-primary/10 px-3 py-1 rounded-full mb-5">
          Classroom Resources · Back to School
        </span>

        <h1 className="font-display text-4xl font-bold text-foreground mb-4 leading-tight">
          For Teachers &amp; Classrooms
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed mb-4">
          Use <em>The Tooth Fairy's Secret Workshop</em> to open conversations about character,
          virtues, and the small ways children make the world better.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-12">
          The start of the school year is one of the best times to use this - kindergarten and
          first-grade students are often losing their first teeth right as the year begins, which
          makes it a natural, low-prep way to start building classroom community in the first
          weeks of school.
        </p>

        {/* Film embed */}
        <div className="mb-10">
          <FilmEmbed
            location="for_teachers"
            heading="Watch the short film (optional)"
            blurb="Add The Tooth Fairy's Secret Workshop (about 4 minutes) to your lesson flow before the discussion prompts or activities below - a nice way to bring the idea to life, but not required if you're short on time."
          />
        </div>

        {/* Discussion prompts */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-5">
            <MessageSquare className="w-5 h-5 text-primary" />
            <h2 className="font-display text-2xl font-bold text-foreground">
              Discussion Prompts
            </h2>
          </div>
          <div className="space-y-4">
            {[
              {
                grade: "K–2",
                prompts: [
                  "What do you think the Tooth Fairy does with the teeth she collects?",
                  "If your tooth held a special quality, what quality would you want it to have?",
                  "How did Arlo feel when he found out what the Tooth Fairy really does?",
                ],
              },
              {
                grade: "3–5",
                prompts: [
                  "The film says that teeth hold virtues — qualities like courage and kindness. What does that mean to you?",
                  "Think about something brave or kind you did recently. If that 'went into' your tooth, what would the Tooth Fairy do with it?",
                  "Why do you think the Tooth Fairy works at night, when nobody can see her?",
                ],
              },
            ].map((group) => (
              <div key={group.grade} className="magical-card">
                <span className="inline-block text-xs font-semibold uppercase tracking-wide text-primary bg-primary/10 px-3 py-1 rounded-full mb-3">
                  Grades {group.grade}
                </span>
                <ul className="space-y-2">
                  {group.prompts.map((prompt, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                      <span className="text-primary font-semibold mt-0.5">{i + 1}.</span>
                      <span>{prompt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Activity ideas */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-5">
            <BookOpen className="w-5 h-5 text-primary" />
            <h2 className="font-display text-2xl font-bold text-foreground">
              Classroom Activity Ideas
            </h2>
          </div>
          <div className="space-y-4">
            {[
              {
                title: "Kindergarten Tooth Talk (Show and Tell)",
                description: "For pre-writers, skip the worksheet. When a student loses a tooth, gather the class in a circle and ask them to share one brave, kind, or helpful thing they did that week — out loud, not on paper. Add their name to the Class Tooth Tracker below as they share.",
              },
              {
                title: "My Virtue Jar",
                description: "Have each student write down one kind, brave, creative, or patient thing they did that week. Collect them in a class jar. At the end of the month, read them aloud — like the Tooth Fairy's workshop, cataloguing what the class has built together.",
              },
              {
                title: "Write a Tooth Fairy Letter",
                description: "Students write a letter to the Tooth Fairy about a tooth they've lost (or imagine losing), describing what virtue they think was in it. Pairs well with the printable letter template.",
              },
              {
                title: "Virtue Mapping",
                description: "After watching the film, students draw or write about a moment when they showed courage, kindness, creativity, or patience. Connect it to the idea that these moments build up over time.",
              },
              {
                title: "Color the Story",
                description: "Use the free coloring page after watching the film as a quiet activity to let students process what they saw. Works especially well for K–2.",
              },
            ].map((activity) => (
              <div key={activity.title} className="p-4 rounded-xl bg-secondary/50 border border-border">
                <h3 className="font-display font-semibold text-foreground mb-1">{activity.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{activity.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bulletin board ideas */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-5">
            <LayoutGrid className="w-5 h-5 text-primary" />
            <h2 className="font-display text-2xl font-bold text-foreground">
              Bulletin Board &amp; Classroom Display Ideas
            </h2>
          </div>
          <div className="space-y-4">
            {[
              {
                title: "Tooth Fairy Virtue Wall",
                description: "Every time a student loses a tooth, add a paper tooth cutout with their name and the quality they picked - bravery, kindness, creativity, patience. Pin it to a growing bulletin board display. By June, the wall tells the story of everything the class has been growing all year.",
              },
              {
                title: "Class Tooth Tracker",
                description: "A simple poster tracking how many teeth the class has lost this school year, with each entry naming a virtue instead of just a tally mark. Works well started in the first week of school and updated all year long.",
              },
            ].map((idea) => (
              <div key={idea.title} className="p-4 rounded-xl bg-secondary/50 border border-border">
                <h3 className="font-display font-semibold text-foreground mb-1">{idea.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{idea.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Book pairings */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-5">
            <BookOpen className="w-5 h-5 text-primary" />
            <h2 className="font-display text-2xl font-bold text-foreground">
              Books to Pair With This Lesson
            </h2>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Any read-aloud about a child's first lost tooth, or about a specific character trait
            like bravery or kindness, pairs naturally with this activity. If you want something
            specifically about the Tooth Fairy tradition itself,{" "}
            <em>Throw Your Tooth on the Roof</em> by Selby Beeler is a well-known nonfiction
            picture book about how children around the world celebrate a lost tooth - a nice
            companion to our own page on{" "}
            <Link to="/is-the-tooth-fairy-real" className="text-primary hover:underline">
              tooth fairy traditions around the world
            </Link>
            .
          </p>
        </div>

        {/* Downloads */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-5">
            <Download className="w-5 h-5 text-primary" />
            <h2 className="font-display text-2xl font-bold text-foreground">
              Free Downloads
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="magical-card flex flex-col gap-3">
              <h3 className="font-display font-semibold text-foreground">Coloring Page</h3>
              <p className="text-muted-foreground text-sm">
                Great for a quiet activity or art integration. Free for classroom use.
              </p>
              <Button variant="magical" size="sm" asChild>
                <Link to="/coloring-page">
                  <Download className="w-3.5 h-3.5" />
                  Get the coloring page
                </Link>
              </Button>
            </div>
            <div className="magical-card flex flex-col gap-3">
              <h3 className="font-display font-semibold text-foreground">Tooth Fairy Letter Template</h3>
              <p className="text-muted-foreground text-sm">
                A printable letter for the Tooth Fairy activity — free to download and use in the classroom.
              </p>
              <Link to="/tooth-fairy-letter" className="text-sm font-medium text-primary hover:underline">
                Get the letter template →
              </Link>
            </div>
            <div className="magical-card flex flex-col gap-3 sm:col-span-2">
              <h3 className="font-display font-semibold text-foreground">SEL Worksheet &amp; Teacher Guide</h3>
              <p className="text-muted-foreground text-sm">
                A grades 1-2 SEL reflection worksheet plus a two-page low-prep teacher guide, with a note-home template for parents.
              </p>
              <Link to="/tooth-fairy-printables" className="text-sm font-medium text-primary hover:underline">
                Get the printables →
              </Link>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-12">
          <h2 className="font-display text-2xl font-bold text-foreground mb-5 text-center">
            Common Questions
          </h2>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="magical-card border-0 data-[state=open]:shadow-magical transition-shadow"
              >
                <AccordionTrigger className="text-left font-display font-semibold text-foreground hover:text-primary transition-colors hover:no-underline px-0">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* More resources CTA */}
        <div className="magical-card text-center">
          <GraduationCap className="w-6 h-6 text-primary mx-auto mb-3" />
          <h3 className="font-display text-lg font-semibold text-foreground mb-2">
            More classroom resources coming
          </h3>
          <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
            Join the Workshop to receive new printables, activity packs, and classroom
            guides as they're created.
          </p>
          <Button
            variant="magical"
            size="sm"
            onClick={() => trackCTAClick("for_teachers_page")}
            asChild
          >
            <a href="/#signup">
              <Sparkles className="w-3.5 h-3.5" />
              Join the Workshop
            </a>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ForTeachers;
