import { useContext, useMemo, useState } from "react";
import { AppContext } from "../context/AppContext";
import Navbar from "../Components/Navbar";
import ProductCard from "../Pages/ProductCard";
import { Search } from "lucide-react";
import Footernavigations from "../Footernavigations";

const AllProducts = () => {
  const { products, loadingProducts } = useContext(AppContext);
  const [search, setSearch] = useState("");

  const allProducts = useMemo(() => {
    return Object.values(products || {}).flat();
  }, [products]);

  const filteredProducts = useMemo(() => {
    return allProducts.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [allProducts, search]);

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      <Navbar />

      <div className="pt-[75px] px-4 max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            All Jewellery
          </h1>
          <p className="text-sm text-gray-500">
            Explore our complete collection
          </p>
        </div>

        {/* SEARCH */}
        <div className="relative mb-6 max-w-sm">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search jewellery..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-1 focus:ring-yellow-400"
          />
        </div>

        {/* LOADING */}
        {loadingProducts && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-56 bg-gray-100 rounded-xl animate-pulse"
              />
            ))}
          </div>
        )}

        {/* PRODUCTS */}
        {!loadingProducts && filteredProducts.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* EMPTY */}
        {!loadingProducts && filteredProducts.length === 0 && (
          <p className="text-center text-gray-500 py-10">
            No products found
          </p>
        )}
      </div>

      <Footernavigations />
    </div>
  );
};

export default AllProducts;
