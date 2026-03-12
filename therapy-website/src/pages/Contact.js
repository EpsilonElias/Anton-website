import React, { useState, useEffect, useRef } from "react";

function Contact() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    honeypot: "",
  });

  const [canSubmit, setCanSubmit] = useState(true);
  const [timer, setTimer] = useState(0);
  const timerRef = useRef(null);

  const [showModal, setShowModal] = useState(false);
  const [showLimitModal, setShowLimitModal] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      timerRef.current = setTimeout(() => setTimer(timer - 1), 1000);
      setCanSubmit(false);
    } else {
      setCanSubmit(true);
    }
    return () => clearTimeout(timerRef.current);
  }, [timer]);

  useEffect(() => {
    const siteKey = process.env.REACT_APP_RECAPTCHA_SITE_KEY;
    if (!siteKey || typeof window === "undefined") {
      return;
    }

    if (document.querySelector('script[data-recaptcha="v3"]')) {
      return;
    }

    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.defer = true;
    script.setAttribute("data-recaptcha", "v3");
    document.body.appendChild(script);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const getRecaptchaToken = (siteKey) =>
    new Promise((resolve, reject) => {
      if (!window.grecaptcha || !window.grecaptcha.execute) {
        reject(new Error("reCAPTCHA not ready"));
        return;
      }

      window.grecaptcha.ready(() => {
        window.grecaptcha
          .execute(siteKey, { action: "contact_submit" })
          .then(resolve)
          .catch(reject);
      });
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = process.env.REACT_APP_CONTACT_API_URL;
    const siteKey = process.env.REACT_APP_RECAPTCHA_SITE_KEY;

    if (!apiUrl) {
      alert("Contact form is not configured.");
      return;
    }

    if (!siteKey) {
      alert("reCAPTCHA site key is missing.");
      return;
    }

    if (form.honeypot !== "") {
      alert("Bot detected, submission blocked.");
      return;
    }

    if (!canSubmit) {
      alert(`Please wait ${timer} seconds before sending another message.`);
      return;
    }

    try {
      const recaptchaToken = await getRecaptchaToken(siteKey);
      const endpoint = `${apiUrl.replace(/\/$/, "")}/contact`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          subject: form.subject,
          message: form.message,
          honeypot: form.honeypot,
          recaptchaToken,
        }),
      });

      if (response.ok) {
        setShowModal(true);
        setForm({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          honeypot: "",
        });
        return;
      }

      if (response.status === 429) {
        setShowLimitModal(true);
        return;
      }

      const errorText = await response.text();
      if (
        errorText.toLowerCase().includes("limit") ||
        errorText.toLowerCase().includes("quota") ||
        errorText.toLowerCase().includes("reached")
      ) {
        setShowLimitModal(true);
      } else {
        alert("There was an error sending your message.");
        console.error(errorText);
      }
    } catch (error) {
      alert("There was an error sending your message.");
      console.error(error);
    }
  };

  return (
    <div>
      {/* Red Top Bar */}
      <div className="full-width-section therapy-header-section">
        <h2>Contact</h2>
        <p className="therapy-header-desc">
          Send a quick message and I’ll get back to you as soon as possible.
        </p>
      </div>

      {/* Contact Form */}
      <form className="contact-form" onSubmit={handleSubmit}>
        {/* Honeypot field - hidden from users */}
        <div style={{ position: "absolute", left: "-9999px", opacity: 0 }}>
          <label htmlFor="website">Website (leave blank)</label>
          <input
            type="text"
            name="honeypot"
            id="website"
            value={form.honeypot}
            onChange={handleChange}
            autoComplete="new-password"
          />
        </div>

        <label>
          Name <span className="required">(required)</span>
        </label>
        <div className="contact-row">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <label>
          Email Address <span className="required">(required)</span>
        </label>
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label>
          Phone Number <span className="required">(required)</span>
        </label>
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          required
        />

        <label>
          Subject <span className="required">(required)</span>
        </label>
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={form.subject}
          onChange={handleChange}
          required
        />

        <label>
          How Can I Help You? <span className="required">(required)</span>
        </label>
        <textarea
          name="message"
          placeholder="Type your message here..."
          value={form.message}
          onChange={handleChange}
          required
        />

        <button type="submit" className="contact-submit" disabled={!canSubmit}>
          {canSubmit ? "SUBMIT" : `Please wait ${timer}s`}
        </button>
      </form>

      {/* Success Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "2rem",
              borderRadius: "8px",
              maxWidth: "400px",
              textAlign: "center",
              boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
            }}
          >
            <p>
              Your message has been sent! Please allow 2-3 business days for a
              response.
            </p>
            <button
              onClick={() => setShowModal(false)}
              style={{
                marginTop: "1rem",
                padding: "0.5rem 1rem",
                cursor: "pointer",
                borderRadius: "4px",
                border: "none",
                backgroundColor: "#007bff",
                color: "white",
                fontWeight: "bold",
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Limit Reached Modal */}
      {showLimitModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "2rem",
              borderRadius: "8px",
              maxWidth: "400px",
              textAlign: "center",
              boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
            }}
          >
            <p>
              We apologize for the inconvenience, but our contact form is temporarily unavailable due to reaching our email limit.<br /><br />
              Please contact us directly at:
            </p>
            <a
              href="mailto:your@email.com"
              style={{
                color: "#d32f2f",
                fontWeight: "bold",
                fontSize: "1.1rem",
                display: "block",
                margin: "16px 0",
                wordBreak: "break-all"
              }}
            >
              your@email.com
            </a>
            <button
              onClick={() => setShowLimitModal(false)}
              style={{
                marginTop: "1rem",
                padding: "0.5rem 1rem",
                cursor: "pointer",
                borderRadius: "4px",
                border: "none",
                backgroundColor: "#007bff",
                color: "white",
                fontWeight: "bold",
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Contact;