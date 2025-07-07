import { useDebounce } from '@/hooks/useDebounce';
import { mealFunc } from '@/services/mealApi';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
interface IItem {
  strMeal : string  , 
  strMealThumb : string , 
  idMeal : string , 
  strArea : string ,
}
const Search = () => {

  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
const Query = useDebounce(searchQuery ,1000)
  const preform = async () => {
    let results 
    if(!Query.trim()) {
    try {
      

 const res =await mealFunc.GETRandomMeals(12)
 results = res
 //@ts-ignore
 setRecipes(results)
      
    } catch (error) {
      console.log(error)
    }finally {
      setInitialLoading(false)
    }
  }
  if(Query.trim()) {
    setLoading(true)
    try {
  
      const res = await mealFunc.searchMEAL(Query)
      results = res
      setRecipes(results)
    } catch (error) {
      console.log(error)
      
    }finally {
      setLoading(false)
    }
      
  }

  }
useEffect(() => {
preform()
}, [Query])

  return (
    <View className='flex-1 w-full'>
      <View className='flex items-center w-full mb-3  mt-14'>
        <TextInput
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder='write something '
        className='bg-blue-200 rounded-3xl h-[3rem] w-[80%] '
        returnKeyType='search'
        />
        

      </View>
      <View className='w-full flex-1 '>
      
      <FlatList
    numColumns={2}
      data={recipes as IItem[]}
      columnWrapperStyle={{
        justifyContent :'space-between',
        marginHorizontal : 5,
        marginVertical : 5
      }}
      renderItem={({item}) => (
        <Link href={{pathname : '/meal/[id]' , params:{id : item.idMeal}}} asChild>
        <TouchableOpacity className='w-[48%] rounded-3xl  border-[1px] border-[#6868df93] items-center'>
       

<Image source={{
  uri: item.strMealThumb
}} className='size-[12rem] rounded-2xl mt-3 mx-2'
 />

<Text className='text-center'>{item.strMeal}</Text>

        </TouchableOpacity>
        </Link>
      )} />
      </View>
   
    </View>
  )
}

export default Search