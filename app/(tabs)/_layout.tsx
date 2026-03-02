import { Stack } from 'expo-router';
import React from 'react';

export default function Layout() {

  return (
  <Stack
      screenOptions={{
        title: "",
        headerStyle: {
          backgroundColor: '#60a9f2',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    />
  );
}
