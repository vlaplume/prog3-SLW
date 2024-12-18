import React, { Component } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from "react-native";
import { auth, db } from "../firebase/config";
import Card from "../components/Card";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: auth.currentUser.email,
      posteos: [],
      cargando: true,
    };
  }



  componentDidMount() {
    console.log("test");
    db.collection("users")
      .where("Owner", "==", auth.currentUser.email)
      .onSnapshot((doc) => {
        doc.forEach((doc) => {
          this.setState({
            username: doc.data(),
          });
        });
      });

    db.collection("posts")
      .where("owner", "==", auth.currentUser.email)
      .onSnapshot((doc) => {
        let posteos = [];
        doc.forEach((posteo) => {
          posteos.push({
            id: posteo.id,
            data: posteo.data(),
          });
        });
        this.setState({ posteos: posteos });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require("../../assets/profileImaage.png")}
          style={styles.imagenPerfil}
        />

        <Text style={styles.username}>
          nombre de usuario: {this.state.username ? this.state.username.Username : "Cargando..."}
        </Text>
        <Text style={styles.email}>email:  {this.state.email}</Text>
        <Text style={styles.posts}>cantidad de posteos: {this.state.posteos.length}</Text>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => auth.signOut()}
        >
          <Text style={styles.logoutButtonText}>Cerrar sesión </Text>
        </TouchableOpacity>

        {this.state.posteos === null ? (
          <Text style={styles.loadingText}>Cargando...</Text>
        ) : (
          <View style={styles.scroll}>
            {this.state.posteos.length === 0 ? (
              <Text style={styles.noPostText}>No hay ningun posteo!</Text>
            ) : (
              <FlatList
                data={this.state.posteos}
                renderItem={({ item }) => (
                  <Card id={item.id} post={item.data} />
                )}
                keyExtractor={(item) => item.id}
              />
            )}

          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#E6E6FA",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6A1B9A",
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 18,
    color: "#333",
  },
  noPostText: {
    fontSize: 18,
    color: "black",
    textAlign: "center",
    marginTop: 20,
    color: "#603b74",
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: "#603b74",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  perfilUsuario: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  imagenPerfil: {
    width: 35,
    height: 35,
    borderRadius: 25,
    marginRight: 10,
  },
  username: {
    fontSize: 18,
    color: "black",
  },
  email: {
    fontSize: 18,
    color: "black",
    paddingTop: 10,
    marginTop: 5,
  },
  ButtonText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 18,
  },
  scroll: {
    flex: 1,
  },
  posts: {
    fontSize: 18,
    color: "black",
    paddingTop: 10,
    marginTop: 5,
  }
});
