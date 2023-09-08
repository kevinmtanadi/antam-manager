import { createContext, useContext, useState } from "react";
import { Item } from "../pages/dashboard/Product";

type CartContextType = {
  cartContent: Item[] | null;
  setCartContent: React.Dispatch<React.SetStateAction<Item[] | null>>;
  addItemToCart: (item: Item) => void;
};

// Create your CartContext
const CartContext = createContext<CartContextType | undefined>(undefined);

// Create a CartProvider component to wrap your app
const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartContent, setCartContent] = useState<Item[] | null>(null);

  // Function to add an item to the cart
  const addItemToCart = (item: Item) => {
    // If cartContent is null, initialize it as an empty array
    if (cartContent === null) {
      setCartContent([item]);
    } else {
      // Use the spread operator to create a new array with the added item
      setCartContent([...cartContent, item]);
    }
  };

  return (
    <CartContext.Provider
      value={{ cartContent, setCartContent, addItemToCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Create a custom hook to access the cart context
const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export { CartProvider, useCart };
