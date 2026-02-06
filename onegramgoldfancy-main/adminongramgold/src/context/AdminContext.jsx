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
     ORDERS (✅ FIXED PRODUCT NAME & IMAGE)
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
              /* ===============================
                 ✅ CORRECT PRODUCT RESOLUTION
              =============================== */

              // 1️⃣ Use ordered product data FIRST
              const directName = item.name;
              const directImage =
                item.image ||
                (Array.isArray(item.images) && item.images[0]?.url);

              // 2️⃣ Populated product (if backend populated)
              const populated = item.product || {};

              // 3️⃣ Fallback from products list
              const fallback =
                products.find(
                  (p) =>
                    String(p.id) === String(item.product_id) ||
                    String(p._id) === String(item.product_id)
                ) || {};

              const name =
                directName ||
                populated.name ||
                fallback.name ||
                "Product";

              const image =
                directImage ||
                (Array.isArray(populated.images) &&
                  populated.images[0]?.url) ||
                populated.image ||
                fallback.image ||
                "https://via.placeholder.com/80";

              return {
                quantity: item.quantity || 1,
                name,
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


  const customers = Array.from(
    new Map(
      orders
        .filter((o) => o.phone) // unique by phone
        .map((o) => [
          o.phone,
          {
            name: o.customer,
            phone: o.phone,
            address: o.address,
          },
        ])
    ).values()
  );

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
        customers,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;
