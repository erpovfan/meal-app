import { Stack } from 'expo-router'
import React from 'react'

const _layout = () => {
  return (
   <Stack>
    <Stack.Screen
    name='signup'
  options={{
    title: 'Sign up',
    headerShown:false
  }} />
  <Stack.Screen
  name='signin'
  options={{
    title: 'Sign in',
    headerShown:false 
    
  }}

  />

  
   </Stack>
  )
}

export default _layout