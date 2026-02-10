import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getTodo, updateTodo } from "@/utils/utils";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "@/context/ThemeContext";
import { StatusBar } from "expo-status-bar";
import bgImg from '../../assets/bg_todo2.jpg'
import { ImageBackground } from "expo-image";
 
const editTodo = () => {
  const { id } = useLocalSearchParams();
  const [todo, setTodo] = useState({});
  const [title,setTitle]=useState('')
  const { colorScheme } = useContext(ThemeContext);

  const router = useRouter();

  useEffect(() => {
    getTodo(id, setTodo,setTitle);
  }, [id]);


  const handleSave = () => {
    const updatedTodo={...todo,title}
    console.log(updatedTodo);
    
    updateTodo(updatedTodo);
    router.push("/");
  };

  const styles=createStyles()

  return (
    <SafeAreaView  style={styles.container}>
    <ImageBackground source={bgImg} contentFit="cover" contentPosition="center" 
        style={styles.bgImage}>
        <View style={styles.content}> 
            <TextInput style={styles.input} value={title} onChangeText={setTitle}/> 
            <View style={styles.buttons}>
                <Pressable onPress={handleSave} style={styles.button}>
                    <Text style={styles.buttonText}>save</Text>
                </Pressable>
                <Pressable onPress={()=>router.push('/')} style={[styles.button,{backgroundColor:'red'}]}>
                    <Text style={styles.buttonText}>cancel</Text> 
                </Pressable>
            </View>
        </View>
      </ImageBackground>        
      <StatusBar style={colorScheme=='dark' ? 'light' : 'dark'}/>
    </SafeAreaView>
  );
};

export default editTodo;

function createStyles(){
  return StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
   
    },
    content:{
        width:'95%',
        backgroundColor:'black',
        paddingHorizontal:5,
        paddingVertical:30,
        gap:10,
        borderRadius:5
    },
    input:{
        borderColor:'gray',
        borderWidth:1,
        borderRadius:5,
        padding:10,
        flex:1,
        color:'white'
    },
    buttons:{
        flexDirection:"row",
        /*backgroundColor:'pink',*/
        justifyContent:'space-around'
    },
    button:{
        borderColor:'gray',
        borderWidth:1,
        borderRadius:5,
        paddingVertical:10,
        paddingHorizontal:20,
        backgroundColor:'royalblue',
        borderRadius:5,
       
    },
    buttonText:{
        color:'white'
    },
    bgImage:{
        width:'100%',
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        
    }
  })
}