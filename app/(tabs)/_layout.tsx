import { Tabs } from "expo-router";
import React from "react";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#06b9b6",
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-circle-sharp" size={24} color={color} />
          ),
        }}
        name="info"
      />
    </Tabs>
  );
};

export default TabLayout;
