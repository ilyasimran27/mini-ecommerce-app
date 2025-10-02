import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useCart } from "../src/context/CartContext";

import { router } from "expo-router";

export default function CartScreen() {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalPrice,
  } = useCart();

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity === 0) {
      Alert.alert(
        "Remove Item",
        "Are you sure you want to remove this item from cart?",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Remove", onPress: () => removeFromCart(productId) },
        ]
      );
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleClearCart = () => {
    Alert.alert(
      "Clear Cart",
      "Are you sure you want to clear all items from cart?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Clear", onPress: () => clearCart() },
      ]
    );
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />

      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.itemPrice}>${item.price}</Text>

        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleQuantityChange(item.id, item.quantity - 1)}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>

          <Text style={styles.quantityText}>{item.quantity}</Text>

          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleQuantityChange(item.id, item.quantity + 1)}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => handleQuantityChange(item.id, 0)}
      >
        <Text style={styles.removeButtonText}>×</Text>
      </TouchableOpacity>
    </View>
  );

  if (cartItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Your cart is empty</Text>
        <TouchableOpacity
          style={styles.continueShoppingButton}
          onPress={() => router.back()}
        >
          <Text style={styles.continueShoppingText}>Continue Shopping</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.cartList}
      />

      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>
            Total: ${getTotalPrice().toFixed(2)}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.clearCartButton}
          onPress={handleClearCart}
        >
          <Text style={styles.clearCartText}>Clear Cart</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => router.push("/checkout")}
        >
          <Text style={styles.checkoutText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  cartList: {
    padding: 10,
  },
  cartItem: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemImage: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    marginRight: 15,
  },
  itemDetails: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  itemPrice: {
    fontSize: 16,
    color: "#007bff",
    fontWeight: "bold",
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    backgroundColor: "#f8f9fa",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#dee2e6",
  },
  quantityButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  quantityText: {
    marginHorizontal: 15,
    fontSize: 16,
    fontWeight: "bold",
    minWidth: 20,
    textAlign: "center",
  },
  removeButton: {
    padding: 5,
  },
  removeButtonText: {
    fontSize: 24,
    color: "#dc3545",
    fontWeight: "bold",
  },
  footer: {
    padding: 20,
    paddingBottom: 60,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#dee2e6",
  },
  totalContainer: {
    marginBottom: 15,
  },
  totalText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  clearCartButton: {
    backgroundColor: "#dc3545",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  clearCartText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  checkoutButton: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  checkoutText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 20,
    color: "#666",
    marginBottom: 20,
  },
  continueShoppingButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
  },
  continueShoppingText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
