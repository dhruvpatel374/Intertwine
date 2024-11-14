import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    let valid = true;

    if (formData.name.length === 0) {
      newErrors.name = "Name is required.";
      valid = false;
    }
    if (formData.email.length === 0) {
      newErrors.email = "Email is required.";
      valid = false;
    } else if (!formData.email.includes("@") || !formData.email.includes(".")) {
      newErrors.email = "Please enter a valid email.";
      valid = false;
    }
    if (formData.message.length === 0) {
      newErrors.message = "Message is required.";
      valid = false;
    } else if (formData.message.length <= 10) {
      newErrors.message = "Message Should be minumum 10 letters.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setFormData({ name: "", email: "", message: "" });
      toast.success("Form submitted successfully!");
    }
  };

  return (
    <>
      <Toaster />
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-4">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Contact Us Form
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">{errors.name}</span>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email:</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email}</span>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Message:</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                errors.message ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.message && (
              <span className="text-red-500 text-sm">{errors.message}</span>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-orange-400 text-white p-2 rounded hover:bg-orange-500 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default ContactUs;
