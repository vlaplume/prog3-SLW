import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { auth } from "../firebase/config";

export default class Profile extends Component {
  render() {
    return (
      <div>
        <TouchableOpacity onPress={() => auth.signOut()}>Cerrar sesión</TouchableOpacity>
      </div>
    )
  }
}