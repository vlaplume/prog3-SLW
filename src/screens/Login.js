import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
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
        <Text style={styles.heading}>Formulario de Login</Text>

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
          <Text>Registro</Text>
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
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
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