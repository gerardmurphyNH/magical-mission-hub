/**
 * The "From the Tooth Fairy" letter, as shown on /tooth-fairy-letter.
 * Styles live in src/index.css under `.wtw-letter`.
 *
 * Without `answers` it renders the blank template; with `answers` it renders a
 * filled-in example. The downloadable PDF/JPG are rendered from the matching
 * HTML in scripts/printables/ - keep the wording in sync.
 */
export interface LetterAnswers {
  name: string;
  quality: string;
  grows: string;
  magic: string;
}

const Answer = ({ value, label }: { value?: string; label: string }) =>
  value ? (
    <span className="wtw-letter__filled">{value}</span>
  ) : (
    <span className="wtw-letter__blank" role="img" aria-label={label} />
  );

const ToothFairyLetterSheet = ({ answers, label }: { answers?: LetterAnswers; label: string }) => {
  const filled = Boolean(answers);
  return (
    <article className="wtw-letter" aria-label={label}>
      <header className="wtw-letter__header">
        <div className="wtw-letter__moonlight" aria-hidden="true">
          <span className="wtw-letter__moon" />
          <span className="wtw-letter__star wtw-letter__star--west" />
          <span className="wtw-letter__star wtw-letter__star--north" />
          <span className="wtw-letter__star wtw-letter__star--east" />
        </div>
        <p className="wtw-letter__title">From the Tooth Fairy</p>
        <div className="wtw-letter__divider" aria-hidden="true">
          <span className="wtw-letter__star" />
        </div>
      </header>
      <div className="wtw-letter__body">
        <p className={filled ? "" : "wtw-letter__prompt wtw-letter__prompt--greeting"}>
          <span>Dear</span>{" "}
          <span className={filled ? "" : "wtw-letter__answer"}>
            <Answer value={answers?.name} label="Blank for the child’s name" />,
          </span>
        </p>
        <p>Thank you for leaving your tooth where I could find it safely.</p>
        <p>
          I examined it very carefully tonight, and I discovered something special growing
          inside it.
        </p>
        <p className={filled ? "" : "wtw-letter__prompt"}>
          <span>Your tooth held a strong spark of</span>{" "}
          <span className={filled ? "" : "wtw-letter__answer"}>
            <Answer value={answers?.quality} label="Blank for the child’s special quality" />.
          </span>
        </p>
        <p className={filled ? "" : "wtw-letter__prompt"}>
          <span>That special quality grows every time you</span>{" "}
          <span className={filled ? "" : "wtw-letter__answer"}>
            <Answer
              value={answers?.grows}
              label="Blank for an example of how the child shows this quality"
            />
            .
          </span>
        </p>
        <p>
          Many grown-ups forget that children are still becoming who they are meant to be. But
          every lost tooth tells part of the story. Yours showed signs of someone who is learning,
          growing, and helping make the world a little better.
        </p>
        <p className={filled ? "" : "wtw-letter__prompt wtw-letter__prompt--magic"}>
          <span>Tonight, I used a little bit of the magic from your tooth to help</span>{" "}
          <span className={filled ? "" : "wtw-letter__answer"}>
            <Answer value={answers?.magic} label="Blank for what the Tooth Fairy helped with" />.
          </span>
        </p>
        <p>Even small qualities can make a very big difference.</p>
        <p>
          I left this money as a thank-you for your tooth and the important qualities growing
          inside you.
        </p>
        <p>
          Please continue brushing carefully. Clean, healthy teeth hold onto their magic much
          better.
        </p>
        <p>Use your thank-you money in a way that keeps a little goodness going.</p>
      </div>
      <div className="wtw-letter__signoff">
        <span className="wtw-letter__star" aria-hidden="true" />
        <span className="wtw-letter__signoff-rule" aria-hidden="true" />
        <p className="wtw-letter__signature">The Tooth Fairy</p>
      </div>
      <footer className="wtw-letter__footer">
        <span>wigglytoothworkshop.com</span>
      </footer>
    </article>
  );
};

export default ToothFairyLetterSheet;
