import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Homepage from "../screens/Homepage";
import Pay from "../screens/Pay";

import { useContext } from "react";
import { LoginContext } from "../context/LoginContext";
import Login from "../screens/Login";
import ChartPage from "../screens/Chart";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const StackPost = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Homepage} />
      <Stack.Screen name="DetailPost" component={Homepage} />
    </Stack.Navigator>
  );
};

const StackUser = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ListUser" component={Homepage} />
      <Stack.Screen name="DetailUser" component={Homepage} />
    </Stack.Navigator>
  );
};

export default function MainStack() {
  const { isLoggedIn } = useContext(LoginContext);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === "Home") {
                iconName = focused ? "home" : "home-outline";
              } else if (route.name === "Post") {
                iconName = focused ? "list" : "list-outline";
              } else if (route.name === "User") {
                iconName = focused ? "people" : "people-outline";
              } else if (route.name === "AddPost") {
                iconName = focused ? "add-circle" : "add-circle-outline";
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "tomato",
            tabBarInactiveTintColor: "gray",
          })}
        >
          <Tab.Screen name="Home" component={Pay} />
          <Tab.Screen name="AddPost" component={ChartPage} />
          {/* Post combo */}

          <Tab.Screen
            options={{
              headerShown: false,
            }}
            name="Post"
            component={StackPost}
          />

          {/* User combo */}
          <Tab.Screen
            options={{
              headerShown: false,
            }}
            name="User"
            component={StackUser}
          />
        </Tab.Navigator>
      ) : (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === "Register") {
                iconName = focused ? "person" : "person-outline";
              } else if (route.name === "Login") {
                iconName = focused ? "log-in" : "log-in-outline";
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "tomato",
            tabBarInactiveTintColor: "gray",
          })}
        >
          <Tab.Screen name="Register" component={Pay} />
          <Tab.Screen name="Login" component={Login} />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}
