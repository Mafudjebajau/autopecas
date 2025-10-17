import React from "react";
import { FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { FaBarsStaggered } from "react-icons/fa6";

const AnimatedToggler = ({ isMenuOpen, setIsMenuOpen, colors }) => {
  return (
    <button
      className="navbar-toggler custom-toggler"
      type="button"
      aria-label="Toggle navigation"
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      style={{
        border: "none",
        background: "transparent",
        boxShadow: "none",
        outline: "none",
        cursor: "pointer",
      }}
      onFocus={(e) => {
        e.target.style.outline = "none";
        e.target.style.boxShadow = "none";
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {!isMenuOpen ? (
          <motion.div
            key="hamburger"
            className="d-flex flex-column align-items-center gap-1"
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
           <FaBarsStaggered className="text-light" />
          </motion.div>
        ) : (
          <motion.div
            key="close"
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <FaTimes className="text-danger" size={20} />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};

export default AnimatedToggler;
