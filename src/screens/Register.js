import { StatusBar } from 'expo-status-bar';
import React, { Component } from "react";
import { Text, View, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { auth, db } from "../firebase/config";

export default class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      username: "",
      error: "",
    }
  }

  registrarUsuario(email, password, username) {
    if (email === "" || password === "" || username === "") {
      this.setState({
        error : "Debe completar todos los campos del registro."
      })
      return 
    }

    if (password.length < 6) {
      this.setState({
        error: "La contraseña debe tener al menos 6 caracteres."
      })
      return
    }

    auth.createUserWithEmailAndPassword(email, password) // Cuando se crea el usuario se inicia sesión automáticamente (por defecto) 
      .then(res => {
        db.collection("users").add({ Owner: email, Username: username, })
          .then(() => {
            auth.signOut();
            this.props.navigation.navigate("Login");
          })
          .catch(error => {
            this.setState({
              error: error.message
            })
          })
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Formulario de Registro</Text>

        <TextInput style={styles.input}
          keyboardType='default'
          placeholder='Ingrse su nombre de usuario'
          onChangeText={text => this.setState({ username: text })}
          value={this.state.username} />


        <TextInput style={styles.input}
          keyboardType="email-address"
          placeholder="Ingrese su email"
          onChangeText={text => this.setState({ email: text })}
          value={this.state.email} />

        <TextInput style={styles.input}
          keyboardType="password"
          placeholder="Ingrese su constraseña"
          secureTextEntry = {true}
          onChangeText={text => this.setState({ password: text })}
          value={this.state.password} />

        <TouchableOpacity onPress={() => this.registrarUsuario(this.state.email, this.state.password, this.state.username)}>
          <Text>Registrarse</Text>
        </TouchableOpacity>

        {
          this.state.error ?
          <Text style={styles.error}>{this.state.error}</Text> :
          null
        }

        <Text> <TouchableOpacity onPress={() => this.props.navigation.navigate("Login")}>Login</TouchableOpacity>
        </Text>

        <StatusBar style="auto" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {

  },
  input: {
    border: "1px solid #000000",
    borderRadius : "8pt"
  },
  error: {
    color: "rgb(255,0,0)",
  }
});