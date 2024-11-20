import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeMenu from "./src/components/HomeMenu";
import Register from "./src/screens/Register";
import Login from "./src/screens/Login";

import { auth } from "./src/firebase/config";


const Stack = createNativeStackNavigator()

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logueado: false,
    }
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      this.setState({ logueado: user ? true : false });
    });
  }
  
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          {
            this.state.logueado ?
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} /> :
            <Stack.Group>
              <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
              <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            </Stack.Group>
          }
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
