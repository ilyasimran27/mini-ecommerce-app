import { router, Stack } from "expo-router";
import { Alert, Text, TouchableOpacity } from "react-native";
import { CartProvider } from "../src/context/CartContext";
import { logoutUser } from "../src/services/authService";

const handleHeaderLogout = () => {
  Alert.alert("Logout", "Are you sure you want to logout?", [
    { text: "Cancel", style: "cancel" },
    {
      text: "Logout",
      onPress: async () => {
        const result = await logoutUser();
        if (result.success) {
          router.replace("/");
        } else {
          Alert.alert("Error", result.error);
        }
      },
    },
  ]);
};

const LogoutButton = () => (
  <TouchableOpacity
    style={{
      backgroundColor: "#dc3545",
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 6,
      marginRight: 10,
    }}
    onPress={handleHeaderLogout}
  >
    <Text style={{ color: "white", fontWeight: "bold", fontSize: 14 }}>
      Logout
    </Text>
  </TouchableOpacity>
);

export default function RootLayout() {
  return (
    <CartProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
            title: "Login",
          }}
        />
        <Stack.Screen
          name="register"
          options={{
            title: "Register",
            headerBackTitle: "Login",
          }}
        />
        <Stack.Screen
          name="product-list"
          options={{
            title: "Products",
            headerBackTitle: "Back",
            headerRight: () => <LogoutButton />,
          }}
        />
        <Stack.Screen
          name="product-detail"
          options={{
            title: "Product Details",
            headerBackTitle: "Back",
            headerRight: () => <LogoutButton />,
          }}
        />
        <Stack.Screen
          name="cart"
          options={{
            title: "Shopping Cart",
            headerBackTitle: "Back",
            headerRight: () => <LogoutButton />,
          }}
        />
        <Stack.Screen
          name="checkout"
          options={{
            title: "Checkout",
            headerBackTitle: "Cart",
            headerRight: () => <LogoutButton />,
          }}
        />
      </Stack>
    </CartProvider>
  );
}
