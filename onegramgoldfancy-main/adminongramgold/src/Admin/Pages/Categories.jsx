import { useAdmin } from "../../context/AdminContext";

// Helper components
const Section = ({ title, children }) => (
  <div className="bg-white p-6 rounded shadow mb-6">
    <h2 className="text-lg font-semibold mb-4">{title}</h2>
    <div className="space-y-2">{children}</div>
  </div>
);

const Item = ({ text }) => (
  <div className="p-2 border rounded text-gray-700 hover:bg-gray-50">{text}</div>
);

const Categories = () => {
  const { categories } = useAdmin();

  return (
    <Section title="Categories">
      {categories.map((c) => (
        <Item key={c} text={c} />
      ))}
    </Section>
  );
};

export default Categories;
