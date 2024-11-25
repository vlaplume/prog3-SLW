import { StatusBar } from 'expo-status-bar';
import React, { Component } from "react";
import { Text, View, TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native';
import { auth, db } from "../firebase/config";

export default class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      username: "",
      errorMsg: "",
      errorEmail: "",
      errorUsername: "",
      errorPassword: "",
    }
  }

  registrarUsuario(email, password, username) {
    if (email === "") {
      this.setState({
        errorEmail: "Debe completar el email."
      })
    } else {
      this.setState({ errorEmail: "" })
    }

    if (username === "") {
      this.setState({
        errorUsername: "Debe completar el nombre de usuario."
      })
    } else {
      this.setState({ errorUsername: "" })
    }

    if (password === "") {
      this.setState({
        errorPassword: "Debe completar la contraseña."
      })
    } else {
      this.setState({ errorPassword: "" })
    }

    auth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        db.collection("users").add({ Owner: email, Username: username, })
          .then(() => {
            auth.signOut();
            this.props.navigation.navigate("Login");
          })

      }).catch((error) => {
        this.setState({
          errorMsg: error.message
        })
      })
  }






  render() {
    return (

      <View style={styles.container}>
        <Image
        source={require("../../assets/FotoPostIt.png")} 
        style={styles.imagenRegistro} 
        /> 

        <Text style={styles.heading}> Registrate! </Text>

        <TextInput style={styles.input}
          keyboardType='default'
          placeholder='Ingrse su nombre de usuario'
          onChangeText={text => this.setState({ username: text })}
          value={this.state.username} />
        <Text> {this.state.errorUsername}</Text>

        <TextInput style={styles.input}
          keyboardType="email-address"
          placeholder="Ingrese su email"
          onChangeText={text => this.setState({ email: text })}
          value={this.state.email} />
        <Text> {this.state.errorEmail}</Text>


        <TextInput style={styles.input}
          keyboardType="password"
          placeholder="Ingrese su constraseña"
          secureTextEntry={true}
          onChangeText={text => this.setState({ password: text })}
          value={this.state.password} />
        <Text> {this.state.errorPassword}</Text>




        <TouchableOpacity style={styles.button} onPress={() => this.registrarUsuario(this.state.email, this.state.password, this.state.username)}>
          <Text>Registrarse</Text>
        </TouchableOpacity>

        <Text style={styles.error}>{this.state.errorMsg}</Text>





        <Text> <TouchableOpacity onPress={() => this.props.navigation.navigate("Login")} style={styles.button}>Tengo cuenta</TouchableOpacity>
        </Text>

        <StatusBar style="auto" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: "#E6E6FA",
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#6A1B9A',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    width: 300,
    borderColor: '#ccc',
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#6A1B9A',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: 200,
  },

  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  imagenRegistro:{
    height: 200,
    width: 250,
  }
});