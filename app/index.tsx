import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import {
  loginUser,
  onAuthChange,
  getCurrentUser,
} from "../src/services/authService";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    checkExistingAuth();
  }, []);

  const checkExistingAuth = async () => {
    try {
      const currentUser = getCurrentUser();
      if (currentUser) {
        console.log("User already logged in, redirecting...");
        router.replace("/product-list");
        return;
      }

      setTimeout(() => {
        setCheckingAuth(false);
      }, 2000);

      const unsubscribe = onAuthChange((user) => {
        setCheckingAuth(false);
        if (user) {
          console.log("Auth state changed - user logged in, redirecting...");
          router.replace("/product-list");
        }
      });

      // Cleanup after 3 seconds if no response
      const timeoutId = setTimeout(() => {
        unsubscribe();
        setCheckingAuth(false);
      }, 3000);

      return () => {
        clearTimeout(timeoutId);
        unsubscribe();
      };
    } catch (error) {
      console.error("Error checking auth:", error);
      setCheckingAuth(false);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    setLoading(true);

    const result = await loginUser(email, password);

    setLoading(false);

    if (result.success) {
      Alert.alert("Success", "Login successful!");
      router.replace("/product-list");
    } else {
      Alert.alert("Login Failed", result.error);
    }
  };

  const useDemoCredentials = () => {
    setEmail("demo@example.com");
    setPassword("password123");
  };

  if (checkingAuth) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Checking authentication...</Text>
        <Text style={styles.loadingSubText}>This may take a few seconds</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>E-Commerce App</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.demoButton} onPress={useDemoCredentials}>
        <Text style={styles.demoButtonText}>Use Demo Credentials</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => router.push("/register")}
      >
        <Text style={styles.registerButtonText}>
          Don't have an account? Register
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
    color: "#333",
  },
  input: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: "#6c757d",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  demoButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#007bff",
  },
  demoButtonText: {
    color: "#007bff",
    fontSize: 16,
  },
  noteText: {
    textAlign: "center",
    marginTop: 20,
    color: "#666",
    fontStyle: "italic",
    fontSize: 12,
  },
  registerButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  registerButtonText: {
    color: "#007bff",
    fontSize: 16,
  },
  loadingText: {
    marginTop: 20,
    textAlign: "center",
    color: "#666",
    fontSize: 16,
  },
  loadingSubText: {
    marginTop: 10,
    textAlign: "center",
    color: "#999",
    fontSize: 12,
  },
});
