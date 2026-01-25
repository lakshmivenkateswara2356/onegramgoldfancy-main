import { createContext, useContext, useEffect, useState, useCallback } from "react";

/* =====================================================
   CONTEXT
===================================================== */
const AdminContext = createContext();
export const useAdmin = () => useContext(AdminContext);

const API_URL = "http://localhost:5000/api";

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
    const token = getToken();
    if (!token) return;

    try {
      setLoadingProducts(true);

      const res = await fetch(`${API_URL}/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch products");

      const data = await res.json();

      const formatted = (Array.isArray(data) ? data : []).map((p) => {
        const price = Number(p.price) || 0;
        const oldPrice = p.old_price ? Number(p.old_price) : null;
        const discount =
          oldPrice && oldPrice > price
            ? Math.round(((oldPrice - price) / oldPrice) * 100)
            : 0;

        return {
          id: p.id,
          name: p.name,
          category: p.category || "Uncategorized",
          price,
          oldPrice,
          discount,
          stock: Number(p.stock) || 0,
          status: Number(p.stock) > 0 ? "Active" : "Inactive",
          image: p.image_url || "https://via.placeholder.com/120",
          createdAt: p.created_at,
        };
      });

      setProducts(formatted);
    } catch (err) {
      console.error("Fetch products error:", err);
    } finally {
      setLoadingProducts(false);
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

      const formatted = (Array.isArray(data) ? data : data.orders || []).map(
        (o) => ({
          id: o.id,
          customer: o.customer_name || "Guest",
          phone: o.phone || "-",
          address: o.address || "-",
          grams: o.grams || 0,
          total: o.total_amount || 0,
          status: o.status?.toLowerCase() || "pending",
          createdAt: o.created_at,
          trackingId: o.tracking_id || "",
          courierName: o.courier_name || "",
        })
      );

      setOrders(formatted);
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
    fetchOrders();
  }, [fetchProducts, fetchOrders]);

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
