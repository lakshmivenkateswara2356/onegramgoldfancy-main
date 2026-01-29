import React, { useEffect, useState } from "react";
import {
  getAllProducts,
  addProductAPI,
  updateProductAPI,
  deleteProductAPI,
} from "../services/product.service";
import { Pencil, Trash2 } from "lucide-react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  const initialForm = {
    name: "",
    category: "",
    price: "",
    oldPrice: "",
    stock: "",
    images: [null, null, null, null, null], // store 5 files
  };

  const [form, setForm] = useState(initialForm);

  /* ---------------- FETCH PRODUCTS ---------------- */
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getAllProducts();

      const formatted = data.map((p) => {
        const priceNum = Number(p.price) || 0;
        const oldPriceNum = p.old_price ? Number(p.old_price) : null;
        const discount =
          oldPriceNum && oldPriceNum > priceNum
            ? Math.round(((oldPriceNum - priceNum) / oldPriceNum) * 100)
            : 0;

        return {
          id: p.id,
          name: p.name,
          category: p.category,
          price: priceNum,
          oldPrice: oldPriceNum,
          discount,
          stock: Number(p.stock) || 0,
          status: Number(p.stock) > 0 ? "Active" : "Inactive",
          images: p.images?.length ? p.images : [p.image_url || "https://via.placeholder.com/120"],
        };
      });

      setProducts(formatted);
    } catch (err) {
      console.error("Fetch products failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  /* ---------------- FORM HANDLERS ---------------- */
  const handleChange = (e, index = null) => {
    const { name, value, files } = e.target;

    if (name === "images" && index !== null) {
      const newImages = [...form.images];
      newImages[index] = files[0] || null;
      setForm((prev) => ({ ...prev, images: newImages }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
  };

  /* ---------------- ADD / UPDATE ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("category", form.category);
      formData.append("price", form.price);
      formData.append("old_price", form.oldPrice || "");
      formData.append("stock", form.stock);

      form.images.forEach((img) => {
        if (img) formData.append("images", img); // key must match backend
      });

      if (editingId) {
        await updateProductAPI(editingId, formData);
      } else {
        await addProductAPI(formData);
      }

      resetForm();
      fetchProducts();
    } catch (err) {
      console.error("Save product failed", err);
    }
  };

  /* ---------------- EDIT / DELETE ---------------- */
  const handleEdit = (product) => {
    setEditingId(product.id);
    const imagesArray = [null, null, null, null, null];
    if (product.images && product.images.length) {
      product.images.forEach((img, i) => (imagesArray[i] = img));
    }
    setForm({
      name: product.name,
      category: product.category,
      price: product.price,
      oldPrice: product.oldPrice || "",
      stock: product.stock,
      images: imagesArray,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await deleteProductAPI(id);
      fetchProducts();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Products</h2>

      {/* ADD / EDIT FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl border p-6 space-y-4"
      >
        <h3 className="text-lg font-semibold">
          {editingId ? "Edit Product" : "Add Product"}
        </h3>

        <div className="grid md:grid-cols-3 gap-4">
          <input
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2"
            required
          />
          <input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Selling Price"
            value={form.price}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2"
            required
          />
          <input
            type="number"
            name="oldPrice"
            placeholder="Old Price (optional)"
            value={form.oldPrice}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2"
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={form.stock}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2"
            required
          />

          {/* 5 IMAGE INPUTS */}
          {form.images.map((img, index) => (
            <input
              key={index}
              type="file"
              name="images"
              onChange={(e) => handleChange(e, index)}
              className="border rounded-lg px-3 py-2"
              accept="image/*"
            />
          ))}
        </div>

        {/* IMAGE PREVIEW */}
        <div className="flex gap-2 mt-2">
          {form.images.map((img, i) =>
            img ? (
              <img
                key={i}
                src={typeof img === "string" ? img : URL.createObjectURL(img)}
                alt="preview"
                className="w-24 h-24 object-cover rounded"
              />
            ) : null
          )}
        </div>

        <div className="flex gap-3">
          <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg">
            {editingId ? "Update Product" : "Add Product"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-2 border rounded-lg"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* PRODUCTS TABLE */}
      <div className="bg-white rounded-xl border overflow-hidden">
        {loading ? (
          <p className="p-6">Loading...</p>
        ) : (
          <table className="w-full table-auto text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">Product</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Old Price</th>
                <th className="px-4 py-3">Discount</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="px-4 py-3 flex items-center gap-3">
                    <img
                      src={p.images?.[0] || p.image}
                      alt={p.name}
                      className="w-14 h-14 rounded border object-cover"
                    />
                    {p.name}
                  </td>
                  <td className="px-4 py-3">{p.category}</td>
                  <td className="px-4 py-3">₹{p.price}</td>
                  <td className="px-4 py-3 line-through text-gray-400">
                    {p.oldPrice ? `₹${p.oldPrice}` : "-"}
                  </td>
                  <td className="px-4 py-3 text-green-600">
                    {p.discount > 0 ? `${p.discount}% OFF` : "-"}
                  </td>
                  <td className="px-4 py-3">{p.stock}</td>
                  <td className="px-4 py-3 font-semibold">{p.status}</td>
                  <td className="px-4 py-3 flex justify-center gap-3">
                    <button onClick={() => handleEdit(p)}>
                      <Pencil size={18} />
                    </button>
                    <button onClick={() => handleDelete(p.id)}>
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Products;
