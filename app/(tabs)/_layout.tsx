import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
        screenOptions={{
            tabBarActiveTintColor: '#ffd33d',
            headerStyle: {
                backgroundColor: '#25292e',
            },
            headerShadowVisible: false,
            headerTintColor: '#fff',
            tabBarStyle: {
                backgroundColor: '#25292e',
            }
        }}
    >
        <Tabs.Screen name="index" options={{ 
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
                <Ionicons name={focused ? "card" : "card-outline"} size={24} color={color} />
            )}} />
        <Tabs.Screen name="people" options={{ 
            title: "Billionaires",
            tabBarIcon: ({ color, focused }) => (
                <Ionicons name={focused ? "people" : "people-outline"} size={24} color={color} />
            )}} />
        <Tabs.Screen name="settings" options={{ 
            title: "Settings",
            tabBarIcon: ({ color, focused }) => (
                <Ionicons name={focused ? "cog" : "cog-outline"} size={24} color={color} />
            )}} />
    </Tabs>
  );
}
