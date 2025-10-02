import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useCart } from "../src/context/CartContext";

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `https://fakestoreapi.com/products/${id}`
      );
      setProduct(response.data);
    } catch (err) {
      Alert.alert("Error", "Failed to load product details");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    addToCart(product);
    Alert.alert("Success", "Product added to cart!");
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text>Loading product...</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.center}>
        <Text>Product not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <Image source={{ uri: product.image }} style={styles.productImage} />

        <View style={styles.detailsContainer}>
          <Text style={styles.productTitle}>{product.title}</Text>
          <Text style={styles.productPrice}>${product.price}</Text>

          <View style={styles.categoryContainer}>
            <Text style={styles.categoryLabel}>Category:</Text>
            <Text style={styles.categoryText}>
              {product.category.charAt(0).toUpperCase() +
                product.category.slice(1)}
            </Text>
          </View>

          <Text style={styles.descriptionLabel}>Description:</Text>
          <Text style={styles.productDescription}>{product.description}</Text>

          <View style={styles.spacer} />
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}
        >
          <Text style={styles.addToCartText}>Add to Cart</Text>
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
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  productImage: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
    backgroundColor: "white",
  },
  detailsContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  productPrice: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#007bff",
    marginBottom: 15,
  },
  categoryContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },
  categoryLabel: {
    fontWeight: "bold",
    marginRight: 5,
    color: "#666",
  },
  categoryText: {
    color: "#666",
  },
  descriptionLabel: {
    fontWeight: "bold",
    marginBottom: 5,
    color: "#666",
  },
  productDescription: {
    fontSize: 16,
    lineHeight: 22,
    color: "#333",
    marginBottom: 20,
  },

  buttonContainer: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 35,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },

  spacer: {
    height: 100,
  },
  addToCartButton: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  addToCartText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
