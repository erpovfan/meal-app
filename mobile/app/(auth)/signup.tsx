import { authStyles } from '@/assets/styles/auth.styles'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'

const signup = () => {
  const [email , setEmail ] = useState('')
  const [password , setPassword] = useState('')
  const [loading , setLoading] = useState(false)
  const [error , setError] = useState('')
  const [ username  , setusername] = useState('')
  const router = useRouter()

  const handlesign = async () => {

setLoading(true) 
try {
  const res = await fetch('http://192.168.100.6:3000/api/auth/register' , {
    method : 'POST' ,
    headers : {
      'Content-Type' : 'application/json',
    } , 
    body : JSON.stringify({email , username , password , role:'user'})
  })

  if(!res.ok) {
    setLoading(false)
    console.log('error')
    Alert.alert('something goes wrong')
    return 
  }

  if(res.ok) {
    setLoading(false)
    console.log('success')
    router.push('/(auth)/signin')

  }
} catch (err) {
  console.log(err)
  return
  
}finally {
  setLoading(false)
}
  }
  return (
    <View style={authStyles.container}>
     <KeyboardAvoidingView
     
     behavior={Platform.OS === "ios" ? "padding" : "height"}
     keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
     style={authStyles.keyboardView}>
      <ScrollView
       contentContainerStyle={authStyles.scrollContent}
       showsVerticalScrollIndicator={false}
      
      >
         {/* Image Container */}
         <View style={authStyles.imageContainer}>
            <Image
              source={require("../../assets/images/i2.png")}
              style={authStyles.image}
              resizeMode="contain"
            />
          </View>

          <Text style={authStyles.title}>Create Account</Text>

<View className='flex-col flex gap-y-5 pt-[2rem]'>
  <TextInput
  placeholder='Enter name'
placeholderTextColor='#4A148C'
className='pt-2 px-3 border-[1px] border-[#2b6db0] text-[1.2rem] h-[4rem]' 
value={username}
onChangeText={setusername}
  
      />
      <TextInput
  placeholder='Enter Email'
placeholderTextColor='#4A148C'

className='pt-4 px-3 border-[1px] border-[#2b6db0] text-[1.2rem] h-[4rem]'
value={email}
onChangeText={setEmail}
  
      />

<TextInput
  placeholder='Enter password'
placeholderTextColor='#4A148C'
className='pt-2 px-3 border-[1px] border-[#2b6db0] text-[1.2rem] h-[4rem]'
value={password}
onChangeText={setPassword}
  
      />
  

</View>
<TouchableOpacity onPress={() =>handlesign()} className='bg-violet-600  mt-4 '>
  <Text className='text-[1.2rem]  py-4  text-center text-white'>
    SEND
  </Text>
</TouchableOpacity>

<TouchableOpacity
onPress={() => router.replace('/(auth)/signin')}
className=' pt-7'>
  <Text className='text-center text-[#1771bc] text-[1.2rem]' >
    I already have an acoount , click me
  </Text>
</TouchableOpacity>

      </ScrollView>
     </KeyboardAvoidingView>
    </View>
  )
}

export default signup