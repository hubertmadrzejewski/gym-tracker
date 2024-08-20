import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { StatusBar } from "expo-status-bar";

import { Theme, useTheme } from "_providers/ThemeContext";

const Home = () => {

  const { theme, setThemeMode } = useTheme();

  return (
    <>
    <View style={styles(theme).container}>
        <Text style={{ color: theme.text }}>
          Open up App.tsx to start working on your app!
        </Text>
        <StatusBar style="auto" />
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Button title="Light Theme" onPress={() => setThemeMode("light")} />
        <Button title="Dark Theme" onPress={() => setThemeMode("dark")} />
        <Button title="System Default" onPress={() => setThemeMode("system")} />
      </View>
    </>

  )
}

const styles = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
      backgroundColor: theme.background,
      alignItems: "center",
      justifyContent: "center",
  }
})

export default Home;