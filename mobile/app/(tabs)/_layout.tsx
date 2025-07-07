import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import React from 'react'

const _layout = () => {
  return (
    <Tabs 
    screenOptions={{
        headerShown:false ,
tabBarActiveTintColor: '#1058c2' , 
tabBarInactiveTintColor: '#518869' , 
tabBarStyle:{
    backgroundColor: '#fff',
    height: 80,
    marginBottom : 35 , 
    paddingBottom : 8 , 
    paddingTop : 8 , 
    borderTopColor : '#867faf',
    borderRadius : 50

}

    }}>
<Tabs.Screen
name='recipes'
options={{
    headerShown : false,
   tabBarLabelStyle : {
    fontSize : 12,
    fontWeight :'bold'
   } , 
title : 'Recipes' ,
tabBarIcon : ({color , focused , size}) => (
    <Ionicons name="fast-food-outline" size={size} color={color} />
    
) 
}}
/>

<Tabs.Screen
name='search'
options={{
    headerShown : false,
   tabBarLabelStyle : {
    fontSize : 12,
    fontWeight :'bold'
   } , 
title : 'Search' ,
tabBarIcon : ({color , focused , size}) => (
    <Ionicons name="search-outline" size={size} color={color} />
    
) 
}}
/>


<Tabs.Screen
name='favorites'
options={{
    headerShown : false,
   tabBarLabelStyle : {
    fontSize : 12,
    fontWeight :'bold'
   } , 
title : 'Favorites' ,
tabBarIcon : ({color , focused , size}) => (
    <Ionicons name="heart-outline" size={size} color={color} />
    
) 
}}
/>

<Tabs.Screen
name='person'
options={{
    headerShown : false,
   tabBarLabelStyle : {
    fontSize : 12,
    fontWeight :'bold'
   } , 
title : 'Person' ,
tabBarIcon : ({color , focused , size}) => (
    <Ionicons name="person" size={size} color={color} />
    
) 
}}
/>





    </Tabs>
  )
}

export default _layout