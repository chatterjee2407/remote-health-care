import React from 'react';

const HelpSupportPage: React.FC = () => (
  <div style={styles.container}>
    {/* 1. Welcome & Quick Links */}
    <section id="welcome" style={styles.section}>
      <h1 style={styles.header}>Help & Support</h1>
      <p style={{ ...styles.paragraph, color: '#ffffff' }}>
        We’re here to help—whether you need a quick answer or hands-on assistance, support is just a click away.
      </p>
      <nav style={styles.quickLinks}>
        <a href="#faqs" style={styles.link}>📖 FAQs</a>
        <a href="#troubleshooting" style={styles.link}>🛠 Troubleshooting</a>
        <a href="#contact" style={styles.link}>📞 Contact Support</a>
        <a href="#live-chat" style={styles.link}>💬 Live Chat</a>
        <a href="#feedback" style={styles.link}>📝 Feedback</a>
      </nav>
    </section>

    {/* 2. FAQs */}
    <section id="faqs" style={styles.section}>
      <h2 style={{ ...styles.subHeader, color: '#ffffff' }}>Frequently Asked Questions</h2>
      <div style={styles.accordion}>
        {/* Account & Login */}
        <details>
          <summary style={styles.summary}>Account & Login</summary>
          <ul style={styles.list}>
            <li style={{ color: '#ffffff' }}>How do I reset my password?</li>
            <li style={{ color: '#ffffff' }}>How do I update my email address?</li>
          </ul>
        </details>
        {/* Scheduling & Appointments */}
        <details>
          <summary style={styles.summary}>Scheduling & Appointments</summary>
          <ul style={styles.list}>
            <li style={{ color: '#ffffff' }}>How do I book or cancel a visit?</li>
            <li style={{ color: '#ffffff' }}>Can I reschedule an appointment?</li>
          </ul>
        </details>
        {/* Joining a Video Visit */}
        <details>
          <summary style={styles.summary}>Joining a Video Visit</summary>
          <ul style={styles.list}>
            <li style={{ color: '#ffffff' }}>What browser should I use?</li>
            <li style={{ color: '#ffffff' }}>Why can’t I see my camera?</li>
          </ul>
        </details>
        {/* Medical Records */}
        <details>
          <summary style={styles.summary}>Medical Records</summary>
          <ul style={styles.list}>
            <li style={{ color: '#ffffff' }}>How do I upload lab results?</li>
            <li style={{ color: '#ffffff' }}>Where can I view past prescriptions?</li>
          </ul>
        </details>
        {/* Billing & Insurance */}
        <details>
          <summary style={styles.summary}>Billing & Insurance</summary>
          <ul style={styles.list}>
            <li style={{ color: '#ffffff' }}>How do I pay my consultation fee?</li>
            <li style={{ color: '#ffffff' }}>How do I submit an insurance claim?</li>
          </ul>
        </details>
      </div>
    </section>

    {/* 3. Troubleshooting Guides */}
    <section id="troubleshooting" style={styles.section}>
      <h2 style={{ ...styles.subHeader, color: '#ffffff' }}>Troubleshooting Guides</h2>
      {/* 3.1 Video Call Issues */}
      <article style={styles.subSection}>
        <h3 style={{ color: '#ffffff' }}>Video Call Issues</h3>
        <ul style={styles.list}>
          <li style={{ color: '#ffffff' }}><strong>Permissions:</strong> Step-by-step for Chrome, Safari, and mobile.</li>
          <li style={{ color: '#ffffff' }}><strong>Poor Connection:</strong> Switch networks, close other apps, or use Ethernet.</li>
          <li style={{ color: '#ffffff' }}><strong>Error Codes:</strong>
            <table style={styles.table}>
              <thead>
                <tr><th>Code</th><th>Issue</th><th>Solution</th></tr>
              </thead>
              <tbody>
                <tr><td style={{ color: '#ffffff' }}>403</td><td style={{ color: '#ffffff' }}>Permission denied</td><td style={{ color: '#ffffff' }}>Re-login and re-authorize camera/mic</td></tr>
                <tr><td style={{ color: '#ffffff' }}>500</td><td style={{ color: '#ffffff' }}>Server error</td><td style={{ color: '#ffffff' }}>Retry or contact support</td></tr>
              </tbody>
            </table>
          </li>
        </ul>
      </article>
      {/* 3.2 Mobile App vs. Desktop */}
      <article style={styles.subSection}>
        <h3 style={{ color: '#ffffff' }}>Mobile App vs. Desktop</h3>
        <p style={{ ...styles.paragraph, color: '#ffffff' }}>
          Platform-specific features and steps may vary—see our dedicated mobile and desktop setup guides.
        </p>
      </article>
      {/* 3.3 Notification & Email Problems */}
      <article style={styles.subSection}>
        <h3 style={{ color: '#ffffff' }}>Notification & Email Problems</h3>
        <ul style={styles.list}>
          <li style={{ color: '#ffffff' }}>Why didn’t I get my appointment reminder?</li>
          <li style={{ color: '#ffffff' }}>How do I whitelist our domain so emails don’t go to spam?</li>
        </ul>
      </article>
    </section>

    {/* 4. Contact & Escalation Paths */}
    <section id="contact" style={{ ...styles.section, ...styles.highlight }}>
      <h2 style={{ ...styles.subHeader, color: '#2d3748' }}>Contact & Escalation Paths</h2>
      <article style={styles.subSection} id="live-chat">
        <h3 style={{ color: '#2d3748' }}>Live Chat</h3>
        <p>Mon–Fri, 8 AM–8 PM ET via the chat widget or &quot;Chat Now&quot; button.</p>
      </article>
      <article style={styles.subSection}>
        <h3 style={{ color: '#2d3748' }}>Phone & Email</h3>
        <p>Toll‑free: 1‑800‑HEALTH (Mon–Fri, 8 AM–8 PM ET)</p>
        <p>Email: <a href="mailto:support@yourhealthapp.com">support@yourhealthapp.com</a> (response within 4 hours)</p>
      </article>
      <article style={styles.subSection}>
        <h3 style={{ color: '#2d3748' }}>Emergency Instructions</h3>
        <p>This platform is <strong>not</strong> for emergencies. Call <a href="tel:911">911</a> or your local emergency number.</p>
        <p>Alternate urgent care: 24/7 nurse line at 1‑800‑NURSE.</p>
      </article>
    </section>

    {/* 5. User Guides & Video Tutorials */}
    <section style={styles.section}>
      <h2 style={{ ...styles.subHeader, color: '#ffffff' }}>User Guides & Video Tutorials</h2>
      <ul style={styles.list}>
        <li>&quot;How to Book a Visit&quot; – Article</li>
        <li>&quot;Navigating Your Dashboard&quot; – Article</li>
        <li>&quot;Uploading Documents & Images&quot; – Article</li>
      </ul>
      <p style={{ color: '#ffffff' }}>Watch our quick demos on <a href="https://youtube.com">YouTube</a>.</p>
      <p style={{ color: '#ffffff' }}><a href="/quick-start.pdf" download>Download Quick-Start PDF</a></p>
    </section>

    {/* 6. Resources & Policies */}
    <section style={styles.section}>
      <h2 style={{ ...styles.subHeader, color: '#ffffff' }}>Resources & Policies</h2>
      <ul style={styles.list}>
        <li><a href="/privacy">Privacy Policy & HIPAA Compliance</a></li>
        <li><a href="/terms">Terms of Service</a></li>
        <li><a href="/data-request">Data Access Request</a></li>
        <li><a href="/accessibility">Accessibility Statement</a></li>
      </ul>
    </section>

    {/* 7. Feedback & Feature Requests */}
    <section id="feedback" style={styles.section}>
      <h2 style={{ ...styles.subHeader, color: '#ffffff' }}>Feedback & Feature Requests</h2>
      <p style={{ color: '#ffffff' }}>Let us know what you think:</p>
      <button style={styles.button}>Submit Feedback</button>
      <div style={styles.thumbs}>
        <button>👍</button>
        <button>👎</button>
      </div>
    </section>
  </div>
);

