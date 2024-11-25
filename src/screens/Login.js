import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native';
import { auth } from "../firebase/config";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
    };
  }

  componentDidMount() {
    if (auth.currentUser !== null) {

      this.props.navigation.navigate("HomeMenu");
    }
  }

  loguearUsuario() {
    const { email, password } = this.state;

    if (email === "" || password === "") {
      this.setState({
        error: "Debe completar todos los campos del login",
      });
      return;
    }

    auth.signInWithEmailAndPassword(email, password)
      .then((res) => {

        this.props.navigation.navigate("HomeMenu");
      })
      .catch((error) => {

        this.setState({
          error: error.message,
        });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
        source={require("../../assets/FotoPostIt.png")} 
        style={styles.imagenLogin} 
        /> 
        <Text style={styles.heading}> Logueate! </Text>

        <TextInput
          style={styles.input}
          keyboardType="email-address"
          placeholder="Email"
          onChangeText={(text) => this.setState({ email: text })}
          value={this.state.email}
        />

        <TextInput
          style={styles.input}
          keyboardType="default"
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => this.setState({ password: text })}
          value={this.state.password}
        />

        {this.state.error ? <Text style={styles.error}>{this.state.error}</Text> : null}

        <TouchableOpacity
          onPress={() => this.loguearUsuario(this.state.email, this.state.password)}
          style={styles.button}
        >
          <Text>Iniciar sesión</Text>
        </TouchableOpacity>


        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Register")}
          style={styles.button}
        >
          <Text>No tengo cuenta</Text>
        </TouchableOpacity>
      </View>
    );
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
    color:'#6A1B9A'
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
    backgroundColor: '#6200EA',
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
});

export default Login;