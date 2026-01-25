const AddProduct = () => {
  return (
    <div className="max-w-xl bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Add Product</h2>

      <input
        type="text"
        placeholder="Product Name"
        className="w-full border p-2 rounded mb-3"
      />

      <input
        type="number"
        placeholder="Price"
        className="w-full border p-2 rounded mb-3"
      />

      <input
        type="text"
        placeholder="Image URL"
        className="w-full border p-2 rounded mb-3"
      />

      <button className="bg-yellow-500 px-4 py-2 rounded font-semibold">
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;
