import { Tabs } from 'expo-router'; 
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
            headerShown: false,
            }}
        >
            <Tabs.Screen
             name="home"
             options={{
                title: "Home",
                tabBarIcon: ({ color, size }) => (
                <Ionicons 
                 name="home-outline" 
                 size={size} 
                 color={color} 
                />
                ),                
             }}
            />

            <Tabs.Screen
             name="flashcards"
             options={{
                title: "Flashcards",
                tabBarIcon: ({color, size }) => (
                <Ionicons 
                 name="layers-outline" 
                 size={size} 
                 color={color} 
                />
                ),
              }}
            />

            <Tabs.Screen
             name="create"
             options={{
                title: "Create",
                tabBarIcon: ({color, size }) => (
                <Ionicons 
                 name="add-circle" 
                 size={size} 
                 color={color} 
                />
                ),
              }}
            />

            <Tabs.Screen
             name="quizzes"
             options={{
                title: "Quizzes",
                tabBarIcon: ({color, size }) => (
                <Ionicons 
                 name="bulb-outline" 
                 size={size} 
                 color={color} 
                />
                ),
             }}
            />

            <Tabs.Screen
             name="profile"
             options={{
                title: "Profile",
                tabBarIcon: ({color, size }) => (
                <Ionicons 
                 name="person-outline" 
                 size={size} 
                 color={color} 
                />
                ),
             }}
            />

            <Tabs.Screen
             name="createflash"
             options={{
                href: null,
             }}
            />

            <Tabs.Screen
             name="createquiz"
             options={{
                href: null,
             }}
            />
        </Tabs>
    );
}