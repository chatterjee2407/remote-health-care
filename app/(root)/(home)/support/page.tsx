'use client';
import React, { useState } from 'react';

// FAQ Data Structure
type FAQ = { topic: string; questions: string[]; };
const faqs: FAQ[] = [
  { topic: 'Account & Login', questions: [
      'How do I reset my password?',
      'How do I update my email address?'
    ]
  },
  { topic: 'Scheduling & Appointments', questions: [
      'How do I book or cancel a visit?',
      'Can I reschedule an appointment?'
    ]
  },
  { topic: 'Joining a Video Visit', questions: [
      'What browser should I use?',
      'Why can’t I see my camera?'
    ]
  },
  { topic: 'Medical Records', questions: [
      'How do I upload lab results?',
      'Where can I view past prescriptions?'
    ]
  },
  { topic: 'Billing & Insurance', questions: [
      'How do I pay my consultation fee?',
      'How do I submit an insurance claim?'
    ]
  }
];

// Controlled Accordion Component
const Accordion: React.FC<{ faq: FAQ }> = ({ faq }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={styles.accordionItem}>
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        style={styles.summaryButton}
      >
        {faq.topic} {open ? '▲' : '▼'}
      </button>
      {open && (
        <ul style={styles.list}>
          {faq.questions.map((q, i) => (
            <li key={i} style={styles.listItem}>{q}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

const HelpSupportPage: React.FC = () => (
  <div style={styles.container}>
    {/* 1. Welcome & Quick Links */}
    <section id="welcome" style={styles.section}>
      <h1 style={styles.header}>Help & Support</h1>
      <p style={styles.paragraph}>
        We’re here to help—whether you need a quick answer or hands-on assistance, support is just a click away.
      </p>
      <nav style={styles.quickLinks}>
        <a href="#faqs" style={styles.link}>📖 FAQs</a>
        <a href="#troubleshooting" style={styles.link}>🛠 Troubleshooting</a>
        <a href="#contact" style={styles.link}>📞 Contact Support</a>
        <a href="#feedback" style={styles.link}>📝 Feedback</a>
      </nav>
    </section>

    {/* 2. FAQs */}
    <section id="faqs" style={styles.section}>
      <h2 style={styles.subHeader}>Frequently Asked Questions</h2>
      <div style={styles.accordionContainer}>
        {faqs.map((f, idx) => (
          <Accordion key={idx} faq={f} />
        ))}
      </div>
    </section>

    {/* 3. Troubleshooting Guides */}
    <section id="troubleshooting" style={styles.section}>
      <h2 style={styles.subHeader}>Troubleshooting Guides</h2>
      <article style={styles.subSection}>
        <h3>Video Call Issues</h3>
        <ul style={styles.list}>
          <li style={styles.listItem}><strong>Permissions:</strong> Step-by-step for Chrome, Safari, and mobile.</li>
          <li style={styles.listItem}><strong>Poor Connection:</strong> Switch networks, close other apps, or use Ethernet.</li>
          <li style={styles.listItem}><strong>Error Codes:</strong></li>
        </ul>
        <table style={styles.table}>
          <thead>
            <tr><th>Code</th><th>Issue</th><th>Solution</th></tr>
          </thead>
          <tbody>
            <tr><td>403</td><td>Permission denied</td><td>Re-login and re-authorize camera/mic</td></tr>
            <tr><td>500</td><td>Server error</td><td>Retry or contact support</td></tr>
          </tbody>
        </table>
      </article>

      <article style={styles.subSection}>
        <h3>Mobile App vs. Desktop</h3>
        <p style={styles.paragraph}>
          Platform-specific features and steps may vary—see our dedicated mobile and desktop setup guides.
        </p>
      </article>

      <article style={styles.subSection}>
        <h3>Notification & Email Problems</h3>
        <ul style={styles.list}>
          <li style={styles.listItem}>Why didn’t I get my appointment reminder?</li>
          <li style={styles.listItem}>How do I whitelist our domain so emails don’t go to spam?</li>
        </ul>
      </article>
    </section>

    {/* 4. Contact & Escalation Paths */}
    <section id="contact" style={{ ...styles.section, ...styles.highlight }}>
      <h2 style={styles.subHeader}>Contact & Escalation Paths</h2>
      <article style={styles.subSection}>
        <h3>Live Chat</h3>
        <p>Mon–Fri, 8 AM–8 PM ET via the chat widget or “Chat Now” button.</p>
      </article>
      <article style={styles.subSection}>
        <h3>Phone & Email</h3>
        <p>Toll-free: 1-800-HEALTH (Mon–Fri, 8 AM–8 PM ET)</p>
        <p>Email: <a href="mailto:support@yourhealthapp.com">support@yourhealthapp.com</a> (response within 4 hours)</p>
      </article>
      <article style={styles.subSection}>
        <h3>Emergency Instructions</h3>
        <p>This platform is <strong>not</strong> for emergencies. Call <a href="tel:911">911</a> or your local emergency number.</p>
        <p>Alternate urgent care: 24/7 nurse line at 1-800-NURSE.</p>
      </article>
    </section>

    {/* 5. User Guides & Video Tutorials */}
    <section style={styles.section}>
      <h2 style={styles.subHeader}>User Guides & Video Tutorials</h2>
      <ul style={styles.list}>
        <li style={styles.listItem}>How to Book a Visit – Article</li>
        <li style={styles.listItem}>Navigating Your Dashboard – Article</li>
        <li style={styles.listItem}>Uploading Documents & Images – Article</li>
      </ul>
      <p style={styles.paragraph}>Watch our quick demos on <a href="https://youtube.com">YouTube</a>.</p>
      <p style={styles.paragraph}><a href="/quick-start.pdf" download>Download Quick-Start PDF</a></p>
    </section>

    {/* 6. Resources & Policies */}
    <section style={styles.section}>
      <h2 style={styles.subHeader}>Resources & Policies</h2>
      <ul style={styles.list}>
        <li style={styles.listItem}><a href="/privacy">Privacy Policy & HIPAA Compliance</a></li>
        <li style={styles.listItem}><a href="/terms">Terms of Service</a></li>
        <li style={styles.listItem}><a href="/data-request">Data Access Request</a></li>
        <li style={styles.listItem}><a href="/accessibility">Accessibility Statement</a></li>
      </ul>
    </section>

    {/* 7. Feedback & Feature Requests */}
    <section id="feedback" style={styles.section}>
      <h2 style={styles.subHeader}>Feedback & Feature Requests</h2>
      <p style={styles.paragraph}>Let us know what you think:</p>
      <button style={styles.button}>Submit Feedback</button>
      <div style={styles.thumbs}>
        <button style={styles.thumbButton}>👍</button>
        <button style={styles.thumbButton}>👎</button>
      </div>
    </section>
  </div>
);

const styles: Record<string, React.CSSProperties> = {
  container: { padding: '20px', fontFamily: 'Arial, sans-serif', color: '#333' },
  section: { marginBottom: '40px' },
  header: { fontSize: '2rem', borderBottom: '2px solid #eee', paddingBottom: '10px', marginBottom: '20px', color: '#1a202c' },
  subHeader: { fontSize: '1.5rem', marginBottom: '15px', color: '#2d3748' },
  paragraph: { fontSize: '1rem', lineHeight: '1.5', marginBottom: '15px', color: '#4a5568' },
  quickLinks: { display: 'flex', gap: '15px', flexWrap: 'wrap', marginBottom: '20px' },
  link: { textDecoration: 'none', color: '#3182ce', fontWeight: 500 },
  accordionContainer: { display: 'grid', gap: '10px' },
  accordionItem: { border: '1px solid #e2e8f0', borderRadius: '4px', overflow: 'hidden' },
  summaryButton: { width: '100%', textAlign: 'left', padding: '10px', background: '#f7fafc', border: 'none', cursor: 'pointer', fontWeight: 600 },
  list: { paddingLeft: '20px', listStyleType: 'disc', margin: 0 },
  listItem: { marginBottom: '8px', color: '#4a5568' },
  subSection: { marginTop: '20px' },
  table: { width: '100%', borderCollapse: 'collapse', marginTop: '10px', marginBottom: '10px' },
  highlight: { backgroundColor: '#feebc8', padding: '20px', borderRadius: '6px' },
  button: { backgroundColor: '#3182ce', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 },
  thumbs: { display: 'flex', gap: '10px', marginTop: '10px' },
  thumbButton: { background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }
};

export default HelpSupportPage;
