import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useCart } from "../src/context/CartContext";
import { router } from "expo-router";

export default function CheckoutScreen() {
  const { cartItems, getTotalPrice, clearCart } = useCart();

  const handleCheckout = () => {
    Alert.alert(
      "Order Confirmed",
      "Thank you for your purchase! Your order has been placed successfully.",
      [
        {
          text: "Continue Shopping",
          onPress: () => {
            clearCart();
            router.replace("/product-list");
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Checkout</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Summary</Text>
        {cartItems.map((item) => (
          <View key={item.id} style={styles.orderItem}>
            <Text style={styles.itemName}>{item.title}</Text>
            <Text style={styles.itemDetails}>
              {item.quantity} x ${item.price} = $
              {(item.quantity * item.price).toFixed(2)}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>
          Total: ${getTotalPrice().toFixed(2)}
        </Text>
      </View>

      <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
        <Text style={styles.checkoutButtonText}>Confirm Order</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>Back to Cart</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#333",
  },
  section: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  itemName: {
    flex: 2,
    fontSize: 14,
    color: "#333",
  },
  itemDetails: {
    flex: 1,
    textAlign: "right",
    fontSize: 14,
    color: "#666",
  },
  totalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  totalText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#007bff",
  },
  checkoutButton: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  checkoutButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  backButton: {
    backgroundColor: "#6c757d",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  backButtonText: {
    color: "white",
    fontSize: 16,
  },
});
