import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    file: null
  });

  const [status, setStatus] = useState({ loading: false, message: "" });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, message: "" });

    try {
      let fileUrl = null;

      if (formData.file) {
        const fileExt = formData.file.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from("uploads")
          .upload(fileName, formData.file);

        if (uploadError) throw uploadError;

        fileUrl = `https://iocpwvxoovybakjrahkd.supabase.co/storage/v1/object/public/uploads/${fileName}`;
      }

      const { error } = await supabase.from("contacts").insert([
        {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          message: formData.message,
          file_url: fileUrl
        }
      ]);

      if (error) throw error;

      setStatus({ loading: false, message: "Message sent successfully!" });
      setFormData({ name: "", phone: "", email: "", message: "", file: null });
    } catch (err) {
      setStatus({ loading: false, message: `Error: ${err.message}` });
    }
  };

  return (
    <div className="container">
      <h1>Contact Support</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <textarea
          name="message"
          placeholder="Your message"
          value={formData.message}
          onChange={handleChange}
          required
        />
        <input type="file" name="file" onChange={handleChange} />
        <button type="submit" disabled={status.loading}>
          {status.loading ? "Sending..." : "Send Message"}
        </button>
      </form>
      {status.message && <p>{status.message}</p>}
    </div>
  );
}
