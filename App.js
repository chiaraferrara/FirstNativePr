import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
  FlatList,
  Pressable,
  Image,
} from "react-native";
import * as Calendar from "expo-calendar";
import TaskListItem from "./components/TaskListItem";
import Modal from "./components/Modal";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function App() {
  const [todoList, setTodoList] = useState([]);
  const [todo, setTodo] = useState("");
  const [calendarId, setCalendarId] = useState(null);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [showPicker, setShowPicker] = useState(false);

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
  }, []);

  const fetchCalendarEvents = async (id) => {
    try {
      const startDate = new Date(new Date().setDate(new Date().getDate() - 1)); // solo di oggi
      const endDate = new Date(new Date().setDate(new Date().getDate() + 30)); // 30 giorni dopo
      const events = await Calendar.getEventsAsync([id], startDate, endDate);
      setCalendarEvents(events);
    } catch (error) {
      console.error("Error fetching calendar events:", error);
    }
  };

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

  const addTaskToCalendar = async (task, date) => {
    const startDate = new Date(date);
    const endDate = new Date(new Date(startDate).getTime() + 60 * 60 * 1000);
    const eventDetails = {
      title: task,
      startDate,
      endDate,
      timeZone: "GMT",
      location: "Your location",
    };

    try {
      await Calendar.createEventAsync(calendarId, eventDetails);
      Alert.alert("Success", "Task added to calendar!");
      fetchCalendarEvents(calendarId);
    } catch (error) {
      console.error("Error adding task to calendar:", error);
    }
  };

  const submit = () => {
    if (todo.trim() !== "" && date.trim() !== "") {
      addTaskToCalendar(todo, date);
      setTodo("");
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter your task"
          placeholderTextColor="rgba(255, 255, 255, 0.6)"
          value={todo}
          onChangeText={(text) => setTodo(text)}
        />

        <Pressable
          style={styles.addButton}
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <Text style={styles.addButtonText}>+</Text>
        </Pressable>
        <Modal visible={modalVisible}>
          <View>
            <Text style={styles.sectionTitle}>
              When do you plan to complete the task?
            </Text>
            <View>
              <Pressable style={styles.fancyButton} onPress={submit}>
                <Text style={{ color: "white" }}>Today: <Text>{date}</Text></Text>
              </Pressable>
              <Pressable
                style={styles.fancyButton}
                onPress={() => {
                  setShowPicker(true);
                }}
              >
                <Text style={{ color: "white" }}>
                  Select date
                </Text>
              </Pressable>
            </View>
            <View>
              {showPicker && (
                <DateTimePicker
                  value={date ? new Date(date) : new Date()} // Default alla data attuale se `date` è vuoto
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    setShowPicker(false); // Chiude il picker
                    if (selectedDate) {
                      setDate(selectedDate.toISOString().split("T")[0]);
                    }
                  }}
                />
              )}
              <Pressable style={styles.modalButton} onPress={submit}>
                <Text style={styles.addButtonText}>Add Task</Text>
              </Pressable>
            </View>
            <Pressable
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text>Close</Text>
            </Pressable>
          </View>
        </Modal>
      </View>

      <View style={styles.listContainer}>
        {/* <Image source={require("./assets/1.png")}/> immagine così */}
        <Text style={styles.sectionTitle}>What's your tasks?</Text>
        {calendarEvents.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>You slacking.</Text>
          </View>
        ) : (
          <FlatList
            data={calendarEvents}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TaskListItem
                deleteTaskFromCalendar={deleteTaskFromCalendar}
                item={item}
              />
            )}
            showsVerticalScrollIndicator={true}
          />
        )}
      </View>

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#313338",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  fancyButton: {
    backgroundColor: "#252526",
    borderColor: "#707070",

    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 20,
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 20,
    padding: 10,
  },
  textInput: {
    flex: 1,
    color: "#FFFFFF",
    padding: 10,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  listContainer: {
    height: "90%",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 10,
    textAlign: "center",
  },
  todoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
  },
  todoText: {
    fontSize: 16,
    color: "#FFFFFF",
    flex: 1,
  },
  eventDate: {
    color: "#B0BEC5",
    fontSize: 14,
  },
  emptyContainer: {
    alignItems: "center",
    padding: 10,
  },
  emptyText: {
    color: "#B0BEC5",
    fontSize: 16,
  },

  modalButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    margin: 10,
  },
});
