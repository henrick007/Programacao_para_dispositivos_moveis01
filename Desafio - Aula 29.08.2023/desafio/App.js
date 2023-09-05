import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, Keyboard, Alert, AsyncStorage } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function App() {
  const [task, setTask] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [completedTasks, setCompletedTasks] = useState([]);

  async function addTask() {
    if (newTask === "") {
      return;
    }

    const search = task.filter((t) => t.title === newTask);
    if (search.length !== 0) {
      Alert.alert("Atenção", "Nome da tarefa repitido!");
      return;
    }

    const newTaskItem = { title: newTask, completed: false };
    setTask([...task, newTaskItem]);
    setNewTask('');

    Keyboard.dismiss();
  }

  async function removeTask(item) {
    Alert.alert(
      "Deletar Tarefa",
      "Tem certeza que deseja remover está tarefa?",
      [
        {
          text: "Cancelar",
          onPress: () => {
            return;
          },
          style: 'Cancelar',
        },
        {
          text: "OK",
          onPress: () => {
            if (completedTasks.some((t) => t.title === item.title)) {
              setCompletedTasks(completedTasks.filter((t) => t.tilte !== item.tilte));
            } else {
              setTask(task.filter((t) => t.title !== item.title));
            }
          },
        },
      ],
      { cancelable: false }
    );
  }

  useEffect(() => {
    async function carregaDados(addTask) {
      const task = await AsyncStorage.getItem("task");

      if (task) {
        setTask(JSON.parse(task));
      }
    }
    carregaDados();
  }, []);

  useEffect(() => {
    async function salvaDados() {
      AsyncStorage.setItem("task", JSON.stringify(task));
    }
    salvaDados();
  }, [task]);


  return (
    <>
      <KeyboardAvoidingView
        keyboardVerticalOffset={0}
        behavior="padding"
        style={{ flex: 1 }}
        enabled={Platform.OS == "ios"}
      >
        <View style={styles.container}>
          <View style={styles.body}>
            <Text style={styles.texto}>Crie e Organize{'\n'}suas Tarefas</Text>
          </View>
          <View style={styles.list}>
            <FlatList
              style={styles.flatList}
              data={task}
              keyExtractor={item => item.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <View style={styles.list02}>
                  <TouchableOpacity
                    onPress={() => {
                      if (completedTasks.some((t) => t.title === item.title)) {
                        setCompletedTasks(completedTasks.filter((t) => t.title !== item.title));
                      } else {
                        setCompletedTasks([...completedTasks, item]);
                      }
                    }}
                  >
                    {completedTasks.some((t) => t.title === item.title) ? (
                      <Ionicons name="checkbox-outline" size={25} color={"green"} />
                    ) : (
                      <Ionicons name="square-outline" size={25} color={"black"} />
                    )}
                  </TouchableOpacity>
                  <Text style={completedTasks.some((t) => t.title === item.title) ? { ...styles.texto02, textDecorationLine: "line-through" } : styles.texto02}>
                    {item.title}
                  </Text>
                  <TouchableOpacity onPress={() => removeTask(item)}>
                    <MaterialIcons
                      name="delete-forever"
                      size={25}
                      color={'red'}
                    />
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholderTextColor='#999'
              autoCorrect={true}
              placeholder='Adicionar Tarefa...'
              maxLength={30}
              onChangeText={text => setNewTask(text)}
              value={newTask}
            />
            <TouchableOpacity style={styles.button} onPress={() => addTask()} >
              <Ionicons name="ios-add" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 20,
  },
  body: {
    flex: 1,
    marginBottom: -450,
  },
  form: {
    padding: 0,
    height: 60,
    justifyContent: 'center',
    alignSelf: 'stretch',
    flexDirection: 'row',
    paddingTop: 13,
    borderTopWidth: 1,
    borderColor: 'silver',
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: 'silver',
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'black',
  },
  button: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    borderRadius: 4,
    marginLeft: 10,
  },
  texto: {
    fontSize: 25,
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 20,
  },
  list: {
    flex: 1,
  },
  flatList: {
    flex: 2,
    marginTop: 5,
  },
  list02: {
    marginBottom: 15,
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#eee',

    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: 'black',
  },
  texto02: {
    fontSize: 14,
    color: 'black',
    fontWeight: "bold",
    marginTop: 5,
    textAlign: 'center',
  }
});