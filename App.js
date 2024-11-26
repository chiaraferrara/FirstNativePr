import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";

export default function App() {
  const [todoList, setTodoList] = useState([]);
  const [todo, setTodo] = useState("");
  const [completedList, setCompletedList] = useState([]);

  const submit = () => {
    if (todo.trim() !== "") {
      setTodoList((currentList) => [...currentList, todo]);
      setTodo("");
    }
  };

  const deleteTodo = (index) => {
    let newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);
  };

  const completeTodo = (index) => {
    setCompletedList([...completedList, todoList[index]]);
    let newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);
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
        <TouchableOpacity style={styles.addButton} onPress={submit}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.listContainer}>
        <Text style={styles.sectionTitle}>Todo List</Text>
        {todoList.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No tasks available</Text>
          </View>
        ) : (
          todoList.map((todo, index) => (
            <View key={index} style={styles.todoContainer}>
              <Text style={styles.todoText}>{todo}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.actionButton, styles.completeButton]}
                  onPress={() => completeTodo(index)}
                >
                  <Text style={styles.buttonText}>✔</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, styles.deleteButton]}
                  onPress={() => deleteTodo(index)}
                >
                  <Text style={styles.buttonText}>✖</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </View>

      <View style={styles.listContainer}>
        <Text style={styles.sectionTitle}>Completed</Text>
        {completedList.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No completed tasks</Text>
          </View>
        ) : (
          completedList.map((todo, index) => (
            <View key={index} style={styles.todoContainer}>
              <Text style={[styles.todoText, styles.completedText]}>{todo}</Text>
            </View>
          ))
        )}
      </View>

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C1C1E",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  inputContainer: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 20,
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 20,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
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
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  listContainer: {
    width: "100%",
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
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    backdropFilter: "blur(10px)",
  },
  todoText: {
    fontSize: 16,
    color: "#FFFFFF",
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
  },
  actionButton: {
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  completeButton: {
    backgroundColor: "#4CAF50",
  },
  deleteButton: {
    backgroundColor: "#F44336",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  completedText: {
    color: "#B0BEC5",
  },
  emptyContainer: {
    alignItems: "center",
    padding: 10,
  },
  emptyText: {
    color: "#B0BEC5",
    fontSize: 16,
  },
});
