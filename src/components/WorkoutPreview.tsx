import { Theme } from "_providers/ThemeContext";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface WorkoutPreviewProps {
  name: string,
  startedAt: string;
  endedAt: string;
}

const WorkoutPreview = ({name, startedAt, endedAt}: WorkoutPreviewProps) => {
  return (
    <View>
      <Text>
        WorkoutPreview
      </Text>
    </View>
  )
}

const styles = (theme: Theme) => StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: theme.background
  }
})

export default WorkoutPreview;