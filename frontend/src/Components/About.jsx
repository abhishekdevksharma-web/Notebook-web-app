import React from "react";
import { motion } from "framer-motion";
import { BookOpen, PenTool, Star } from "lucide-react";

const About = () => {
  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#7e22ce]">Notebook App</h1>
          <nav className="space-x-6">
            <a href="/" className="text-gray-600 hover:text-[#7e22ce] transition">
              Home
            </a>
            <a
              href="/about"
              className="text-[#7e22ce] font-medium border-b-2 border-[#7e22ce]"
            >
              About
            </a>
            <a href="/contact" className="text-gray-600 hover:text-[#7e22ce] transition">
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-[#7e22ce] text-white py-20 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl font-bold mb-4"
        >
          About Notebook App
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg max-w-2xl mx-auto"
        >
          Simplify your note-taking experience with elegance and efficiency.
        </motion.p>
      </section>

      {/* About Content */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-semibold text-[#7e22ce] mb-4">Who We Are</h3>
          <p className="text-gray-700 leading-relaxed">
            Notebook App is your digital companion for capturing thoughts, organizing
            tasks, and storing ideas beautifully. Whether you’re a student, developer, or
            creative mind, Notebook keeps your notes accessible, clean, and secure.
          </p>
        </motion.div>

        <motion.img
          src="https://cdn-icons-png.flaticon.com/512/2921/2921222.png"
          alt="Notebook Illustration"
          className="w-80 mx-auto rounded-xl shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        />
      </section>

      {/* Mission Section */}
      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto text-center px-6">
          <h3 className="text-3xl font-semibold text-[#7e22ce] mb-6">Our Mission</h3>
          <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Our mission is to simplify digital note-taking while keeping it beautifully
            minimal. We help you focus on your thoughts instead of distractions — so you
            can write more, think better, and stay productive everywhere you go.
          </p>

          {/* Features */}
          <div className="mt-12 grid sm:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-100 rounded-2xl shadow hover:shadow-lg transition">
              <BookOpen className="mx-auto text-[#7e22ce] w-10 h-10 mb-3" />
              <h4 className="font-semibold text-lg">Organized Notes</h4>
              <p className="text-gray-600 text-sm mt-2">
                Keep all your notes neatly structured and easy to find.
              </p>
            </div>

            <div className="p-6 bg-gray-100 rounded-2xl shadow hover:shadow-lg transition">
              <PenTool className="mx-auto text-[#7e22ce] w-10 h-10 mb-3" />
              <h4 className="font-semibold text-lg">Smooth Writing</h4>
              <p className="text-gray-600 text-sm mt-2">
                Enjoy a clean interface that makes note-taking effortless.
              </p>
            </div>

            <div className="p-6 bg-gray-100 rounded-2xl shadow hover:shadow-lg transition">
              <Star className="mx-auto text-[#7e22ce] w-10 h-10 mb-3" />
              <h4 className="font-semibold text-lg">Minimal Design</h4>
              <p className="text-gray-600 text-sm mt-2">
                Focus on what matters with our simple and elegant layout.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#7e22ce] text-white text-center py-6">
        <p className="text-sm">© 2025 Notebook App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default About;
