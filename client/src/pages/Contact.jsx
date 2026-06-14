import ScrollReveal from '../components/ScrollReveal';
import ContactForm from '../components/ContactForm';
import { PERSONAL } from '../data/personalData';

const Contact = () => {
  const contactItems = [
    {
      icon: '✉️',
      label: 'Email',
      value: PERSONAL.email,
      href: `mailto:${PERSONAL.email}`,
    },
    {
      icon: '💼',
      label: 'LinkedIn',
      value: 'Connect with me',
      href: PERSONAL.links.linkedin,
    },
    {
      icon: '🐙',
      label: 'GitHub',
      value: 'View my code',
      href: PERSONAL.links.github,
    },
    {
      icon: '📍',
      label: 'Location',
      value: PERSONAL.location,
      href: null,
    },
  ];

  return (
    <section id="contact" style={{ padding: '100px 24px', maxWidth: 1100, margin: '0 auto' }}>
      <ScrollReveal>
        <div style={{ marginBottom: 64, textAlign: 'center' }}>
          <div className="section-tag" style={{ marginBottom: 12 }}>// CONTACT</div>
          <h2 className="section-title">
            Open <span style={{ color: 'var(--purple)' }}>Comms</span>
          </h2>
          <div className="scanline-divider" style={{ maxWidth: 300, margin: '16px auto 0' }} />
        </div>
      </ScrollReveal>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 48, alignItems: 'start' }}>
        {/* Left Panel */}
        <ScrollReveal from={{ opacity: 0, x: -40 }} to={{ opacity: 1, x: 0 }}>
          <div>
            <h3 style={{ fontFamily: 'JetBrains Mono', fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
              Let's Build Something
            </h3>
            <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.7, marginBottom: 32 }}>
              I'm currently available for freelance work, internships, and full-time opportunities.
              If you have a project in mind or just want to connect, feel free to reach out!
            </p>

            {/* Response time badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(93,202,165,0.08)',
              border: '1px solid rgba(93,202,165,0.2)',
              borderRadius: 8, padding: '8px 14px', marginBottom: 32,
            }}>
              <span style={{ fontSize: 16 }}>⏱️</span>
              <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: 'var(--teal)' }}>
                Response time: within 24hrs
              </span>
            </div>

            {/* Contact items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {contactItems.map(item => (
                <div key={item.label} className="glass-card" style={{ padding: '16px 20px', display: 'flex', gap: 14, alignItems: 'center' }}>
                  <span style={{ fontSize: 24 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: 'var(--muted)', letterSpacing: '0.1em', marginBottom: 2 }}>
                      {item.label.toUpperCase()}
                    </div>
                    {item.href
                      ? (
                        <a href={item.href} target="_blank" rel="noopener noreferrer"
                          style={{ color: 'var(--purple)', fontSize: 13, textDecoration: 'none', fontWeight: 600 }}
                        >
                          {item.value}
                        </a>
                      )
                      : <span style={{ color: 'var(--white)', fontSize: 13 }}>{item.value}</span>
                    }
                  </div>
                </div>
              ))}
            </div>

            {/* Animated envelope */}
            <div style={{ fontSize: 64, textAlign: 'center', marginTop: 32, animation: 'float-1 3s ease-in-out infinite' }}>
              📡
            </div>
          </div>
        </ScrollReveal>

        {/* Right — Form */}
        <ScrollReveal from={{ opacity: 0, x: 40 }} to={{ opacity: 1, x: 0 }}>
          <div className="glass-card" style={{ padding: '36px 32px' }}>
            <h3 style={{ fontFamily: 'JetBrains Mono', fontSize: 16, fontWeight: 700, marginBottom: 24, color: 'var(--purple)' }}>
              // Send a Message
            </h3>
            <ContactForm />
          </div>
        </ScrollReveal>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #contact > div:nth-child(2) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;
