import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import { Theme, useTheme } from "_providers/ThemeContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { createGlobalStyles } from "src/styles/globalStyles";
import { FlashList } from "@shopify/flash-list";
import moment from "moment";

interface CalendarDay {
  date: string;
  dayName: string;
  fullDate: string;
}

interface CalendarWeek {
  month: string;
  days: CalendarDay[];
}

const CALENDAR_CELL_NUMBER = 7;
const CALENDAR_CELL_MARGIN = 5;
const SCREEN_WIDTH = Dimensions.get("screen").width;
const CALENDAR_CELL_SIZE =
  (SCREEN_WIDTH - CALENDAR_CELL_NUMBER * CALENDAR_CELL_MARGIN * 2) /
  CALENDAR_CELL_NUMBER;

const DashboardScreen = () => {
  const { theme, setThemeMode } = useTheme();
  const today = useMemo(() => moment().format("DD-MM-YYYY"), []);
  const globalStyles = createGlobalStyles(theme);
  const [chosenDate, setChosenDate] = useState<string>(today);

  const getCurrentWeekDates: CalendarWeek = useMemo(() => {
    const startOfWeek = moment().startOf("isoWeek"); //starts with Monday
    const month = startOfWeek.format("MMM");
    const days = Array.from({ length: 7 }).map((_, i) => {

      const date = startOfWeek.clone()
       date.add(i, "day");
      return {
        fullDate: date.format("DD-MM-YYYY"),
        dayName: date.format("ddd"),
        date: date.format("DD"),
      };
    });
    return { month: month, days: days };
  }, []);

  const renderDayItem = ({ date, dayName, fullDate }: CalendarDay) => {
    const isToday = fullDate === today;
    const isChosen = fullDate === chosenDate;

    const backgroundColor = isChosen
      ? isToday
        ? theme.primary
        : "black"
      : "white";

    const textColor = isChosen ? "white" : isToday ? theme.primary : "black";

    return (
      <TouchableOpacity
        onPress={() => {
          setChosenDate(fullDate);
        }}
        style={[
          styles(theme).calendarCell,
          {
            backgroundColor: backgroundColor,
          },
        ]}
      >
        <Text style={[styles(theme).calendarDayText, { color: textColor }]}>
          {dayName}
        </Text>
        <Text style={[styles(theme).calendarDateText, { color: textColor }]}>
          {date}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={globalStyles.headerText}>Dashboard</Text>
      <Text>{getCurrentWeekDates.month}</Text>
      <View style={{ flex: 1 }}>
        <FlashList
          data={getCurrentWeekDates.days}
          renderItem={({ item }) => renderDayItem(item)}
          estimatedItemSize={50}
          horizontal
          extraData={chosenDate}
        />
      </View>

      {/* <WorkoutPreview/> */}
      {/* <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Button title="Light Theme" onPress={() => setThemeMode("light")} />
        <Button title="Dark Theme" onPress={() => setThemeMode("dark")} />
        <Button title="System Default" onPress={() => setThemeMode("system")} />
      </View> */}
    </SafeAreaView>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginHorizontal: 25,
      backgroundColor: theme.background,
    },
    calendarCell: {
      justifyContent: "center",
      alignItems: "center",
      marginHorizontal: 5,
      width: CALENDAR_CELL_SIZE,
      height: CALENDAR_CELL_SIZE,
      borderRadius: CALENDAR_CELL_SIZE / 2,
    },
    calendarDayText: {
      fontWeight: "bold",
    },
    calendarDateText: {},
  });

export default DashboardScreen;
