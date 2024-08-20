import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { StatusBar } from "expo-status-bar";

import { Theme, useTheme } from "_providers/ThemeContext";

const LogInScreen = ({navigation}) => {

  const { theme } = useTheme();

  return (
    <>
    <View style={styles(theme).container}>
        <Text style={{ color: theme.text }}>
         LogIn
        </Text>
        <StatusBar style="auto" />
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Button title="Press to move" onPress={() => navigation.navigate('Dashboard')} />
      
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

export default LogInScreen;