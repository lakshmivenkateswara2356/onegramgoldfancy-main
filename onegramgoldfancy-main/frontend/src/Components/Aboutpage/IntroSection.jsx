import { motion } from "framer-motion";

const IntroSection = () => {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center bg-gradient-to-b from-yellow-50 to-white">
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl md:text-6xl font-bold text-yellow-700 text-center"
      >
        Premium One Gram Gold Jewelry
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="mt-6 text-center text-gray-600 max-w-xl"
      >
        Crafted with heritage, passion, and excellence. Experience jewelry
        that moves with you.
      </motion.p>
    </section>
  );
};

export default IntroSection;
