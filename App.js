import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [todoList, setTodoList] = useState([]);
  const [todo, setTodo] = useState("");
  const [completedList, setCompletedList] = useState([]);

  const submit = () => {
    if (todo.trim() !== "") {
      setTodoList([...todoList, todo]);
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
      {/* Input Section */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter your task"
          placeholderTextColor="rgba(255, 255, 255, 0.6)"
          value={todo}
          onChangeText={(text) => {
            setTodo(text);
          }}
        />
        <Button title="Add" color="#4CAF50" onPress={submit} />
      </View>

      {/* Todo List */}
      <View style={styles.listContainer}>
        <Text style={styles.sectionTitle}>Todo List</Text>
        {todoList.map((todo, index) => (
          <View key={index} style={styles.todoContainer}>
            <Text style={styles.title}>{todo}</Text>
            <View style={styles.buttonContainer}>
              <Button
                title="✔"
                color="#4CAF50"
                onPress={() => completeTodo(index)}
              />
              <Button
                title="✖"
                color="#F44336"
                onPress={() => deleteTodo(index)}
              />
            </View>
          </View>
        ))}
      </View>

      {/* Completed List */}
      <View style={styles.listContainer}>
        <Text style={styles.sectionTitle}>Completed</Text>
        {completedList.map((todo, index) => (
          <View key={index} style={styles.todoContainer}>
            <Text style={styles.title}>{todo}</Text>
          </View>
        ))}
      </View>

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
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
    borderRadius: 15,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    backdropFilter: "blur(10px)", // Questo stile sarà visibile solo nel browser con Expo.
  },
  textInput: {
    flex: 1,
    color: "#FFFFFF",
    padding: 10,
    fontSize: 16,
  },
  listContainer: {
    width: "100%",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 10,
    textAlign: "center",
  },
  todoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  title: {
    fontSize: 16,
    color: "#FFFFFF",
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
  },
});
