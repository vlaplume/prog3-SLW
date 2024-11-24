import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
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
      <View>
        {
          this.state.posteos === null ?
          <Text>Cargando...</Text> : 
          <View>
            { 
              this.state.posteos.length === 0 ?
              <Text>No hay posteos</Text> :
              <FlatList
                data={this.state.posteos}
                renderItem={({ item }) => <Card id={item.id} post={item.data} />}
                keyExtractor={item => item.id}
              />
            }
          </View>
        }
        <TouchableOpacity onPress={() => auth.signOut()}>Cerrar sesión</TouchableOpacity>
      </View>
    )
  }
}