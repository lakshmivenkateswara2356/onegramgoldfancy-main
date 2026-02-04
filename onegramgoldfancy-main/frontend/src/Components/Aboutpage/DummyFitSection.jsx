import { motion } from "framer-motion";
import dummyImg from "../../Assets/dummy.webp";
import earringsImg from "../../Assets/nuckles.jpg";
import necklaceImg from "../../Assets/goldchains.jpg";

const DummyFitSection = () => {
  return (
    <section className="relative h-screen bg-yellow-50 flex items-center justify-center">
      {/* Dummy */}
      <img src={dummyImg} alt="dummy" className="w-64 md:w-96" />

      {/* Earrings */}
      <motion.img
        src={earringsImg}
        initial={{ x: -200, opacity: 0 }}
        whileInView={{ x: -20, opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute top-28 left-1/2 md:left-[45%] w-12 md:w-16"
      />

      {/* Necklace */}
      <motion.img
        src={necklaceImg}
        initial={{ y: 200, opacity: 0 }}
        whileInView={{ y: 20, opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute top-48 md:top-56 left-1/2 transform -translate-x-1/2 w-32 md:w-48"
      />
    </section>
  );
};


export default DummyFitSection;