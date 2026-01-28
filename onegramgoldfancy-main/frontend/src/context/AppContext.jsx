import { createContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import goldring from "../Assets/rings.webp";
import chain from "../Assets/goldchains.jpg";
import pendent from "../Assets/pendent.jpg";

export const AppContext = createContext(null);

const AppProvider = ({ children }) => {
  /* ------------------ UI ------------------ */
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /* ------------------ USER ------------------ */
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
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
          i.id === product.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
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

  /* ------------------ WISHLIST ------------------ */
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  /* ------------------ PRODUCTS ------------------ */
  const [products, setProducts] = useState({});
  const [loadingProducts, setLoadingProducts] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoadingProducts(true);
      const res = await axios.get(
        "https://onegramgoldfancy-main.onrender.com/api/products"
      );

      const data = res.data || [];

      const grouped = data.reduce((acc, product) => {
        const cat = product.category.toLowerCase().replace(/\s+/g, "-");
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
          image: product.image_url || "https://via.placeholder.com/120",
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
      {
        id: 1,
        name: "Gold Ring",
        category: "one-gram-gold",
        image:
         goldring,
      },
      {
        id: 2,
        name: "Gold Chain",
        category: "one-gram-gold",
        image:
          chain,
      },
      {
        id: 3,
        name: "Panchalohalu Pendant",
        category: "panchalohalu",
        image:
          pendent,
      },
    ]);
  }, []);

  /* ------------------ BANNERS (FIXED) ------------------ */
  const [banners, setBanners] = useState(() => {
    const cached = localStorage.getItem("cachedBanners");
    return cached ? JSON.parse(cached) : [];
  });

  const [loadingBanners, setLoadingBanners] = useState(true);

  const fetchBanners = async () => {
    try {
      const res = await axios.get(
        "https://onegramgoldfancy-main.onrender.com/api/banners"
      );

      if (res.data && res.data.length > 0) {
        setBanners(res.data);
        localStorage.setItem("cachedBanners", JSON.stringify(res.data));
      }
    } catch (err) {
      console.warn("Backend sleeping, using cached banners");
      // IMPORTANT: do NOT clear banners
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

  /* ------------------ CONTEXT ------------------ */
  return (
    <AppContext.Provider
      value={{
        /* UI */
        isMenuOpen,
        setIsMenuOpen,

        /* User */
        user,
        setUser,

        /* Guest */
        guest,
        updateGuest,

        /* Cart */
        cart,
        cartCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        buyNow,

        /* Wishlist */
        wishlist,
        toggleWishlist,

        /* Products */
        products,
        miniProducts,
        loadingProducts,

        /* Banners */
        banners,
        loadingBanners,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