const styles: Record<string, React.CSSProperties> = {
  container: { padding: '20px', fontFamily: 'Arial, sans-serif', color: '#333' },
  section: { marginBottom: '40px' },
  header: { fontSize: '2rem', borderBottom: '2px solid #eee', paddingBottom: '10px', marginBottom: '20px', color: '#ffffff' },
  subHeader: { fontSize: '1.5rem', marginBottom: '15px', color: '#2d3748' },
  paragraph: { fontSize: '1rem', lineHeight: '1.5', marginBottom: '15px', color: '#4a5568' },
  quickLinks: { display: 'flex', gap: '15px', flexWrap: 'wrap', marginBottom: '20px' },
  link: { textDecoration: 'none', color: '#ffffff', fontWeight: 500 },
  accordion: { display: 'grid', gap: '10px' },
  summary: { cursor: 'pointer', fontWeight: 600, fontSize: '1rem', padding: '8px', background: '#f7fafc', borderRadius: '4px' },
  list: { marginTop: '8px', marginLeft: '20px', color: '#ffffff' },
  subSection: { marginTop: '20px' },
  table: { width: '100%', borderCollapse: 'collapse', marginTop: '10px', marginBottom: '10px' },
  highlight: { backgroundColor: '#feebc8', padding: '20px', borderRadius: '6px' },
  button: { backgroundColor: '#3182ce', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 },
  thumbs: { display: 'flex', gap: '10px', marginTop: '10px' }
};

export default HelpSupportPage;
