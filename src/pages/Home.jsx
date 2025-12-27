// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>DML Tech Support</h1>
        <p style={styles.subtitle}>Professional Technical Assistance & IT Solutions</p>
      </header>

      <main style={styles.main}>
        <p>Welcome! You can contact our support team or upload your files securely.</p>
        <div style={styles.buttons}>
          <Link to="/contact" style={styles.button}>Contact Support</Link>
        </div>
      </main>

      <footer style={styles.footer}>
        &copy; 2025 DML Tech Support. All rights reserved.
      </footer>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    background: "linear-gradient(180deg, #060616 0%, #0f0f1a 100%)",
    color: "#f8f9fa",
    padding: "2rem"
  },
  header: {
    textAlign: "center",
    marginBottom: "2rem"
  },
  title: {
    fontSize: "2rem",
    fontWeight: "700",
    background: "linear-gradient(90deg, #0066ff, #00d4ff)",
    WebkitBackgroundClip: "text",
    color: "transparent"
  },
  subtitle: {
    fontSize: "1rem",
    color: "#6c757d"
  },
  main: {
    textAlign: "center"
  },
  buttons: {
    marginTop: "1.5rem"
  },
  button: {
    padding: "0.75rem 1.5rem",
    background: "linear-gradient(90deg, #0066ff, #0052cc)",
    color: "#fff",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "600"
  },
  footer: {
    textAlign: "center",
    fontSize: "0.9rem",
    color: "#6c757d",
    marginTop: "2rem"
  }
};
