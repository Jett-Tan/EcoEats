import { Tabs, Redirect } from 'expo-router';
import React from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { auth } from '@/components/auth/firebaseConfig';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  if (!auth.currentUser) {
    return (
      <Redirect href="/"/>
    );
  } else {
    // console.log('====================================');
    // console.log(auth.currentUser.email);
    // console.log('====================================');
  }
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="rewards"
        options={{
          title: 'Rewards',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'leaf' : 'leaf'} color={color} />
            ),
            
            }}
      />
      
      <Tabs.Screen
        name="spare"
        options={{
          title: 'Add',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'add-circle' : 'add-circle'} color={color}/>
          ),
          }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault()
            // console.log(navigation.getState())
            const state = navigation.getState().routeNames[navigation.getState().index]
            navigation.navigate("(modalTabs)/" + state)
          },
        })}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: 'Community',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'people' : 'people'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'person-circle' : 'person-circle'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
