import { authStyles } from '@/assets/styles/auth.styles.js';
import { COLORS } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
const signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter()
  
  const hanlesign = async () => {
    const [itoken , setitoken] = useState('')

    setLoading(true)
    try {
      const res = await fetch('http://192.168.100.6:3000/api/auth/login' , 
        {
          method: 'POST', 
          headers : {
            'Content-Type': 'application/json',
          } , 
          body:JSON.stringify({email , password})
        }
      )

      const data  = await res.json()
      setitoken(data.token)
      await AsyncStorage.setItem("token", itoken);
      if(!res.ok) {
        console.log('error')
        Alert.alert('failed')
        setLoading(false)
        return
       
      }
     if(res.ok) {
      router.push('/(tabs)/recipes')
      setLoading(false)
     }
    } catch (error) 
    {
      console.log(error)
      return
      
      
    }finally {
      setLoading(false)
    }
  }
  return (

    <View style={authStyles.container}>
      <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={authStyles.keyboardView}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0} >
        <ScrollView 
         contentContainerStyle={authStyles.scrollContent}
         showsVerticalScrollIndicator={false}
 
        >
          <View style={authStyles.imageContainer}>
            <Image
              source={require("../../assets/images/i1.png")}
              style={authStyles.image}
              resizeMode="contain"
            />
          </View>

          <Text style={authStyles.title}>Welcome Back</Text>
            {/* FORM CONTAINER */}
            <View style={authStyles.formContainer}>
            {/* Email Input */}
            <View style={authStyles.inputContainer}>
              <TextInput
                style={authStyles.textInput}
                placeholder="Enter email"
                placeholderTextColor={COLORS.textLight}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* PASSWORD INPUT */}
            <View style={authStyles.inputContainer}>
              <TextInput
                style={authStyles.textInput}
                placeholder="Enter password"
                placeholderTextColor={COLORS.textLight}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={authStyles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color={COLORS.textLight}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[authStyles.authButton, loading && authStyles.buttonDisabled]}
              onPress={() =>hanlesign()}
              disabled={loading}
              activeOpacity={0.8}
            >
              <Text style={authStyles.buttonText}>{loading ? "Signing In..." : "Sign In"}</Text>
            </TouchableOpacity>

            {/* Sign Up Link */}
            <TouchableOpacity
              style={authStyles.linkContainer}
              onPress={() => router.push('/(auth)/signup')}
            >
              <Text style={authStyles.linkText}>
                Don&apos;t have an account? <Text style={authStyles.link}>Sign up</Text>
              </Text>
            </TouchableOpacity>
          </View>


       


        </ScrollView>


       
      </KeyboardAvoidingView>
    </View>
  )
}

export default signin