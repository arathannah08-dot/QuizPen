import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,

                tabBarActiveTintColor: '#6C4AB6',
                tabBarInactiveTintColor: '#A39BAD',

                tabBarStyle: {
                    backgroundColor: '#FFFFFF',
                    borderTopColor: '#E5DFEF',
                    borderTopWidth: 1,
                    height: 68,
                    paddingBottom: 8,
                    paddingTop: 6,
                },

                tabBarLabelStyle: {
                    fontSize: 11,
                    fontWeight: '600',
                },
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
                    tabBarIcon: ({ color, size }) => (
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
                    tabBarIcon: ({ color, size }) => (
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
                    tabBarIcon: ({ color, size }) => (
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
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="person-outline"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}

