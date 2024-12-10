import { useEffect, useState } from "react";
import { Alert, FlatList, SafeAreaView, Text, View } from "react-native";
import * as Calendar from "expo-calendar";
import TaskListItem from "../components/TaskListItem";
import { styles } from "../App";
export default function PreviousTasks() {
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [calendarId, setCalendarId] = useState(null);

  const deleteTaskFromCalendar = async (id) => {
    try {
      await Calendar.deleteEventAsync(id);
      Alert.alert("Success", "Task removed from calendar!");

      // Aggiorna lo stato rimuovendo l'evento
      setCalendarEvents((prevEvents) =>
        prevEvents.filter((event) => event.id !== id)
      );
    } catch (error) {
      console.error("Error deleting task from calendar:", error);
    }
  };

  const fetchCalendarEvents = async (id) => {
    try {
      const startDate = new Date(new Date().setDate(new Date().getDate() - 30)); 
      const endDate = new Date(new Date().setDate(new Date().getDate() -1)); 
      const events = await Calendar.getEventsAsync([id], startDate, endDate);
      setCalendarEvents(events);
    } catch (error) {
      console.error("Error fetching calendar events:", error);
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === "granted") {
        const calendars = await Calendar.getCalendarsAsync(
          Calendar.EntityTypes.EVENT
        );

        const defaultCalendar = calendars.find(
          (cal) => cal.allowsModifications
        );
        if (defaultCalendar) {
          setCalendarId(defaultCalendar.id);
          fetchCalendarEvents(defaultCalendar.id);
        } else {
          Alert.alert(
            "No Calendar Found",
            "Please create or allow modification for a calendar."
          );
        }
      } else {
        Alert.alert(
          "Permission Denied",
          "Calendar access is required to sync tasks."
        );
      }
    })();

    console.log("Eventi:", calendarEvents);
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <FlatList
          data={calendarEvents}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TaskListItem
              deleteTaskFromCalendar={deleteTaskFromCalendar}
              item={item}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}
