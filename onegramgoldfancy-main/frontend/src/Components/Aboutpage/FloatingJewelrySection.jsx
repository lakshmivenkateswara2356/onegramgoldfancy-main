import { motion, useScroll, useTransform } from "framer-motion";
import ringImg from "../../Assets/ss.jpg";
import earringImg from "../../Assets/dvdf.jpg";

const FloatingJewelrySection = () => {
  const { scrollYProgress } = useScroll();
  const xRing = useTransform(scrollYProgress, [0, 1], ["-100px", "100px"]);
  const yEarring = useTransform(scrollYProgress, [0, 1], ["50px", "-50px"]);

  return (
    <section className="relative h-[80vh] bg-white overflow-hidden">
      <motion.img
        src={ringImg}
        style={{ x: xRing }}
        className="absolute top-20 left-10 w-32 md:w-48"
      />
      <motion.img
        src={earringImg}
        style={{ y: yEarring }}
        className="absolute bottom-10 right-10 w-20 md:w-32"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <h2 className="text-3xl md:text-5xl font-semibold text-gray-800">
          Crafting Jewelry That Moves With You
        </h2>
      </div>
    </section>
  );
};

export default FloatingJewelrySection;