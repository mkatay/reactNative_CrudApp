import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {data} from '../data/todos.js'
import { useState } from "react";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {Inter_500Medium,useFonts } from '@expo-google-fonts/inter'

export default function Index() {
  const [todos,setTodos]=useState(data.sort((a,b)=>b.id-a.id))
  const [text,setText]=useState('')
  let [fontsLoaded] = useFonts({Inter_500Medium})
  if (!fontsLoaded)    return null;

  const add=()=>{
    if(text.trim().length>0) {
      const id=(new Date()).getTime()
      const newTodo={id,title:text,completed:false}
      setTodos([newTodo,...todos])
      setText('')
    }
  }

  const toggleTodo=(id)=>{
    setTodos(prev=>prev.map(obj=>obj.id==id? ({...obj,completed:!obj.completed}) : obj))
  }
  const removeTodo=(id)=>{
    setTodos(prev=>prev.filter(obj=>obj.id!=id))
  }
  const renderItem=({item})=>{
    return(
    <View style={styles.todoItem}>
      <Text style={[styles.todoText,item.completed && styles.completed]}
          onPress={()=>toggleTodo(item.id)}
      >
        {item.title}
      </Text>
      <Pressable onPress={()=>removeTodo(item.id)}>
        <MaterialCommunityIcons name="delete-circle" size={36} color="red" />
      </Pressable>
    </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}> 
        <TextInput 
          style={styles.input}
          placeholder="add new todo..."
          placeholderTextColor='lightgray'
          value={text}
          onChangeText={setText}
        />
        <Pressable onPress={add} style={styles.button}>
          <Text style={styles.buttonText}>add</Text>
        </Pressable>
      </View>
      <FlatList 
        data={todos}
        renderItem={renderItem}
      />

    </SafeAreaView>
  );
}

const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'black',
    padding:10
  },
  inputContainer:{
    flexDirection:'row',
    justifyContent:'center',
    width:'100%',
    padding:10,
    marginBottom:10,
    maxWidth:600,
    marginHorizontal:'auto'
  },
  input:{
    flex:1,
    borderWidth:1,
    borderColor:'lightgray',
    padding:10,
    borderRadius:5,
    //fontSize:18,
    color:'white',
    marginRight:10,
    fontFamily:'Inter_500Medium'
  },
  button:{
    backgroundColor:'white',
    borderRadius:5,
    padding:10
  },
  buttonText:{
    fontSize:18,
    color:'black'
  },
  todoItem:{
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    gap:4,
    borderBottomWidth:1,
    borderBottomColor:'lightgray',
    width:'100%'
  },
  todoText:{
    flex:1,
    color:'white',
    fontSize:16,
     fontFamily:'Inter_500Medium'
  },
  completed:{
    textDecorationLine:'line-through',
    color:'gray'
  }
})