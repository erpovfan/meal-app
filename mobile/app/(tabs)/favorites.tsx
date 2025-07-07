import { useIsFocused } from '@react-navigation/native';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
const Favorites = () => {

interface Ifavmeal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}
  const [FAVmeals , setFAVmeals]  = useState<Ifavmeal[] | null>(null) 
  const isFocused = useIsFocused();
  const handleFavor = async () => {
    const res = await fetch('http://192.168.100.6:3000/api/user/allfavor' , {
      method :'GET' ,
      headers: {
        'Content-Type': 'application/json',
      } 
    })
    const data = await res.json()
    if(res.ok) {
setFAVmeals(data.allfavor)
    }
    if(!res.ok){
      console.log('someting going wrong')
    }
  }

  useEffect(() => {
if(isFocused) {
  handleFavor()
}

  },[isFocused])

  console.log(FAVmeals)
  return (
    <View className='w-full flex-1 '>
     <ScrollView className='w-full flex-1 '
     contentContainerStyle={{
      height:'100%' , 
      width:'100%'
     }}
     >
      {FAVmeals && FAVmeals.length>0 && (
        <FlatList
        ListHeaderComponent={() => (
          <Text className='text-center text-[1.4rem] text-[#2a65bd] font-[600] py-8'>Favorite meals</Text>
        )}
        data={FAVmeals}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'center',
          marginVertical : 5,
          gap : 10,
          
        }}
        scrollEnabled={false}
        renderItem={({item}) => (
         <Link href={{pathname:'/meal/[id]' , params:{id: item.idMeal}}} asChild>
         <TouchableOpacity className='size-[13rem] flex gap-y-2 items-center justify-center flex-col rounded-3xl border-[1px] border-[#755656]'> 

      
<Image
source={{
  uri:item.strMealThumb
}}
className='w-[12rem] h-[10rem] rounded-3xl ' 
/>
<Text>{item.strMeal}</Text>

          
         </TouchableOpacity>

        
         </Link>
        )}

        />
      )}


     </ScrollView>
    </View>
  )
}

export default Favorites