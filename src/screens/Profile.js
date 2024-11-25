import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { auth, db } from "../firebase/config";
import Card from "../components/Card";


export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username : "",
      email : auth.currentUser.email,
      posteos : [],
      cargando : true
    };
  }

  componentDidMount() {
    let username;
   
    db.collection("users").where("Owner", "==", auth.currentUser.email).onSnapshot(doc => {
      doc.forEach(user => {
        username = user.data().username;
      })
      this.setState({username : username})
    })

    db.collection("posts").where("owner", "==", auth.currentUser.email).onSnapshot(doc => {
      let posteos = [];
      doc.forEach(posteo => {
        posteos.push({
          id: posteo.id,
          data: posteo.data()
        })
      })
      this.setState({posteos : posteos})
    })
  }

  render() {
    return (
      <View style={styles.container}>
        {
          this.state.posteos === null ?
          <Text style={styles.loadingText}>Cargando...</Text> : 
          <View>
            { 
              this.state.posteos.length === 0 ?
              <Text style={styles.noPostText} >No hay posteos</Text> :
              <FlatList
                data={this.state.posteos}
                renderItem={({ item }) => <Card id={item.id} post={item.data} />}
                keyExtractor={item => item.id}
              />
            }
          </View>
        }
        <TouchableOpacity  style={styles.logoutButton} onPress={() => auth.signOut()}>
          <text style={styles.logoutButtonText} >Cerrar sesión </text>
          </TouchableOpacity>
      </View>
    )
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
    fontWeight: 'bold',
    color: '#6A1B9A', 
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 18,
    color: '#333',
  },
  noPostText: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    marginTop: 20,
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: '#603b74',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#FFFFFF', 
    fontSize: 16,
  },
});