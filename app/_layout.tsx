import { Stack } from "expo-router";

const StackLayout = () => {
  return (
    <Stack screenOptions={{ statusBarColor: "#000" }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="login"
        options={{ headerShown: false, animation: "fade" }}
      />
    </Stack>
  );
};
export default StackLayout;

// for spesfic user// https://api.github.com/users/username/repos

// for public repo // https://api.github.com/repositories

// to navagite https://github.com/{owner}/{repo}

// for seach https://api.github.com/search/repositories?q=test
