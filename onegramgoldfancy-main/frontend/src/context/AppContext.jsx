import { createContext, useEffect, useState, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import WelcomeModal from "../Pages/WelcomeModal";

export const AppContext = createContext(null);

const AppProvider = ({ children }) => {
  /* ------------------ UI ------------------ */
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /* ------------------ USER ------------------ */
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      if (!localStorage.getItem("welcomeShown")) {
        setShowWelcomeModal(true);
        localStorage.setItem("welcomeShown", "true");
      }
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("welcomeShown");
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

  const cartCount = cart.reduce((t, i) => t + i.quantity, 0);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  /* ------------------ PRODUCTS ------------------ */
  const [products, setProducts] = useState({});
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [miniProducts, setMiniProducts] = useState([]);

  const API = "https://onegramgoldfancy-main.onrender.com/api";

  const fetchProducts = async () => {
    try {
      setLoadingProducts(true);
      const res = await axios.get(`${API}/products`);
      const data = res.data || [];

      const grouped = {};
      const categoriesMap = {};

      data.forEach((product) => {
        const slug = product.category
          ?.toLowerCase()
          .trim()
          .replace(/\s+/g, "-");

        if (!slug) return;

        if (!grouped[slug]) grouped[slug] = [];

        const formatted = {
          ...product,
          categorySlug: slug,
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
        };

        grouped[slug].push(formatted);

        if (!categoriesMap[slug]) {
          categoriesMap[slug] = {
            id: slug,
            name: product.category,
            category: slug,
            image: formatted.image,
          };
        }
      });

      setProducts(grouped);
      setMiniProducts(Object.values(categoriesMap));
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  /* ------------------ ❤️ WISHLIST (ONLY FIXED PART) ------------------ */
  const [wishlist, setWishlist] = useState([]);

  const fetchWishlist = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token || !user) return;

    try {
      const res = await axios.get(`${API}/wishlist`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setWishlist(Array.isArray(res.data) ? res.data : []);
    } catch {
      toast.error("Failed to fetch wishlist");
    }
  }, [user]);

  const toggleWishlist = async (productId) => {
    const token = localStorage.getItem("token");

    if (!token || !user) {
      toast.error("Please login ❤️");
      return;
    }

    try {
      if (wishlist.includes(productId)) {
        await axios.delete(`${API}/wishlist/${productId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setWishlist((prev) => prev.filter((id) => id !== productId));
        toast.success("Removed from favorites");
      } else {
        // ✅ FIX: POST without :id
        await axios.post(
          `${API}/wishlist`,
          { productId },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setWishlist((prev) => [...prev, productId]);
        toast.success("Added to favorites ❤️");
      }
    } catch (err) {
      console.error("Wishlist error:", err.response?.data || err.message);
      toast.error("Wishlist update failed");
    }
  };

  useEffect(() => {
    user ? fetchWishlist() : setWishlist([]);
  }, [user, fetchWishlist]);

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
