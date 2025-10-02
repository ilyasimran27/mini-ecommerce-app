import axios from "axios";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useCart } from "../src/context/CartContext";
import { logoutUser } from "../src/services/authService";

export default function ProductListScreen() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart, getTotalItems } = useCart();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, searchQuery, selectedCategory]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://fakestoreapi.com/products");
      setProducts(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch products");
      Alert.alert("Error", "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://fakestoreapi.com/products/categories"
      );
      setCategories(response.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const filterProducts = () => {
    let filtered = products;

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    Alert.alert("Success", "Product added to cart!");
  };

  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => router.push(`/product-detail?id=${item.id}`)}
    >
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.productPrice}>${item.price}</Text>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={() => handleAddToCart(item)}
        >
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text>Loading products...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchProducts}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => router.push("/cart")}
        >
          <Text style={styles.cartText}>Cart ({getTotalItems()})</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.categoryContainer}>
        <TouchableOpacity
          style={[
            styles.categoryButton,
            selectedCategory === "all" && styles.categoryButtonActive,
          ]}
          onPress={() => setSelectedCategory("all")}
        >
          <Text
            style={[
              styles.categoryText,
              selectedCategory === "all" && styles.categoryTextActive,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.categoryButtonActive,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.categoryTextActive,
              ]}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredProducts}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.productsList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  cartButton: {
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 10,
  },
  cartText: {
    color: "white",
    fontWeight: "bold",
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  categoryButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: "white",
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  categoryButtonActive: {
    backgroundColor: "#007bff",
    borderColor: "#007bff",
  },
  categoryText: {
    color: "#333",
    fontSize: 12,
  },
  categoryTextActive: {
    color: "white",
  },
  productsList: {
    paddingBottom: 20,
  },
  productCard: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    marginRight: 15,
  },
  productInfo: {
    flex: 1,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  productPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007bff",
    marginBottom: 10,
  },
  addToCartButton: {
    backgroundColor: "#28a745",
    padding: 8,
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  addToCartText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  retryButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
  },
  retryText: {
    color: "white",
  },
});
