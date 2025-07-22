import React, { useState, useEffect, useRef } from "react";
import emailjs from "emailjs-com";

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.honeypot !== "") {
      alert("Bot detected, submission blocked.");
      return;
    }

    if (!canSubmit) {
      alert(`Please wait ${timer} seconds before sending another message.`);
      return;
    }

    emailjs.send(
      process.env.REACT_APP_EMAILJS_SERVICE_ID,
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
      {
        first_name: form.firstName,
        last_name: form.lastName,
        email: form.email,
        phone: form.phone,
        subject: form.subject,
        message: form.message,
        time: new Date().toLocaleString(),
      },
      process.env.REACT_APP_EMAILJS_PUBLIC_KEY
    )
      .then(
        () => {
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
          //setTimer(60); // Reset timer to 30 seconds
        },
        (error) => {
          // Check for EmailJS limit error
          if (
            error?.text?.toLowerCase().includes("limit") ||
            error?.text?.toLowerCase().includes("quota") ||
            error?.text?.toLowerCase().includes("reached")
          ) {
            setShowLimitModal(true);
          } else {
            alert("There was an error sending your message.");
            console.error(error);
          }
        }
      );
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