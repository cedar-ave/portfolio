// Contact form, handled by Netlify Forms: no server code and no email address
// on the site. Netlify finds the form in the built HTML at deploy time (the
// data-netlify attribute), stores each submission, and emails a notification.
// See docs/site-config/contact-form.mdx.

import React, { useState } from 'react';
import Layout from '@theme/Layout';
import styles from './contact.module.css';

const FORM_NAME = 'contact';

export default function Contact() {
  const [status, setStatus] = useState('idle');

  // Posts the form in the background so the visitor stays on the page.
  // Without JavaScript, the browser posts it normally and Netlify shows its
  // own confirmation page.
  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus('sending');
    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form)).toString(),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      form.reset();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  return (
    <Layout title="Contact" description="Send Marla Sowards a message">
      <main className={`container margin-vert--xl ${styles.contact}`}>
        <h1>Contact</h1>
        <h2>LinkedIn</h2>
        <p>Find me on <a href="https://www.linkedin.com/in/marlasowards/">LinkedIn</a>.</p>
        <h2>Email</h2>
        <p>Send me a message and I'll get back to you by email.</p>

        <form
          name={FORM_NAME}
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={handleSubmit}>
          <input type="hidden" name="form-name" value={FORM_NAME} />
          {/* Honeypot: hidden from people, so anything typed here is a bot. */}
          <p className={styles.honeypot} aria-hidden="true">
            <label>
              Don't fill this out: <input name="bot-field" tabIndex={-1} autoComplete="off" />
            </label>
          </p>

          <label className={styles.field}>
            Name
            <input type="text" name="name" autoComplete="name" required />
          </label>
          <label className={styles.field}>
            Email
            <input type="email" name="email" autoComplete="email" required />
          </label>
          <label className={styles.field}>
            Message
            <textarea name="message" rows={6} required />
          </label>

          <button
            type="submit"
            className="button button--primary button--lg"
            disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send'}
          </button>

          <p role="status" className={styles.status}>
            {status === 'sent' && 'Thanks! Your message was sent.'}
            {status === 'error' &&
              "Sorry, your message didn't go through. Please try again, or reach me on LinkedIn."}
          </p>
        </form>
      </main>
    </Layout>
  );
}
