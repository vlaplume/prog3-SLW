import React from 'react'
import Home from "../screens/Home";
import Search from "../screens/Search";
import NewPost from "../screens/NewPost"; 
import Profile from '../screens/Profile';
import {AntDesign, Ionicons} from "@expo/vector-icons"; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Tab = createBottomTabNavigator();

const HomeMenu = ()=>  {
  return (
    <Tab.Navigator screenOptions={{tabBarShowLabel:false, headerShown:false, tabBarStyle: { backgroundColor: '#a091c3' }}} 
     >
      <Tab.Screen name="Home" component={Home} options={{tabBarIcon:()=><AntDesign name="home" size={25} color="#6A1B9A"/>}}/>
      <Tab.Screen name="Search" component={Search} options={{tabBarIcon:()=><Ionicons name="search" size={25} color="#6A1B9A"/>}}/>
      <Tab.Screen name="NewPost" component={NewPost} options={{tabBarIcon:()=><AntDesign name="pluscircleo" size={25} color="#6A1B9A"/>}}/>
      <Tab.Screen name="Profile" component={Profile} options={{tabBarIcon:()=><AntDesign name="user" size={25} color="#6A1B9A"/>}}/>
    </Tab.Navigator>
  )
}

export default HomeMenu;
