import React, { createContext, useContext, useReducer, useEffect } from "react";

let storage;

try {
  const AsyncStorage =
    require("@react-native-async-storage/async-storage").default;
  storage = {
    getItem: AsyncStorage.getItem,
    setItem: AsyncStorage.setItem,
    removeItem: AsyncStorage.removeItem,
  };
  console.log("Using AsyncStorage");
} catch (error) {
  console.warn("AsyncStorage not available, using in-memory storage");

  const memoryStorage = {};
  storage = {
    getItem: async (key) => memoryStorage[key] || null,
    setItem: async (key, value) => {
      memoryStorage[key] = value;
    },
    removeItem: async (key) => {
      delete memoryStorage[key];
    },
  };
}

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_CART":
      return { ...state, items: action.payload };

    case "ADD_TO_CART":
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      let newItems;

      if (existingItem) {
        newItems = state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...state.items, { ...action.payload, quantity: 1 }];
      }

      storage.setItem("cart", JSON.stringify(newItems));
      return { ...state, items: newItems };

    case "UPDATE_QUANTITY":
      const updatedItems = state.items
        .map((item) =>
          item.id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
        .filter((item) => item.quantity > 0);

      storage.setItem("cart", JSON.stringify(updatedItems));
      return { ...state, items: updatedItems };

    case "REMOVE_FROM_CART":
      const filteredItems = state.items.filter(
        (item) => item.id !== action.payload
      );
      storage.setItem("cart", JSON.stringify(filteredItems));
      return { ...state, items: filteredItems };

    case "CLEAR_CART":
      storage.removeItem("cart");
      return { ...state, items: [] };

    default:
      return state;
  }
};

const initialState = {
  items: [],
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    loadCartFromStorage();
  }, []);

  const loadCartFromStorage = async () => {
    try {
      const cartData = await storage.getItem("cart");
      if (cartData) {
        dispatch({ type: "LOAD_CART", payload: JSON.parse(cartData) });
      }
    } catch (error) {
      console.error("Error loading cart:", error);
    }
  };

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  const updateQuantity = (productId, quantity) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { productId, quantity } });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: productId });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const getTotalPrice = () => {
    return state.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: state.items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getTotalPrice,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
