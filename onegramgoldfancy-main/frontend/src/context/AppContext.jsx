import { createContext, useEffect, useState, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import goldring from "../Assets/rings.webp";
import chain from "../Assets/goldchains.jpg";
import pendent from "../Assets/pendent.jpg";
import WelcomeModal from "../Pages/WelcomeModal"; // ✅ Import WelcomeModal

export const AppContext = createContext(null);

const AppProvider = ({ children }) => {
  /* ------------------ UI ------------------ */
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /* ------------------ USER ------------------ */
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  // ✅ Welcome modal state
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));

      // ✅ Show welcome modal on first login
      const isFirstLogin = !localStorage.getItem("welcomeShown");
      if (isFirstLogin) {
        setShowWelcomeModal(true);
        localStorage.setItem("welcomeShown", "true");
      }
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("welcomeShown"); // reset on logout
    }
  }, [user]);

  /* ------------------ GUEST ------------------ */
  const [guest, setGuest] = useState(() => {
    const saved = localStorage.getItem("guest");
    return saved ? JSON.parse(saved) : { name: "", phone: "", address: "" };
  });

  const updateGuest = (data) => {
    setGuest((prev) => ({ ...prev, ...data }));
  };

  useEffect(() => {
    localStorage.setItem("guest", JSON.stringify(guest));
  }, [guest]);

  /* ------------------ CART ------------------ */
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === product.id);
      if (exists) {
        toast.success("Quantity updated in cart 🛒");
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      toast.success("Item added to cart 🛒");
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) =>
    setCart((prev) => prev.filter((i) => i.id !== id));

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  /* ------------------ WISHLIST (Postgres) ------------------ */
  const [wishlist, setWishlist] = useState([]);
  const API = "https://onegramgoldfancy-main.onrender.com/api";

  const fetchWishlist = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token || !user) return;

    try {
      const res = await axios.get(`${API}/wishlist`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const ids = Array.isArray(res.data) ? res.data : [];
      setWishlist(ids);
    } catch (err) {
      console.error("Failed to fetch wishlist:", err);
      toast.error("Failed to fetch wishlist");
    }
  }, [API, user]);

  const toggleWishlist = async (productId) => {
    const token = localStorage.getItem("token");
    if (!token || !user) {
      toast.error("Please login to manage favorites ❤️");
      return;
    }

    try {
      if (wishlist.includes(productId)) {
        await axios.delete(`${API}/wishlist/${productId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWishlist((prev) => prev.filter((id) => id !== productId));
        toast.success("Removed from favorites ❤️");
      } else {
        await axios.post(
          `${API}/wishlist/${productId}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setWishlist((prev) => [...prev, productId]);
        toast.success("Added to favorites ❤️");
      }
    } catch (err) {
      console.error("Wishlist update failed:", err);
      toast.error("Failed to update favorites");
    }
  };

  useEffect(() => {
    if (user) fetchWishlist();
    else setWishlist([]);
  }, [user, fetchWishlist]);

  /* ------------------ PRODUCTS ------------------ */
  const [products, setProducts] = useState({});
  const [loadingProducts, setLoadingProducts] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoadingProducts(true);
      const res = await axios.get(`${API}/products`);
      const data = res.data || [];

      const grouped = data.reduce((acc, product) => {
        const cat = product.category?.toLowerCase().replace(/\s+/g, "-");
        if (!acc[cat]) acc[cat] = [];

        acc[cat].push({
          ...product,
          price: Number(product.price) || 0,
          oldPrice: product.old_price ? Number(product.old_price) : null,
          discount:
            product.old_price && product.price
              ? Math.round(
                  ((Number(product.old_price) - Number(product.price)) /
                    Number(product.old_price)) *
                    100
                )
              : 0,
          image:
            Array.isArray(product.images) && product.images.length > 0
              ? product.images[0]
              : "https://via.placeholder.com/120",
        });

        return acc;
      }, {});

      setProducts(grouped);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  /* ------------------ MINI PRODUCTS ------------------ */
  const [miniProducts, setMiniProducts] = useState([]);

  useEffect(() => {
    setMiniProducts([
      { id: 1, name: "Gold Ring", category: "one-gram-gold", image: goldring },
      { id: 2, name: "Gold Chain", category: "one-gram-gold", image: chain },
      {
        id: 3,
        name: "Panchalohalu Pendant",
        category: "panchalohalu",
        image: pendent,
      },
    ]);
  }, []);

  /* ------------------ BANNERS ------------------ */
  const [banners, setBanners] = useState(() => {
    const cached = localStorage.getItem("cachedBanners");
    return cached ? JSON.parse(cached) : [];
  });
  const [loadingBanners, setLoadingBanners] = useState(true);

  const fetchBanners = async () => {
    try {
      const res = await axios.get(`${API}/banners`);
      if (res.data?.length) {
        setBanners(res.data);
        localStorage.setItem("cachedBanners", JSON.stringify(res.data));
      }
    } catch {
      console.warn("Using cached banners");
    } finally {
      setLoadingBanners(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  /* ------------------ BUY NOW ------------------ */
  const buyNow = (product, navigate) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === product.id);
      if (exists) return prev;
      return [...prev, { ...product, quantity: 1 }];
    });

    toast.success("Proceeding to checkout 💳");
    navigate("/cart");
  };

  return (
    <AppContext.Provider
      value={{
        isMenuOpen,
        setIsMenuOpen,
        user,
        setUser,
        guest,
        updateGuest,
        cart,
        cartCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        buyNow,
        wishlist,
        toggleWishlist,
        products,
        miniProducts,
        loadingProducts,
        banners,
        loadingBanners,
      }}
    >
      {children}

      {/* ✅ Welcome Modal */}
      {showWelcomeModal && (
        <WelcomeModal
          userName={user?.name || "User"}
          onClose={() => setShowWelcomeModal(false)}
        />
      )}
    </AppContext.Provider>
  );
};

export default AppProvider;
