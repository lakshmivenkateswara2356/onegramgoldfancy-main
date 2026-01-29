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
  const getToken = () => localStorage.getItem("token");

  /* =====================================================
     PRODUCTS
  ===================================================== */
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  const fetchProducts = useCallback(async () => {
    try {
      setLoadingProducts(true);

      const res = await axios.get(`${API_URL}/products`);

      const formatted = res.data.map((p) => ({
        ...p,
        image:
          Array.isArray(p.images) && p.images.length > 0
            ? p.images[0]
            : "https://via.placeholder.com/120",
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

      if (!res.ok) throw new Error("Failed to fetch banners");

      const data = await res.json();
      setBanners(data.banners || data || []);
    } catch (err) {
      console.error("Fetch banners error:", err);
    } finally {
      setLoadingBanners(false);
    }
  }, []);

  /* =====================================================
     ORDERS
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

      const ordersArray = Array.isArray(data) ? data : data.orders || [];

      setOrders(
        ordersArray.map((o) => ({
          id: o.id,
          customer: o.customer_name || "Guest",
          phone: o.phone || "-",
          address: o.address || "-",
          grams: o.grams || 0,
          total: o.total_amount || 0,
          status: o.status?.toLowerCase() || "pending",
          createdAt: o.created_at || new Date().toISOString(),
          trackingId: o.tracking_id || "",
          courierName: o.courier_name || "",
        }))
      );
    } catch (err) {
      console.error("Fetch orders error:", err);
    } finally {
      setLoadingOrders(false);
    }
  }, []);

  /* =====================================================
     INITIAL LOAD
  ===================================================== */
  useEffect(() => {
    fetchProducts();
    fetchBanners();
    fetchOrders();
  }, [fetchProducts, fetchBanners, fetchOrders]);

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
