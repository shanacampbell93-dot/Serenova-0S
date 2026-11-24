"use client";

import { useState } from "react";
import { CONTACT_ENDPOINT } from "@/lib/portfolio";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const ready = Boolean(CONTACT_ENDPOINT);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!ready) return;
    setStatus("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...data, _subject: `Portfolio enquiry: ${data.topic}` }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="form-done" role="status">
        <p className="form-done-title">Message sent.</p>
        <p>Thanks for getting in touch. I'll reply by email within two working days.</p>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <label>
        <span>Your name</span>
        <input name="name" required autoComplete="name" />
      </label>
      <label>
        <span>Email address</span>
        <input name="email" type="email" required autoComplete="email" />
      </label>
      <label>
        <span>What's it about?</span>
        <select name="topic" defaultValue="A job or role">
          <option>A job or role</option>
          <option>A project</option>
          <option>A workshop</option>
          <option>Something else</option>
        </select>
      </label>
      <label className="full">
        <span>Message</span>
        <textarea name="message" rows={5} required placeholder="A few lines about what you need, and any deadline." />
      </label>
      <div className="full form-foot">
        <button className="s-btn s-btn-primary" disabled={!ready || status === "sending"}>
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
        {!ready && <p className="form-note">The form is being connected and will be ready shortly.</p>}
        {status === "error" && <p className="form-note error">The message didn't send. Check your connection and try again.</p>}
      </div>
    </form>
  );
}
