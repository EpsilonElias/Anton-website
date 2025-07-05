import React, { useState } from "react";
import emailjs from "emailjs-com";
function Contact() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

   const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.send(
      "service_nxvqdjq",      // Replace with your EmailJS Service ID
      "template_ab3e7z9",     // Replace with your EmailJS Template ID
      {
        from_name: `${form.firstName} ${form.lastName}`,
        from_email: form.email,
        phone: form.phone,
        subject: form.subject,
        message: form.message,
      },
      "3wc-rAYpNdDDxJeYN"          // Replace with your EmailJS User/Public Key
    )
    .then(
      (result) => {
        alert("Your message has been sent!");
        setForm({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      },
      (error) => {
        alert("There was an error sending your message.");
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

        <button type="submit" className="contact-submit">
          SUBMIT
        </button>
      </form>
    </div>
  );
}

export default Contact;