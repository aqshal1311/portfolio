import React, { useState, useEffect } from "react";
import { Share2, User, Mail, MessageSquare, Send } from "lucide-react";
import SocialLinks from "../components/SocialLinks";
import Komentar from "../components/Commentar";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // URL FormSubmit yang benar
  const formSubmitUrl = "https://formsubmit.co/ajax/aqshalhadi27@gmail.com";

  useEffect(() => {
    AOS.init({ once: false });
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    Swal.fire({
      title: "Mengirim Pesan...",
      html: "Mohon tunggu sebentar",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        _subject: "Pesan Baru Dari Portfolio",
        _template: "table",
        _captcha: "false",

        // redirect supaya GitHub Pages tidak error setelah submit
        _next: "https://aqshal1311.github.io/portfolio/#Contact",
      };

      const res = await axios.post(formSubmitUrl, payload, {
        headers: { "Content-Type": "application/json" },
      });

      if (res?.data?.success || res?.data?.status === "success") {
        Swal.fire({
          title: "Berhasil!",
          text: "Pesan Anda berhasil dikirim.",
          icon: "success",
          confirmButtonColor: "#6366f1",
          timer: 2000,
          timerProgressBar: true,
        });

        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error("Respon FormSubmit tidak valid");
      }
    } catch (error) {
      Swal.fire({
        title: "Gagal Mengirim!",
        text:
          "Kemungkinan Anda **belum aktivasi FormSubmit untuk domain GitHub Pages**. Cek Inbox/Spam Gmail Anda untuk email aktivasi FormSubmit.",
        icon: "error",
        confirmButtonColor: "#6366f1",
      });

      console.error("FormSubmit error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-[5%] sm:px-[5%] lg:px-[10%]">
      <div className="text-center lg:mt-[5%] mt-10 mb-2">
        <h2
          data-aos="fade-down"
          data-aos-duration="1000"
          className="inline-block text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]"
        >
          Hubungi Saya
        </h2>

        <p
          data-aos="fade-up"
          data-aos-duration="1100"
          className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2"
        >
          Punya pertanyaan? Kirimi saya pesan dan saya akan segera membalasnya.
        </p>
      </div>

      <div className="h-auto py-10 flex items-center justify-center">
        <div className="container grid grid-cols-1 lg:grid-cols-[45%_55%] gap-12">
          {/* ========== FORM KONTAK ========== */}
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-5 sm:p-10">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-4xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
                  Hubungi
                </h2>
                <p className="text-gray-400">
                  Ada yang ingin dibahas? Kirim pesan Anda.
                </p>
              </div>
              <Share2 className="w-10 h-10 text-[#6366f1] opacity-50" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* NAME */}
              <div className="relative group" data-aos="fade-up" data-aos-delay="100">
                <User className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  placeholder="Nama Anda"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  required
                  className="w-full p-4 pl-12 bg-white/10 rounded-xl border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30"
                />
              </div>

              {/* EMAIL */}
              <div className="relative group" data-aos="fade-up" data-aos-delay="200">
                <Mail className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Anda"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  required
                  className="w-full p-4 pl-12 bg-white/10 rounded-xl border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30"
                />
              </div>

              {/* MESSAGE */}
              <div className="relative group" data-aos="fade-up" data-aos-delay="300">
                <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                <textarea
                  name="message"
                  placeholder="Pesan Anda"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  required
                  className="w-full h-40 p-4 pl-12 bg-white/10 rounded-xl border border-white/20 text-white placeholder-gray-500 resize-none focus:ring-2 focus:ring-[#6366f1]/30"
                />
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white py-4 rounded-xl font-semibold hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <Send className="w-5 h-5" />
                {isSubmitting ? "Mengirim..." : "Kirim Pesan"}
              </button>
            </form>

            <div className="mt-10 pt-6 border-t border-white/10 flex justify-center space-x-6">
              <SocialLinks />
            </div>
          </div>

          {/* ========== KOMENTAR ========== */}
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-5 sm:p-10 shadow-2xl">
            <Komentar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
