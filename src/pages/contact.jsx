// src/pages/Contact.jsx
import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setStatus("Uploading...");

      let fileUrl = null;
      if (file) {
        const fileName = `${Date.now()}_${file.name}`;
        const { data, error } = await supabase.storage
          .from("uploads")
          .upload(fileName, file);

        if (error) throw error;
        fileUrl = data.path;
      }

      const { error } = await supabase.from("contacts").insert([
        {
          name,
          email,
          message,
          file_url: fileUrl
        }
      ]);

      if (error) throw error;

      setStatus("Message sent successfully!");
      setName("");
      setEmail("");
      setMessage("");
      setFile(null);
    } catch (err) {
      console.error(err);
      setStatus("Error sending message.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Contact Support</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />
        <textarea
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={styles.textarea}
          required
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Send Message
        </button>
      </form>
      {status && <p style={styles.status}>{status}</p>}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "500px",
    margin: "2rem auto",
    padding: "2rem",
    background: "#111",
    borderRadius: "12px",
    color: "#fff",
    textAlign: "center"
  },
  title: {
    fontSize: "1.75rem",
    marginBottom: "1rem"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem"
  },
  input: {
    padding: "0.75rem",
    borderRadius: "8px",
    border: "1px solid #444",
    background: "#222",
    color: "#fff"
  },
  textarea: {
    padding: "0.75rem",
    borderRadius: "8px",
    border: "1px solid #444",
    background: "#222",
    color: "#fff",
    minHeight: "100px"
  },
  button: {
    padding: "0.75rem",
    borderRadius: "8px",
    border: "none",
    background: "#0066ff",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer"
  },
  status: {
    marginTop: "1rem",
    fontStyle: "italic"
  }
};
