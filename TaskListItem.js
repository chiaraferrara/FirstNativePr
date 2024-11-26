import { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function TaskListItem (item, handleDelete) {


    return(<>
     <View style={styles.todoContainer}>
          <Text style={styles.todoText}>{item.item.title}</Text>
          <Text style={styles.eventDate}>
            {new Date(item.item.startDate).toLocaleString()}
          </Text>

          <Pressable style={styles.addButton} onPress={handleDelete}>
          <Text style={styles.deleteButton}>x</Text>
        </Pressable>
        </View>
    </>)
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
      backgroundColor: "red",
      borderRadius: 15,
      paddingHorizontal: 15,
      marginHorizontal: 10,
    },
  });
  