import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { LoginContext } from "../context/LoginContext";

import Homepage from "../screens/Homepage";
import Login from "../screens/Login";
import Register from "../screens/Register";
import MyHealthRecord from "../screens/MyHealthRecord";
import CreateReport from "../screens/CreateReport";
import HealthNew from "../screens/HealthNews";
import ReportList from "../screens/ReportList";
import ReportDetail from "../screens/ReportDetail";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const StackReport = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="ReportList" component={ReportList} />
            <Stack.Screen name="ReportDetail" component={ReportDetail} />
        </Stack.Navigator>
    );
};

const StackUser = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="ListUser" component={MyHealthRecord} />
            <Stack.Screen name="DetailUser" component={ReportList} />
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
                            } else if (route.name === "Reports") {
                                iconName = focused ? "list" : "list-outline";
                            } else if (route.name === "My Health Profile") {
                                iconName = focused
                                    ? "people"
                                    : "people-outline";
                            } else if (route.name === "Appoint") {
                                iconName = focused
                                    ? "add-circle"
                                    : "add-circle-outline";
                            } else if (route.name === "Logout") {
                                iconName = focused
                                    ? "add-circle"
                                    : "add-circle-outline";
                            }
                            return (
                                <Ionicons
                                    name={iconName}
                                    size={size}
                                    color={color}
                                />
                            );
                        },
                        tabBarActiveTintColor: "tomato",
                        tabBarInactiveTintColor: "gray",
                    })}
                >
                    <Tab.Screen name="Home" component={Homepage} />
                    {/* <Tab.Screen name="Appoint" component={CreateReport} /> */}
                    {/* Post combo */}

                    <Tab.Screen
                        options={{
                            headerShown: false,
                        }}
                        name="Reports"
                        component={StackReport}
                    />

                    {/* User combo */}
                    <Tab.Screen
                        options={{
                            headerShown: false,
                        }}
                        name="My Health Profile"
                        component={StackUser}
                    />
                </Tab.Navigator>
            ) : (
                <Tab.Navigator
                    initialRouteName="Login"
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName;
                            if (route.name === "Register") {
                                iconName = focused
                                    ? "person"
                                    : "person-outline";
                            } else if (route.name === "Login") {
                                iconName = focused
                                    ? "log-in"
                                    : "log-in-outline";
                            }
                            return (
                                <Ionicons
                                    name={iconName}
                                    size={size}
                                    color={color}
                                />
                            );
                        },
                        tabBarActiveTintColor: "tomato",
                        tabBarInactiveTintColor: "gray",
                    })}
                >
                    <Tab.Screen name="Register" component={Register} />
                    <Tab.Screen name="Login" component={Login} />
                </Tab.Navigator>
            )}
        </NavigationContainer>
    );
}
