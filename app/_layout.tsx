import { Stack } from "expo-router";

const StackLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#000",
        },
        headerTitle: "ZenHR",
        headerTitleStyle: {
          color: "#06b9b6",
          fontSize: 24,
        },
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="login"
        options={{ headerShown: false, animation: "fade" }}
      />
    </Stack>
  );
};
export default StackLayout;
