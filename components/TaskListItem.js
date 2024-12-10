import { useEffect } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import * as Calendar from "expo-calendar";


export default function TaskListItem({ item, deleteTaskFromCalendar }) {
  useEffect(() => {
    console.log("Evento:", item);
    console.log("Funzione deleteTaskFromCalendar:", deleteTaskFromCalendar);
  }, [item]);

  return (
    <View style={styles.todoContainer}>
      <Text style={styles.todoText}>{item.title}</Text>
      <Text style={styles.eventDate}>
        {new Date(item.startDate).toLocaleString()}
      </Text>

      <Pressable
        style={styles.addButton}
        onPress={() => deleteTaskFromCalendar(item.id)}
      >
        <Text style={styles.deleteButton}>x</Text>
      </Pressable>
    </View>
  );
}


const styles = StyleSheet.create({
   
    todoContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "rgba(255, 255, 255, 0.15)",
      borderRadius: 15,
      padding: 15,
      width: "100%",
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
    deleteButton: {
      color: "#FFFFFF",
      fontWeight: "bold",
      fontSize: 16,
      backgroundColor: "#8f3ebc",
      borderRadius: 15,
      paddingHorizontal: 15,
      marginHorizontal: 10,
    },
  });
  