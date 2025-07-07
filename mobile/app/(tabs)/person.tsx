import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Alert, Text, TouchableOpacity, View } from 'react-native'
interface Idt {
  username : string , 
  role : string , 
  email : string , 
  created_at : string
}
const person = () => {

const router = useRouter()

  const hnaldelogout = async () => {
    try {
      const res = await fetch('http://192.168.100.6:3000/api/user/logout' , {
        method:"POST" , 
        headers: {
          'Content-Type': 'application/json',
        } , 
        credentials : "include" , 
      })

      const data = await res.json()
      if(res.ok) {
router.push('/(auth)/signin')
      }
      if(!res.ok) {
        console.log('error')
        Alert.alert('where tf your going')
      }
    } catch (error) {
      console.log(error)

      
    }
  }
  const [dt , setdt] = useState<Idt |null>(null)
    const handledata = async () => {
      const res= await fetch('http://192.168.100.6:3000/api/user/info' , {
        method:'GET' , 
        headers:{
          'Content-type' : 'application/json' , 
        } , 
        'credentials' : 'include' ,
      })
      console.log('1')
      const data = await res.json()
      setdt(data.user)
      console.log('2')
      if(res.ok) {
        console.log('ok')
        console.log(data)
      } 
      if(!res.ok) {
        console.log('error')
      }
        
    }
useEffect(() => {
handledata()
},[])
    
    
  return (
    <View>
      
     {
      dt && (
      <View className='flex-col flex justify-center items-center h-full gap-y-10'>
  <Text className='text-[1.3rem] bg-slate-500 rounded-2xl text-center w-[60%]'>
        username:   {dt.username}
        </Text>
        <Text  className='text-[1.3rem] bg-slate-500 rounded-2xl text-center w-[60%]'>
          {dt.email}
        </Text>
        <Text  className='text-[1.3rem] bg-slate-500 rounded-2xl text-center w-[60%]'>
          {dt.role}
        </Text>
        <Text  className='text-[1.3rem] bg-slate-500 rounded-2xl text-center w-[60%]'>
          {dt.created_at}
        </Text>      

        <TouchableOpacity onPress={() => hnaldelogout()} >
          <Text className='text-[1.3rem] text-blue-600 text-center'>LOGOUT</Text>
        </TouchableOpacity>
      </View>
      )
     }
      
     
    </View>
  )
}

export default person