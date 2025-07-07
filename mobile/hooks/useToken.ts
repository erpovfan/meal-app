import AsyncStorage from "@react-native-async-storage/async-storage"
import { useRouter } from "expo-router"
import { useEffect } from "react"
export const useToken = () => {
    const router = useRouter()
   useEffect(() => {
    const Check = async () => {
        const token = await AsyncStorage.getItem('token')
        if (token) {
            
            router.push('/(auth)/signup')
        }
    }
    
Check()
   },[])
}