"use client";

import { useState } from "react";

export default function ContactForm({ toEmail }: { toEmail: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!toEmail) return;
    const subject = encodeURIComponent(
      `Portfolio inquiry${name ? ` — ${name}` : ""}`
    );
    const body = encodeURIComponent(
      `${message}\n\n— ${name || "Anonymous"}${email ? `\n${email}` : ""}`
    );
    const href = `mailto:${toEmail}?subject=${subject}&body=${body}`;
    if (typeof window !== "undefined") window.location.href = href;
  };

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <div className="contact-form-row">
        <label className="contact-form-field">
          <span className="contact-form-label mono">your name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="contact-form-input"
            placeholder="Jane Engineer"
            autoComplete="name"
            required
          />
        </label>
        <label className="contact-form-field">
          <span className="contact-form-label mono">your email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="contact-form-input"
            placeholder="jane@example.com"
            autoComplete="email"
            required
          />
        </label>
      </div>

      <label className="contact-form-field">
        <span className="contact-form-label mono">message</span>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="contact-form-input contact-form-textarea"
          placeholder="What are you working on?"
          rows={5}
          required
        />
      </label>

      <div className="contact-form-actions">
        <button type="submit" className="contact-form-submit mono">
          send via email
          <span className="magnetic-arrow" aria-hidden>
            →
          </span>
        </button>
        <p className="contact-form-hint mono">
          opens your mail client · no backend, lands directly in my inbox
        </p>
      </div>
    </form>
  );
}
