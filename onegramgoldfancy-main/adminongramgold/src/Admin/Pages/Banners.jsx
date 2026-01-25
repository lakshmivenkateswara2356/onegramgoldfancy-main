import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";

const API_URL = "http://localhost:5000/api/banners";

const Banners = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef(null);

  const [form, setForm] = useState({
    title: "",
    paragraph: "",
    buttonText: "",
    imageFile: null,
  });

  /* ================= FETCH ================= */
  const fetchBanners = async () => {
    try {
      const res = await axios.get(API_URL);
      setBanners(res.data || []);
    } catch (err) {
      console.error("Fetch banners error:", err);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  /* ================= FORM ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleFileChange = (e) => {
    setForm((p) => ({ ...p, imageFile: e.target.files[0] }));
  };

  /* ================= ADD ================= */
  const handleAddBanner = async (e) => {
    e.preventDefault();

    if (!form.imageFile) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("paragraph", form.paragraph);
    formData.append("button_text", form.buttonText);
    formData.append("image", form.imageFile);

    try {
      setLoading(true);

      await axios.post(API_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Reset form
      setForm({
        title: "",
        paragraph: "",
        buttonText: "",
        imageFile: null,
      });

      if (fileRef.current) fileRef.current.value = "";

      fetchBanners();
    } catch (err) {
      console.error("Add banner error:", err);
      alert("Failed to upload banner");
    } finally {
      setLoading(false);
    }
  };

  /* ================= ACTIONS ================= */
  const toggleStatus = async (id) => {
    try {
      await axios.put(`${API_URL}/${id}`);
      fetchBanners();
    } catch (err) {
      console.error("Toggle status error:", err);
    }
  };

  const deleteBanner = async (id) => {
    if (!window.confirm("Delete this banner?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchBanners();
    } catch (err) {
      console.error("Delete banner error:", err);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Banners</h2>

      {/* ============ ADD FORM ============ */}
      <form
        onSubmit={handleAddBanner}
        className="bg-white rounded-xl border p-6 space-y-4"
      >
        <h3 className="text-lg font-semibold">Add New Banner</h3>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            name="title"
            placeholder="Banner Title"
            value={form.title}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2"
            required
          />

          <input
            name="buttonText"
            placeholder="Button Text"
            value={form.buttonText}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2"
            required
          />

          <input
            name="paragraph"
            placeholder="Short Description"
            value={form.paragraph}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2 md:col-span-2"
            required
          />

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border rounded-lg px-3 py-2 md:col-span-2"
            required
          />
        </div>

        <button
          disabled={loading}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-60"
        >
          {loading ? "Adding..." : "Add Banner"}
        </button>
      </form>

      {/* ============ TABLE ============ */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full table-auto">
          <thead className="bg-gray-50 text-sm text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left">Banner</th>
              <th className="px-4 py-3">Button</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="text-sm">
            {banners.map((banner) => (
              <tr key={banner.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 flex items-center gap-4">
                  <img
                    src={banner.image} // ✅ CLOUDINARY URL
                    alt={banner.title}
                    className="w-24 h-14 rounded-lg object-cover border"
                  />
                  <div>
                    <p className="font-medium">{banner.title}</p>
                    <p className="text-xs text-gray-500 line-clamp-1">
                      {banner.paragraph}
                    </p>
                  </div>
                </td>

                <td className="px-4 py-3">
                  <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold">
                    {banner.button_text}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={banner.active === true}
                      onChange={() => toggleStatus(banner.id)}
                    />
                    <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-green-500 transition"></div>
                    <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-5"></span>
                  </label>
                </td>

                <td className="px-4 py-3 flex justify-center">
                  <button
                    onClick={() => deleteBanner(banner.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {banners.length === 0 && (
          <p className="p-6 text-center text-gray-500">
            No banners added yet
          </p>
        )}
      </div>
    </div>
  );
};

export default Banners;
