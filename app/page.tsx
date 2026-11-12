import Image from 'next/image';
import { ArrowDownRight, ArrowUpRight, Blocks, Bot, Code2 } from 'lucide-react';
import { Nav } from '@/components/nav';
import { Reveal } from '@/components/reveal';
import { ContactForm } from '@/components/contact-form';
import { LogoMark } from '@/components/logo-mark';

const portfolio = 'https://kendrahartnett.com/';
const services = [
  { number: '01', icon: Code2, title: 'Custom Software', description: 'Useful digital tools built around your business.', items: ['Websites and web applications', 'Internal business tools', 'Customer-facing platforms'] },
  { number: '02', icon: Blocks, title: 'Business Automation', description: 'Connected workflows that take repetitive work off your plate.', items: ['Workflow and API integrations', 'Document and data processing', 'Automated reporting and notifications'] },
  { number: '03', icon: Bot, title: 'Practical AI', description: 'AI features that solve a clear problem and fit the way you work.', items: ['Intelligent assistants', 'AI integrations', 'Document intelligence'] },
];
const steps = [
  ['01', 'Discover', 'We talk about what is slowing you down or what you want to build.'],
  ['02', 'Plan', 'I recommend an approach and define the scope, timeline, and investment.'],
  ['03', 'Build', 'I design, develop, and test the solution with your input along the way.'],
  ['04', 'Launch & Support', 'We put it to work and make improvements as your needs evolve.'],
];

function Label({ children }: { children: React.ReactNode }) {
  return <p className="section-label"><span className="label-line" />{children}</p>;
}

export default function Home() {
  return <>
    <Nav />
    <main id="top">
      <section className="hero checker">
        <div className="container hero-grid">
          <Reveal className="hero-content">
            <Label>Independent Software Development & Automation</Label>
            <h1>Less busywork.<br /><span>Better systems.</span><br />More room to grow.</h1>
            <p className="hero-lead">I build custom software, automations, and practical AI solutions that make everyday work easier.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#contact">Let&apos;s Talk About Your Project <ArrowUpRight size={17} /></a>
              <a className="text-link" href={portfolio} target="_blank" rel="noopener noreferrer">Explore My Portfolio <ArrowUpRight size={16} /></a>
            </div>
            <p className="hero-micro">Thoughtful technology. Built around the way you work.</p>
          </Reveal>
          <Reveal direction="right" delay={0.18} className="hero-art">
            <div className="art-top"><span>KH / 001</span><span>SYSTEMS, SIMPLIFIED</span></div>
            <div className="art-frame art-image-frame">
              <Image src="/images/business-workflow-hero.png" alt="Business documents, schedules, customer information, and reporting connected through one digital workspace" fill priority sizes="(max-width: 850px) 100vw, 38vw" />
              <LogoMark className="hero-image-logo" />
            </div>
            <div className="art-bottom"><span>INDEPENDENT PRACTICE</span><span>EST. 2026 &nbsp; ↗</span></div>
          </Reveal>
        </div>
        <div className="container hero-foot"><span>SCROLL TO EXPLORE</span><ArrowDownRight size={18} /><span>01 / 04</span></div>
      </section>

      <section className="section services-section" id="services">
        <div className="container">
          <Reveal className="section-intro">
            <Label>What I Do</Label>
            <h2>Practical solutions.<br /><em>Thoughtfully built.</em></h2>
            <p>Every project starts with the problem, then the right tools to solve it.</p>
          </Reveal>
          <div className="service-grid">
            {services.map((service, index) => <Reveal key={service.number} delay={index * 0.11} className="service-card">
              <div className="card-top"><span>{service.number} / 03</span><service.icon size={25} strokeWidth={1.5} /></div>
              <h3>{service.title}</h3><p>{service.description}</p>
              <ul>{service.items.map(item => <li key={item}>{item}</li>)}</ul>
            </Reveal>)}
          </div>
          <Reveal className="services-note"><span className="asterisk">✳</span><p>Not sure what you need? <strong>We can figure it out together.</strong></p><a href="#contact" aria-label="Contact Kendra"><ArrowUpRight size={23} /></a></Reveal>
        </div>
      </section>

      <section className="section process-section" id="process">
        <div className="container">
          <Reveal className="section-intro"><Label>How It Works</Label><h2>From challenge to<br /><em>working solution.</em></h2></Reveal>
          <div className="process-grid">
            {steps.map(([number, title, copy], index) => <Reveal key={number} delay={index * 0.12} className="process-step"><div className="step-marker"><span>{number}</span></div><h3>{title}</h3><p>{copy}</p></Reveal>)}
          </div>
        </div>
      </section>

      <section className="section about-section" id="about">
        <div className="container about-grid">
          <Reveal className="about-photo" direction="left">
            <Image src="/images/about-workspace.png" alt="A calm workspace with a laptop displaying a connected workflow diagram" fill sizes="(max-width: 850px) 100vw, 42vw" />
            <span className="about-photo-caption">THOUGHTFUL SYSTEMS / PRACTICAL RESULTS</span>
          </Reveal>
          <Reveal direction="right" className="about-copy">
            <Label>About Kendra</Label>
            <h2>Technology with <em>purpose.</em></h2>
            <p className="about-opening">I&apos;m Kendra Hartnett, an independent software developer who turns complex ideas into useful, approachable tools.</p>
            <p>I work with businesses to simplify operations and build digital products that fit their goals. I care about clear thinking, thoughtful design, and getting the details right.</p>
            <a className="text-link" href={portfolio} target="_blank" rel="noopener noreferrer">See my portfolio <ArrowUpRight size={16} /></a>
          </Reveal>
        </div>
      </section>

      <section className="section contact-section checker" id="contact">
        <div className="container contact-grid">
          <Reveal><Label>Get In Touch</Label><h2>Let&apos;s start a <em>conversation.</em></h2><p>Tell me what you&apos;re working on. I&apos;ll get back to you to discuss the next steps.</p></Reveal>
          <Reveal direction="right" className="form-panel"><ContactForm /></Reveal>
        </div>
      </section>
    </main>
    <footer className="footer">
      <div className="container footer-main">
        <div><a className="footer-brand" href="#top" aria-label="Kendra Hartnett, back to top"><LogoMark className="footer-logo" /></a><h3>Kendra Hartnett</h3><p>Independent Software & Automation</p><small>Thoughtful technology. Meaningful solutions.</small></div>
        <div><span className="footer-label">EXPLORE</span><a href="#services">Services</a><a href="#process">How It Works</a><a href="#about">About</a><a href="#contact">Contact</a><a href={portfolio} target="_blank" rel="noopener noreferrer">Portfolio ↗</a></div>
        <div><span className="footer-label">CONNECT</span><a href="https://github.com/kendrahartnett" target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href="https://www.linkedin.com/in/kendra-hartnett-7877ab422/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></div>
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} Kendra Hartnett. All rights reserved.</span><span>INDEPENDENT SOFTWARE & AUTOMATION</span><a href="#top">BACK TO TOP ↑</a></div>
    </footer>
  </>;
}
