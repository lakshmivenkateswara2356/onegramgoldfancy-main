import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import axios from "axios";

/* =====================================================
   CONTEXT
===================================================== */
const AdminContext = createContext();
export const useAdmin = () => useContext(AdminContext);

const API_URL = "https://onegramgoldfancy-main.onrender.com/api";

/* =====================================================
   PROVIDER
===================================================== */
const AdminProvider = ({ children }) => {
  /* ================= TOKEN ================= */
  const getToken = () => localStorage.getItem("adminToken");

  /* =====================================================
     PRODUCTS
  ===================================================== */
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  const fetchProducts = useCallback(async () => {
    try {
      setLoadingProducts(true);

      const res = await axios.get(`${API_URL}/products`);
      const data = Array.isArray(res.data) ? res.data : [];

      const formatted = data.map((p) => ({
        ...p,
        id: p.id || p._id,

        image:
          Array.isArray(p.images) && p.images.length > 0
            ? p.images[0]?.url
            : typeof p.image === "string"
            ? p.image
            : "https://via.placeholder.com/120",

        name: p.name || "Product",
      }));

      setProducts(formatted);
    } catch (err) {
      console.error("Admin fetch products error:", err);
    } finally {
      setLoadingProducts(false);
    }
  }, []);

  /* =====================================================
     BANNERS
  ===================================================== */
  const [banners, setBanners] = useState([]);
  const [loadingBanners, setLoadingBanners] = useState(false);

  const fetchBanners = useCallback(async () => {
    const token = getToken();
    if (!token) return;

    try {
      setLoadingBanners(true);

      const res = await fetch(`${API_URL}/banners`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok) throw new Error("Failed to fetch banners");

      setBanners(data?.banners || data || []);
    } catch (err) {
      console.error("Fetch banners error:", err);
    } finally {
      setLoadingBanners(false);
    }
  }, []);

  /* =====================================================
     ORDERS (✅ PRODUCT NAME & IMAGE FIX)
  ===================================================== */
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  const fetchOrders = useCallback(async () => {
    const token = getToken();
    if (!token) return;

    try {
      setLoadingOrders(true);

      const res = await fetch(`${API_URL}/orders/admin`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok) return;

      const ordersArray = Array.isArray(data) ? data : [];

      const formatted = ordersArray.map((o) => ({
        id: o.id || o._id,
        customer: o.customer_name || "Guest",
        phone: o.phone || "-",
        address: o.address || "-",
        grams: o.grams || 0,
        total: o.total_amount || 0,
        status: o.status?.toLowerCase() || "pending",
        createdAt: o.created_at,
        tracking_id: o.tracking_id || "",
        courier_name: o.courier_name || "",

        items: Array.isArray(o.items)
          ? o.items.map((item) => {
              /* ---------- PRODUCT RESOLUTION ---------- */

              // 1️⃣ populated product from backend
              const populated = item.product;

              // 2️⃣ fallback from products list
              const fallback = products.find(
                (p) =>
                  String(p.id) === String(item.product_id) ||
                  String(p._id) === String(item.product_id)
              );

              const product = populated || fallback || {};

              /* ---------- IMAGE RESOLUTION ---------- */
              const image =
                Array.isArray(product.images) && product.images.length > 0
                  ? product.images[0]?.url
                  : typeof product.image === "string"
                  ? product.image
                  : "https://via.placeholder.com/80";

              return {
                quantity: item.quantity || 1,
                name: product.name || "Product",
                image,
              };
            })
          : [],
      }));

      setOrders(formatted);
    } catch (err) {
      console.error("Fetch orders error:", err);
    } finally {
      setLoadingOrders(false);
    }
  }, [products]);

  /* =====================================================
     INITIAL LOAD (ORDER MATTERS)
  ===================================================== */
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if (products.length > 0) {
      fetchOrders();
    }
  }, [products, fetchOrders]);

  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  /* =====================================================
     CONTEXT VALUE
  ===================================================== */
  return (
    <AdminContext.Provider
      value={{
        products,
        loadingProducts,
        fetchProducts,
        setProducts,

        banners,
        loadingBanners,
        fetchBanners,
        setBanners,

        orders,
        loadingOrders,
        fetchOrders,
        setOrders,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;
