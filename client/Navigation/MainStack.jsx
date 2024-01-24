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
import FamilyMemberList from "../screens/FamilyMemberList";
import ReportListOfMember from "../screens/ReportListOfMember";
import AddFamilyMemberForm from "../screens/AddFamilyMemberForm";
import Geolocation from "../screens/Geolocation";
import Result from "../screens/Result";
import CheckServices from "../screens/CheckServices";
import ChartPage from "../screens/ResultPage";
import LandingPage from "../screens/LandingPage";
import { Pressable } from "react-native";
import Summary from "../screens/Summary";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const StackReport = () => {
  return (
    <Stack.Navigator initialRouteName="FamilyMember">
      <Stack.Screen name="FamilyMember" component={FamilyMemberList} />
      <Stack.Screen
        name="CheckServices"
        component={CheckServices}
        options={{ headerShown: false }} // because sometimes back button is not there
      />
      <Stack.Screen
        name="ReportListOfMember"
        component={ReportListOfMember}
        options={{ headerShown: false }} // because sometimes back button is not there
      />
      <Stack.Screen name="AddFam" component={AddFamilyMemberForm} />
      <Stack.Screen name="ChooseLab" component={Geolocation} />
      <Stack.Screen name="ReportList" component={ReportList} />
      <Stack.Screen name="ChartPage" component={ChartPage} />
      <Stack.Screen
        name="ReportDetail"
        component={ReportDetail}
        options={{ headerShown: false }} // because sometimes back button is not there
      />
      <Stack.Screen name="Result" component={Result} />
    </Stack.Navigator>
  );
};

const StackUser = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ListUser" component={MyHealthRecord} />
      <Stack.Screen name="Summary" component={Summary} />
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
                iconName = focused ? "people" : "people-outline";
              } else if (route.name === "Appoint") {
                iconName = focused ? "add-circle" : "add-circle-outline";
              } else if (route.name === "Logout") {
                iconName = focused ? "add-circle" : "add-circle-outline";
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "tomato",
            tabBarInactiveTintColor: "gray",
          })}
        >
          <Tab.Screen
            name="Home"
            component={Homepage}
            options={{ headerShown: false }} // hide
          />
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
          screenOptions={
            ({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === "Register") {
                  iconName = focused ? "person" : "person-outline";
                } else if (route.name === "Login") {
                  iconName = focused ? "log-in" : "log-in-outline";
                } else if (route.name === "LandingPage") {
                  iconName = focused ? "home" : "home-outline";
                }
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: "tomato",
              tabBarInactiveTintColor: "gray",
            })
            // ,{ tabBarStyle: { display: "none" } } // hide bottom
          }
        >
          <Tab.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }} // hide
          />
          <Tab.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }} // hide
          />
          <Tab.Screen
            name="LandingPage"
            component={LandingPage}
            options={{ headerShown: false }} // hide
          />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}
