import ParticlesBackground from "../components/ParticlesBackground";
import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import Astra from "../assets/astra.png";

const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    budget: "",
    idea: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "budget" && value && !/^\d*$/.test(value)) return;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name required";
    if (!formData.email.trim()) newErrors.email = "Email required";
    if (!formData.service.trim()) newErrors.service = "Select service";
    if (!formData.budget.trim()) newErrors.budget = "Budget required";
    if (!formData.idea.trim()) newErrors.idea = "Idea required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus("sending");

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          ...formData,
          from_name: formData.name,
          reply_to: formData.email,
        },
        PUBLIC_KEY,
      );

      setStatus("success");

      setFormData({
        name: "",
        email: "",
        service: "",
        budget: "",
        idea: "",
      });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="w-full min-h-screen relative bg-black text-white py-20 px-6 md:px-20 flex flex-col md:flex-row items-center gap-10"
    >
      <ParticlesBackground />

      <div className="relative z-10 w-full flex flex-col md:flex-row items-center gap-10">
        {/* LEFT IMAGE */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.img
            src={Astra}
            alt="Contact"
            className="w-72 md:w-96 rounded-2xl shadow-lg object-cover"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        {/* RIGHT FORM */}
        <motion.div
          className="w-full md:w-1/2 bg-white/5 p-8 rounded-2xl shadow-lg border border-white/10"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-6">Let's Work Together</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* NAME */}
            <div>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className={`p-3 w-full rounded-md bg-white/10 border ${
                  errors.name ? "border-red-500" : "border-gray-500"
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            {/* EMAIL */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className={`p-3 w-full rounded-md bg-white/10 border ${
                  errors.email ? "border-red-500" : "border-gray-500"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* SERVICE */}
            <div>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className={`p-3 w-full rounded-md bg-white/10 border ${
                  errors.service ? "border-red-500" : "border-gray-500"
                }`}
              >
                <option value="">Select Service</option>
                <option value="Web Development">Web Development</option>
                <option value="Mobile Application">Mobile Application</option>
                <option value="Other">Other</option>
              </select>
              {errors.service && (
                <p className="text-red-500 text-xs mt-1">{errors.service}</p>
              )}
            </div>

            {/* BUDGET */}
            <div>
              <input
                type="text"
                name="budget"
                placeholder="Your Budget"
                value={formData.budget}
                onChange={handleChange}
                className={`p-3 w-full rounded-md bg-white/10 border ${
                  errors.budget ? "border-red-500" : "border-gray-500"
                }`}
              />
              {errors.budget && (
                <p className="text-red-500 text-xs mt-1">{errors.budget}</p>
              )}
            </div>

            {/* IDEA */}
            <div>
              <textarea
                name="idea"
                rows={4}
                placeholder="Explain Your Idea"
                value={formData.idea}
                onChange={handleChange}
                className={`p-3 w-full rounded-md bg-white/10 border ${
                  errors.idea ? "border-red-500" : "border-gray-500"
                }`}
              />
              {errors.idea && (
                <p className="text-red-500 text-xs mt-1">{errors.idea}</p>
              )}
            </div>

            {/* STATUS MESSAGE */}
            {status && (
              <p
                className={`text-sm ${
                  status === "success"
                    ? "text-green-400"
                    : status === "error"
                      ? "text-red-400"
                      : "text-yellow-400"
                }`}
              >
                {status === "sending"
                  ? "Sending..."
                  : status === "success"
                    ? "Message sent successfully ✅"
                    : "Something went wrong ❌"}
              </p>
            )}

            {/* SUBMIT BUTTON */}
            <motion.button
              type="submit"
              disabled={status === "sending"}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white py-3 rounded-md font-semibold transition"
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
