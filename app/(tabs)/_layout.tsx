import { Tabs } from 'expo-router';
import React from 'react';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].background,
          borderTopColor: Colors[colorScheme ?? 'light'].border,
          height: 80,
          paddingBottom: 20,
          paddingTop: 10,
        },
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Главная',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name='house' color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='chat'
        options={{
          title: 'Чат',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name='message' color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'Профиль',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name='person' color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
