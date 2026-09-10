import {
  ArrowDownRight,
  ArrowRight,
  Building2,
  Database,
  GraduationCap,
  Layers3,
  MapPinned,
  Mountain,
  UsersRound,
} from 'lucide-react';
import { DemoLoginForm } from '@/components/demo-login-form';

const foundations = [
  {
    name: 'Dwell Geo',
    line: 'Understand the place',
    copy: 'Bring land, water, infrastructure and subsurface evidence into focus.',
    icon: Mountain,
  },
  {
    name: 'Dwell Digital',
    line: 'Connect information to action',
    copy: 'Organize maps, evidence and decisions in one understandable workspace.',
    icon: Database,
  },
  {
    name: 'Opportunity Assessment',
    line: 'Advance what is viable',
    copy: 'Compare constraints, readiness and potential before committing resources.',
    icon: MapPinned,
  },
  {
    name: 'Dwell Learning',
    line: 'Prepare people to participate',
    copy: 'Build practical skills and local capacity that projects need to last.',
    icon: GraduationCap,
  },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Dwell home">
          <img src="/dwell-logo-clean.png" alt="Dwell" />
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#communities">Communities</a>
          <a href="#industry">Industry Partners</a>
          <a href="#capabilities">Capabilities</a>
          <a href="#technology">Technology</a>
          <a href="#about">About</a>
        </nav>
        <a className="header-cta" href="#client-access">
          Client login <ArrowRight aria-hidden="true" size={16} />
        </a>
      </header>

      <section className="hero" id="top">
        <div className="hero-contours" aria-hidden="true" />
        <div className="eyebrow">Land intelligence for stronger decisions</div>
        <h1>Know the land.<br />Build what comes next.</h1>
        <p className="hero-copy">
          Dwell connects community priorities, field evidence and practical technology
          so people can understand a place and decide what to do next.
        </p>
        <div className="hero-actions">
          <a className="button button-gold" href="#pathways">
            Find your pathway <ArrowDownRight aria-hidden="true" size={18} />
          </a>
          <a className="text-link" href="#technology">
            Explore ATLAS <ArrowRight aria-hidden="true" size={17} />
          </a>
        </div>
        <div className="hero-strata" aria-hidden="true">
          <span /><span /><span /><span /><span />
        </div>
      </section>

      <section className="pathways section" id="pathways" aria-labelledby="pathway-title">
        <div className="section-intro">
          <p className="kicker">Choose your starting point</p>
          <h2 id="pathway-title">Different priorities. One shared foundation.</h2>
        </div>
        <div className="pathway-grid">
          <article className="pathway-card community-card" id="communities">
            <UsersRound aria-hidden="true" size={30} />
            <p className="card-number">01</p>
            <h3>First Nations Communities</h3>
            <p>
              Bring local priorities and community-held knowledge into planning,
              funding conversations and decisions about the land.
            </p>
            <a href="#capabilities">Explore community support <ArrowRight aria-hidden="true" size={17} /></a>
          </article>
          <article className="pathway-card industry-card" id="industry">
            <Building2 aria-hidden="true" size={30} />
            <p className="card-number">02</p>
            <h3>Industry Partners</h3>
            <p>
              See site conditions, evidence gaps and community priorities clearly
              enough to shape responsible, deliverable opportunities.
            </p>
            <a href="#capabilities">Explore partner support <ArrowRight aria-hidden="true" size={17} /></a>
          </article>
        </div>
      </section>

      <section className="foundation section" id="capabilities" aria-labelledby="foundation-title">
        <div className="section-intro split-intro">
          <div>
            <p className="kicker">The Dwell foundation</p>
            <h2 id="foundation-title">Evidence becomes useful when people can act on it.</h2>
          </div>
          <p>
            Our geo, digital, assessment and learning capabilities work together.
            Start with the question, then assemble only the evidence and support it needs.
          </p>
        </div>
        <div className="foundation-list">
          {foundations.map(({ name, line, copy, icon: Icon }, index) => (
            <article key={name}>
              <span className="foundation-index">0{index + 1}</span>
              <Icon aria-hidden="true" size={24} />
              <div>
                <h3>{name}</h3>
                <p className="foundation-line">{line}</p>
              </div>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="atlas-preview section" id="technology" aria-labelledby="atlas-title">
        <div className="atlas-copy">
          <p className="kicker kicker-light">Knowledge Keeper ATLAS</p>
          <h2 id="atlas-title">A shared view of the evidence around a place.</h2>
          <p>
            ATLAS brings land, water, infrastructure, subsurface evidence and
            opportunities together without losing sight of source, confidence or ownership.
          </p>
          <a className="button button-outline" href="#client-access">
            Enter the demonstration <ArrowRight aria-hidden="true" size={17} />
          </a>
        </div>
        <div className="atlas-window" aria-label="Illustrative preview of an ATLAS map">
          <div className="map-toolbar"><Layers3 size={18} /> Community evidence</div>
          <div className="map-surface">
            <div className="map-water" />
            <div className="map-boundary" />
            <span className="map-point point-one" /><span className="map-point point-two" />
            <div className="map-label">Illustrative community area</div>
          </div>
          <div className="map-legend">
            <span><i className="legend-land" /> Community &amp; land</span>
            <span><i className="legend-water" /> Water</span>
            <span><i className="legend-opportunity" /> Opportunity</span>
          </div>
        </div>
      </section>

      <section className="client-access section" id="client-access" aria-labelledby="login-title">
        <div>
          <p className="kicker">Client access</p>
          <h2 id="login-title">Your information, in one place.</h2>
          <p>
            Open the demonstration ATLAS workspace to explore a simplified, illustrative
            view of layered community evidence.
          </p>
        </div>
        <div className="login-preview">
          <DemoLoginForm compact />
        </div>
      </section>

      <section className="principle section" id="about">
        <p className="kicker kicker-light">How we work</p>
        <blockquote>Your land. Your data. Your decisions. Your future.</blockquote>
        <p>
          We support Indigenous rights, knowledge and self-determination through
          respectful partnerships and clear stewardship of information.
        </p>
      </section>

      <footer>
        <img src="/dwell-logo-clean.png" alt="Dwell" />
        <p>Foundations for stronger communities</p>
        <a href="#top">Back to top</a>
      </footer>
    </main>
  );
}
