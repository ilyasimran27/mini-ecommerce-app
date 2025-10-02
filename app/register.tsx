import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import { registerUser } from "../src/services/authService";

export default function RegisterScreen() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    const { email, password, confirmPassword, firstName, lastName } = formData;

    if (!email || !password || !confirmPassword || !firstName || !lastName) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password should be at least 6 characters");
      return;
    }

    setLoading(true);

    const userData = {
      firstName,
      lastName,
      email,
    };

    const result = await registerUser(email, password, userData);

    setLoading(false);

    if (result.success) {
      Alert.alert("Success", "Registration successful!");
      router.back();
    } else {
      Alert.alert("Registration Failed", result.error);
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={formData.firstName}
        onChangeText={(value) => updateFormData("firstName", value)}
      />

      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={formData.lastName}
        onChangeText={(value) => updateFormData("lastName", value)}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={formData.email}
        onChangeText={(value) => updateFormData("email", value)}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={formData.password}
        onChangeText={(value) => updateFormData("password", value)}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChangeText={(value) => updateFormData("confirmPassword", value)}
        secureTextEntry
      />

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Register</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>Back to Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
    marginTop: 60,
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
    backgroundColor: "#28a745",
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
  backButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#6c757d",
  },
  backButtonText: {
    color: "#6c757d",
    fontSize: 16,
  },
});
