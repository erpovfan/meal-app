import { useFetch } from '@/hooks/useFetch'
import { mealFunc } from '@/services/mealApi'
import { Link } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
interface iMeal {
  strMeal : string , 
  strMealThumb : string ,
  strTags :string ,
  strInstructions :string ,
  strArea :string ,
  strCategory :string ,
}
interface IFilcat {
  strMealThumb : string ,
  strMeal : string ,
  idMeal :string
}
interface ICAT {
  idCategory : string , 
  strCategory : string ,
  strCategoryThumb : string 
}
const Recipes = () => {
  const [query , setquery] = useState('')
  const [filterdfilcat , setfilterdfilcat] = useState<IFilcat[] | null>(null)
  const [filCatQuery , setFilCatQuery] = useState('beef')
  const [meal , setmeal ] = useState<iMeal | null>(null)
  const [CATId , setCATid] =useState('') 
  const [Cat , setCat] = useState<ICAT | null>(null)
  const {data , loading , error ,FetchData , reset } = useFetch(() => mealFunc.RandomSingleMeal() ,  true)
  const {
    data: CATdata,
    loading: CATloading,
    error: CATerror,
    FetchData: CATFetch
  } = useFetch(() =>
     mealFunc.CATmeal(), true)

     useEffect(() => {
      if(data && data.length>0) {
        setmeal(data[0])
      }
      
      
      
      } , [data ])

    

      

  const {
    data: Filcat,
    loading: Filcatloading,
    error: Filcaterror,
    FetchData: FilcatFetchData
  } = useFetch(() => mealFunc.filterbyCat(filCatQuery), false)
  


useEffect(() => {
if(filCatQuery.trim()) {{
 
FilcatFetchData()
}}


},[filCatQuery])

useEffect(() => {
if(Filcat && Filcat.length>0) {
  setfilterdfilcat(Filcat.slice(0,4))
}
} , [Filcat])


  return (
    <View className='w-full flex-1 flex-col items-center'>
      <ScrollView className='flex-1 w-full'
      contentContainerStyle={{
        display:'flex' , 
        flexDirection :'column' ,
        alignItems:'center',

      }}>
      <View className='w-full flex flex-row items-center justify-center mt-10'>
        <Image source={require('@/assets/images/chicken.png')} resizeMode='cover' className='size-28'  />
        <Image source={require('@/assets/images/pork.png')} resizeMode='cover' className='size-28'  />
        <Image source={require('@/assets/images/lamb.png')} resizeMode='cover'  className='size-28' />
      </View>

      {
        data && meal && data.length>0 && !loading && (
          <View className='w-full items-center mt-9 relative'>
<Image source={{
  uri: meal.strMealThumb
}}
style={{
  opacity:0.8
}}
resizeMode='cover'
className='w-[90%] h-[15rem] rounded-xl '/>
<Text className='absolute bottom-16 text-black text-[1.3rem] left-10'>{meal.strMeal}</Text>
<View className='flex flex-row gap-x-2 items-center absolute bottom-4 left-10'>
  <Text className='text-black text-[1rem]'>{meal.strCategory}</Text>
  <Text className='text-black text-[1rem]'>{meal.strArea}</Text>
  <Text className='text-black text-[1rem]'>{meal.strTags}</Text>
</View>
      </View>
        )
      }



      {
        CATdata && !CATloading &&  CATdata.length>0 && (
          <View className='w-full mt-9 ml-4 '>
        <ScrollView
        
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        
        >
          {
            CATdata.map((item :ICAT  ) => (
             
                <TouchableOpacity key={item.idCategory}
                onPress={() =>setFilCatQuery(item.strCategory) 
                  
                }
              className='rounded-2xl border-[1px] border-[#67b0ae] w-28 h-[8rem] flex flex-col mx-3 justify-center items-center'
              >
                <Image source={{
                  uri:item.strCategoryThumb
                }}
                
                className='size-20 rounded-full border-[1px] border-white'
                resizeMode='cover'/>

                <Text className='pt-1'>{item.strCategory}</Text>
              </TouchableOpacity>
              
            ) )
          }

        </ScrollView>
      </View>
        )
      }
<Text className='text-[1.5rem] font-bold  mt-5'>{filCatQuery}</Text>
      {Filcat && filterdfilcat && filterdfilcat.length>0 && (

        <View className='flex flex-row flex-wrap justify-between px-3 w-full mt-4'>
          
          {filterdfilcat.map((item) => (
<Link  href={{pathname:'/meal/[id]' , params:{id:item.idMeal}}} asChild key={item.idMeal} >

<TouchableOpacity  className='w-[48%] mb-4 bg-white rounded-xl p-2'
>

  <Image source={{
    uri:item.strMealThumb
  }}
  resizeMode='cover' 
  className='w-full h-32 rounded-lg'
  />
  
  <Text className='mt-2 text-center text-black'>
    {item.strMeal}
  </Text>
</TouchableOpacity>


</Link>
          ))}
        </View>
      )} 

    <Link href={{pathname:'/category/[id]' , params:{id : filCatQuery }}} className='text-blue-600 text-[1.2rem] py-2 pb-4'  >
    More..

    </Link>
      </ScrollView>
    </View>
  )
}

export default Recipes