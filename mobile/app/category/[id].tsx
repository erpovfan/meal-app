import { useFetch } from '@/hooks/useFetch'
import { mealFunc } from '@/services/mealApi'
import { Ionicons } from '@expo/vector-icons'
import { Link, useLocalSearchParams, useRouter } from 'expo-router'
import React, { useEffect } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'

interface IFilcat {
    strMealThumb : string ,
    strMeal : string ,
    idMeal :string
  }
const CategoryId = () => {
    const router = useRouter()
    const {id} = useLocalSearchParams()
    
    const {
        data: Filcat,
        loading: Filcatloading,
        error: Filcaterror,
        FetchData: FilcatFetchData
      } = useFetch(() => mealFunc.filterbyCat(id.toString()), false)

   useEffect(() => {
if(id) {
    FilcatFetchData()
}
   }, [id])
   
  return (
    <View className='w-full flex-1'>
     <ScrollView className='w-full flex-1'
     showsVerticalScrollIndicator={false}
     contentContainerStyle={{
        width : '100%' , 
        
     }}
     >
<TouchableOpacity onPress={() => router.back()} className='z-30 absolute w-full top-8 left-6'>
<Ionicons name='arrow-back' size={35}    />
</TouchableOpacity>
        <Text className='text-[1.5rem] font-bold text-center pt-10 mb-5'>
            {id}
        </Text>
        {
            !Filcatloading && Filcat && Filcat.length>0 && (
<View className='flex flex-row flex-wrap justify-between w-full  pt-3'>
    {
Filcat.map((item : IFilcat) => (
    <Link href={{pathname:'/meal/[id]' , params:{id : item.idMeal}}} key={item.idMeal} className='' asChild>
    <TouchableOpacity className='w-[48%] ' >
    <View className='w-full items-center rounded-xl '>
        <Image source={{
            uri:item.strMealThumb
        }}
        className='size-[12rem] rounded-lg'
        resizeMode='cover'
        />
        <Text className='text-center'>{item.strMeal}</Text>
    </View>

    </TouchableOpacity>
    </Link>
) )
    }
</View>
            )
         }

     </ScrollView>
    </View>
  )
}

export default CategoryId