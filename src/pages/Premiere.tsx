import { Link } from "react-router-dom";
import { ArrowLeft, MapPin, Calendar, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import PageSeo from "@/components/PageSeo";
import { YOUTUBE_VIDEO_URL } from "@/lib/config";
import { trackCTAClick, trackEvent } from "@/lib/analytics";
import premiereScreening from "@/assets/premiere-screening.jpg";
import premiereReynolds from "@/assets/premiere-reynolds.jpg";
import premiereThumbsup from "@/assets/premiere-thumbsup.jpg";
import moviePoster from "@/assets/movie-poster.jpg";

const Premiere = () => {
  return (
    <div className="min-h-screen bg-background">
      <PageSeo
        title="Tooth Fairy Film Premiere | Wiggly Tooth Workshop"
        description="Recap of the world premiere of The Tooth Fairy's Secret Workshop at TLC Studios in Dedham, MA, with a live FaceTime visit from Peter H. Reynolds."
        canonical="https://wigglytoothworkshop.com/tooth-fairy-film-premiere"
        image="https://wigglytoothworkshop.com/og-image.png"
      />

      {/* Structured data — event recap */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            name: "The Tooth Fairy's Secret Workshop — World Premiere",
            startDate: "2026-06-07T14:00",
            eventStatus: "https://schema.org/EventScheduled",
            eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
            location: {
              "@type": "Place",
              name: "TLC Studios",
              address: {
                "@type": "PostalAddress",
                streetAddress: "390 Washington Street",
                addressLocality: "Dedham",
                addressRegion: "MA",
                postalCode: "02026",
                addressCountry: "US",
              },
            },
            image: ["https://wigglytoothworkshop.com/og-image.png"],
            description:
              "Over 100 people joined the world premiere of The Tooth Fairy's Secret Workshop at TLC Studios in Dedham, Massachusetts, including a live FaceTime visit from illustrator Peter H. Reynolds.",
            organizer: {
              "@type": "Organization",
              name: "Wiggly Tooth Workshop",
              url: "https://wigglytoothworkshop.com/",
            },
          }),
        }}
      />

      <NavBar />

      <main>
        {/* Hero */}
        <section className="relative py-20 md:py-28 night-sky-section overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-starlight rounded-full sparkle"
                style={{
                  left: `${(i * 19 + 5) % 100}%`,
                  top: `${(i * 27 + 9) % 85}%`,
                  animationDelay: `${(i * 0.17) % 2}s`,
                }}
              />
            ))}
          </div>

          <div className="container relative z-10 px-6 max-w-3xl mx-auto text-center">
            <Link
              to="/news"
              className="inline-flex items-center gap-2 text-sm text-starlight/80 hover:text-starlight/90 transition-colors mb-10"
            >
              <ArrowLeft className="w-4 h-4" />
              News from the Workshop
            </Link>

            <span className="inline-block text-xs font-semibold uppercase tracking-wide text-primary bg-primary/20 px-3 py-1 rounded-full mb-6">
              Event Recap
            </span>

            <h1 className="font-display text-4xl md:text-5xl font-bold text-starlight mb-6 leading-tight">
              The Tooth Fairy's Secret Workshop
              <br />
              <span className="text-primary">Premiered in Dedham</span>
            </h1>

            <p className="text-starlight/75 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              On Sunday, June 7, more than 100 friends, families, and curious
              kids joined us at TLC Studios in Dedham Square for the world
              premiere of <em>The Tooth Fairy's Secret Workshop</em>. Here's how
              it went.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center text-sm">
              <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-starlight/10 border border-starlight/20 text-starlight/80">
                <Calendar className="w-4 h-4 text-primary" />
                June 7, 2026
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-starlight/10 border border-starlight/20 text-starlight/80">
                <MapPin className="w-4 h-4 text-primary" />
                TLC Studios · Dedham, MA
              </div>
            </div>
          </div>
        </section>

        {/* Lead photo */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container px-6 max-w-3xl mx-auto">
            <figure>
              <img
                src={premiereScreening}
                alt="A full house at TLC Studios in Dedham watching the world premiere of The Tooth Fairy's Secret Workshop, with families seated on orange rugs and chairs in front of the film's title screen"
                width={1400}
                height={1050}
                loading="lazy"
                className="w-full rounded-2xl shadow-magical"
              />
              <figcaption className="text-center text-sm text-muted-foreground mt-3">
                A full house at TLC Studios for the first-ever screening.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Recap copy */}
        <section className="pb-4 bg-background">
          <div className="container px-6 max-w-2xl mx-auto">
            <p className="text-foreground text-lg leading-relaxed mb-6">
              We showed the film for the very first time, then opened the floor
              to questions from the curious kids in the room - the same kind of
              questions that started this whole project.
            </p>

            {/* Reynolds highlight */}
            <div className="my-10">
              <div className="flex items-center gap-3 mb-5">
                <Star className="w-5 h-5 text-primary flex-shrink-0" />
                <h2 className="font-display text-2xl font-bold text-foreground">
                  A live visit from Peter H. Reynolds
                </h2>
              </div>
              <figure className="mb-5">
                <img
                  src={premiereReynolds}
                  alt="Illustrator Peter H. Reynolds joining the premiere live via FaceTime on the big screen, drawing CeCe the Tooth Fairy while the audience watches"
                  width={1000}
                  height={1333}
                  loading="lazy"
                  className="w-full max-w-md mx-auto rounded-2xl shadow-magical"
                />
                <figcaption className="text-center text-sm text-muted-foreground mt-3">
                  Peter H. Reynolds drawing CeCe live, from his studio to ours.
                </figcaption>
              </figure>
              <p className="text-foreground text-lg leading-relaxed">
                One of the highlights of the afternoon was illustrator Peter H.
                Reynolds joining us live via FaceTime - drawing CeCe right in
                front of everyone and sharing the creative process behind how he
                brought her to life.
              </p>
            </div>

            {/* Smile wall */}
            <p className="text-foreground text-lg leading-relaxed mb-10">
              Kids also added to a smile wall, coloring teeth with the virtues
              they carry - bravery, kindness, creativity, and all the quiet good
              things growing inside them.
            </p>
          </div>
        </section>

        {/* Voice of Arlo */}
        <section className="pb-12 md:pb-16 bg-background">
          <div className="container px-6 max-w-2xl mx-auto">
            <p className="text-foreground text-lg leading-relaxed mb-6">
              We were also joined by Andreas Branigan, the voice of Arlo, who came
              to celebrate the film he helped bring to life.
            </p>
            <figure>
              <img
                src={premiereThumbsup}
                alt="Gerard Murphy and Andreas Branigan, the voice of Arlo, together after the premiere of The Tooth Fairy's Secret Workshop in Dedham"
                width={1400}
                height={1050}
                loading="lazy"
                className="w-full rounded-2xl shadow-magical"
              />
              <figcaption className="text-center text-sm text-muted-foreground mt-3">
                Gerard Murphy with Andreas Branigan - the voice of Arlo - after the
                premiere.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Poster + watch CTA */}
        <section className="py-16 md:py-20 bg-secondary/30">
          <div className="container px-6 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="order-2 md:order-1">
                <span className="inline-block text-xs font-semibold uppercase tracking-wide text-primary bg-primary/10 px-3 py-1 rounded-full mb-4">
                  Missed the premiere?
                </span>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Watch the film anytime
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  <em>The Tooth Fairy's Secret Workshop</em> is now on YouTube,
                  free to watch. Discover what the Tooth Fairy really does with
                  the teeth she collects.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="magical" asChild>
                    <a
                      href={YOUTUBE_VIDEO_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent("social_click", { platform: "youtube", location: "premiere_recap" })}
                    >
                      <Sparkles className="w-4 h-4" />
                      Watch the film
                    </a>
                  </Button>
                  <Button variant="workshop" asChild>
                    <a href="/#signup" onClick={() => trackCTAClick("premiere_recap")}>
                      Join the Workshop
                    </a>
                  </Button>
                </div>
              </div>
              <figure className="order-1 md:order-2">
                <img
                  src={moviePoster}
                  alt="Official movie poster for The Tooth Fairy's Secret Workshop, an animated short film from Wiggly Tooth Workshop and FableVision, with the tagline 'The magic under your pillow can help change the world.'"
                  width={1184}
                  height={1482}
                  loading="lazy"
                  className="w-full max-w-xs mx-auto rounded-2xl shadow-magical"
                />
              </figure>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Premiere;
