import AsyncStorage from '@react-native-async-storage/async-storage'
import {data} from '../data/todos'

 export const getTodos=async (setTodos)=>{
      try {
        const jsonvalue=await AsyncStorage.getItem('TodoApp')
        const storageTodo=jsonvalue!=null ? JSON.parse(jsonvalue) :null
        if(storageTodo && storageTodo.length){
          setTodos(storageTodo.sort((a,b)=>b.id-a.id))
        }else{
          setTodos(data.sort((a,b)=>b.id-a.id))
        }

      } catch (error) {
        console.log(error);
      }
    }

export const storeData=async (todos)=>{
          try {
            const jsonvalue= JSON.stringify(todos)
            await AsyncStorage.setItem("TodoApp",jsonvalue)
          } catch (error) {
            console.log(error);
            
          }
}

 export const getTodo=async (id,setTodo,setTitle)=>{
      try {
        const jsonvalue=await AsyncStorage.getItem('TodoApp')
        const storageTodo=jsonvalue!=null ? JSON.parse(jsonvalue) :null
        if(storageTodo && storageTodo.length){
          const editableTodo=storageTodo.find(obj=>obj.id==id)
          setTodo(editableTodo)
          setTitle(editableTodo.title)
        }

      } catch (error) {
        console.log(error);
      }
    }

    export const updateTodo=async (updatedTodo)=>{
          try {
            const jsonvalue=  await AsyncStorage.getItem("TodoApp")
            const storageTodos=jsonvalue!=null ? JSON.parse(jsonvalue) :null
            if(storageTodos && storageTodos.length){
              const otherTodos=storageTodos.filter(obj=>obj.id!=updatedTodo.id)
              const allTodos=[...otherTodos,updatedTodo]
              await AsyncStorage.setItem("TodoApp",JSON.stringify(allTodos))
            }else
              await AsyncStorage.setItem("TodoApp",JSON.stringify([updatedTodo]))
           
          } catch (error) {
            console.log(error);
            
          }
}