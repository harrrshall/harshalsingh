import Link from "next/link"

interface PhysicsProgress {
  percentage: number;
  currentTopic: string;
}

interface PersonalWebsiteProps {
  physicsProgress: PhysicsProgress;
}

export default function PersonalWebsite({ physicsProgress: _physicsProgress }: PersonalWebsiteProps) {
  return (
    <main className="research-page">
      <article className="research-article">

        <header className="rp-header">
          <h1 className="rp-title">Harshal Singh</h1>
          <p className="rp-byline">Independent researcher &middot; builder</p>
          <p className="rp-date">Last updated May 2026</p>
        </header>

        <section className="rp-abstract">
          <h2 className="rp-abstract-label">Abstract</h2>
          <p className="rp-lede">
            I am an independent researcher and engineer.
          </p>
          <p>
            I build small, expressive Hinglish text-to-speech systems.
          </p>
          <p>
            My broader interests are computer science, mathematics,
            physics, and hardware. I learned almost everything I know
            from the internet.
          </p>
          <p>
            I believe in{" "}
            <a href="https://a16z.com/the-techno-optimist-manifesto/" target="_blank" rel="noopener noreferrer">techno-optimism</a>{" "}
            and{" "}
            <a href="https://en.wikipedia.org/wiki/Effective_accelerationism" target="_blank" rel="noopener noreferrer">effective accelerationism</a>.
            The plan is to build profitable companies that accelerate
            human progress.
          </p>
        </section>

        <hr className="rp-rule" />

        <section className="rp-section">
          <h2 className="rp-section-title"><span className="rp-num">1.</span> Operating principles</h2>
          <ol className="rp-principles" type="i">
            {PRINCIPLES.map((p) => (<li key={p}>{p}</li>))}
          </ol>
        </section>

        <hr className="rp-rule" />

        <section className="rp-section">
          <h2 className="rp-section-title"><span className="rp-num">2.</span> Current research &mdash; Hinglish TTS</h2>
          <p>
            Building the world&rsquo;s smallest and best Hinglish TTS &mdash; sub&ndash;25M
            trainable parameters, expressive narration, code-switch native.
          </p>
          <ul className="rp-bullets">
            <li>
              Racing four architectures in parallel on a single T4 budget:
              {" "}<em>Matcha-TTS</em> (&asymp; 22M, Hindi PL-BERT + EmoSpeech head),
              {" "}<em>IndicParler-TTS &rarr; StyleTTS2-lite</em> distillation with composite-reward DPO,
              {" "}a <em>Mimi-codec + 15&ndash;20M GLA / RWKV-7</em> zero-shot voice-cloning moonshot,
              {" "}and <em>StyleTTS2-lite</em> warm-started from Kokoro v1.0.
            </li>
            <li>
              Pushing expressivity past the &ldquo;four emotion buttons&rdquo; ceiling with an
              {" "}<em>EmoSphere++</em> continuous valence&ndash;arousal&ndash;dominance head and
              training-free <em>EmoSteer-TTS</em> activation steering &mdash; continuous
              emotion sliders at inference, no retraining.
            </li>
          </ul>
        </section>

        <hr className="rp-rule" />

        <section className="rp-section">
          <h2 className="rp-section-title"><span className="rp-num">3.</span> Writing</h2>
          <p>
            Essays at the intersection of work, love, philosophy, and
            future technology.{" "}
            <Link href="/writing" className="rp-arrow-link">View all essays &rarr;</Link>
          </p>
        </section>

        <hr className="rp-rule" />

        <section className="rp-section">
          <h2 className="rp-section-title"><span className="rp-num">4.</span> Past experiments</h2>

          <dl className="rp-dl">
            <dt>
              <span className="rp-num">4.1</span> Humanless
              <span className="rp-meta"> &middot; <a href="https://humanless.site" target="_blank" rel="noopener noreferrer">humanless.site</a></span>
            </dt>
            <dd>
              A plug-and-play AI tool that transforms existing CCTV footage
              into actionable business insights. Connect existing cameras,
              analyze in real time, get reports. Aimed at retail and
              hospitality.
            </dd>

            <dt>
              <span className="rp-num">4.2</span> IFarc
            </dt>
            <dd>
              AI-powered compliance automation for Registered Investment
              Advisors: automated recordkeeping (Rule 204-2), code-of-ethics
              monitoring, client onboarding, and marketing review for SEC
              compliance. The teacher here was the regulated industry
              itself.
            </dd>

            <dt>
              <span className="rp-num">4.3</span> AI Video Creation Platform
            </dt>
            <dd>
              An experiment in automating high-quality YouTube video
              creation end to end. Prompt in, ready-to-publish content out.
              Spun off three open-source siblings &mdash; Open Podcast (text to
              podcast), Open Dubbing (video dubbing &amp; audiobooks), and
              Connected Podcast (AI-simulated conversations with
              historical figures).
            </dd>

            <dt>
              <span className="rp-num">4.4</span> Historical Conversations
            </dt>
            <dd>
              Imagined conversations with Ramanujan, Steve Jobs, and Nikola
              Tesla.{" "}
              <a href="https://open.spotify.com/episode/1cQs2EVEVYnZHoweeSCBvU?si=K0iqU3EhQLy76EKD_N3Mug" target="_blank" rel="noopener noreferrer">Listen on Spotify &rarr;</a>
            </dd>
          </dl>
        </section>

        <hr className="rp-rule" />

        <section className="rp-section">
          <h2 className="rp-section-title"><span className="rp-num">5.</span> Projects &amp; code</h2>
          <p className="rp-meta-line">A selection. All open source.</p>

          <table className="rp-table">
            <tbody>
              {PROJECTS.map((p) => (
                <tr key={p.title}>
                  <td className="rp-table-name">
                    <a href={p.github} target="_blank" rel="noopener noreferrer">{p.title}</a>
                  </td>
                  <td className="rp-table-desc">{p.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <hr className="rp-rule" />

        <section className="rp-section">
          <h2 className="rp-section-title"><span className="rp-num">6.</span> Other</h2>
          <p>
            <Link href="/arts" className="rp-arrow-link">Arts &amp; music &rarr;</Link> &middot;{" "}
            <Link href="/physics" className="rp-arrow-link">Physics self-study log &rarr;</Link>
          </p>
        </section>

        <hr className="rp-rule" />

        <footer className="rp-footer">
          <h2 className="rp-section-title rp-correspondence">Correspondence</h2>
          <p className="rp-socials">
            <a href="https://github.com/harrrshall" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="rp-social">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56 0-.27-.01-1.01-.02-1.98-3.2.69-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.19a11.06 11.06 0 0 1 5.79 0c2.21-1.5 3.18-1.19 3.18-1.19.62 1.58.23 2.75.11 3.04.73.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.4-5.25 5.68.41.36.77 1.06.77 2.14 0 1.55-.01 2.8-.01 3.18 0 .31.21.67.8.56 4.57-1.52 7.86-5.83 7.86-10.91C23.5 5.65 18.35.5 12 .5z"/>
              </svg>
            </a>
            <a href="https://x.com/HarshalsinghCN" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="rp-social">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2H21.5l-7.5 8.575L23 22h-6.857l-5.376-7.06L4.6 22H1.34l8.04-9.19L1 2h7l4.86 6.46L18.244 2zm-2.41 18h1.9L7.255 4H5.21l10.624 16z"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/harshalsinghcn/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="rp-social">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.27 2.38 4.27 5.47v6.27zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/>
              </svg>
            </a>
          </p>
          <p className="rp-colophon">
            &copy; {new Date().getFullYear()} Harshal Singh.
          </p>
        </footer>

      </article>
    </main>
  )
}

const PROJECTS = [
  {
    title: "numpygrad",
    description: "GPT-2 trained from scratch in pure NumPy, verified against PyTorch — with an accompanying blog post deriving the math line by line.",
    github: "https://github.com/harrrshall/numpygrad",
  },
  {
    title: "twitter-memory",
    description: "MV3 Chrome extension that captures your Twitter attention log — tweets, sessions, dwell time — into a local SQLite DB with daily markdown exports.",
    github: "https://github.com/harrrshall/twitter-memory",
  },
  {
    title: "postforge",
    description: "Self-improving LinkedIn content engine — multi-agent simulation, EMA weight calibration, 10-persona debate threads, cron automation.",
    github: "https://github.com/harrrshall/postforge",
  },
  {
    title: "skore",
    description: "Production-grade chatbot for JEE/NEET students, trained on YouTube videos and Reddit threads.",
    github: "https://github.com/harrrshall/skore",
  },
  {
    title: "mini_alphafold",
    description: "A minimal implementation of AlphaFold for protein structure prediction.",
    github: "https://github.com/harrrshall/mini_alphafold",
  },
  {
    title: "ask_shr_krishna",
    description: "AI-powered Bhagavad Gita Q&A system.",
    github: "https://github.com/harrrshall/ask_shr_krishna",
  },
  {
    title: "picrate",
    description: "An appearance analyzer — AI tool that scores facial images.",
    github: "https://github.com/harrrshall/picrate",
  },
  {
    title: "gpt2-accelerator-chip",
    description: "Designing a GPT-2 accelerator chip from scratch in under four weeks.",
    github: "https://github.com/harrrshall/gpt2-accelerator-chip",
  },
  {
    title: "blogify",
    description: "Transform podcasts into engaging blog posts.",
    github: "https://github.com/harrrshall/blogify",
  },
  {
    title: "CalorieCam",
    description: "Count calories from food images using computer vision.",
    github: "https://github.com/harrrshall/CalorieCam",
  },
  {
    title: "webscribe",
    description: "Chat with websites interactively.",
    github: "https://github.com/harrrshall/webscribe",
  },
  {
    title: "DataDigitalizer",
    description: "Bridge physical and digital data.",
    github: "https://github.com/harrrshall/DataDigitalizer",
  },
  {
    title: "LLAMA_-from_scratch",
    description: "Implement LLAMA from the ground up.",
    github: "https://github.com/harrrshall/LLAMA_-from_scratch",
  },
  {
    title: "Open-Dubbing",
    description: "Open-source video dubbing and audiobook creation tools.",
    github: "https://github.com/harrrshall/Open-Dubbing",
  },
]

const PRINCIPLES = [
  "Move quickly; make plans for months and complete them in weeks.",
  "No risk, no gain.",
  "Do something that normal people cannot even dream of.",
  "The opposite of success is mediocrity, not failure.",
  "This time will pass; you will get old, you will die, so it does not matter.",
  "No one is rich in time.",
  "Competition is for losers.",
  "The laws of physics are the only limit.",
  "Model the world as 500 people rather than 8 billion.",
]
