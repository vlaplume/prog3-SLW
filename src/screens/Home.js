import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import Card from '../components/Card';

import { db } from '../firebase/config';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: null,
    }
  }

  componentDidMount() {
    db.collection("posts").onSnapshot(snapshot => { // SELECT * FROM posts;
      const posts = []
      snapshot.forEach(doc => {
        posts.push({
          id: doc.id,
          data: doc.data()
        })
      })
      this.setState({ posts: posts })
    })
  }

  render() {
    return (
      <View>
        {
          this.state.posts === null ?
          <Text>Cargando...</Text> : 
          <View>
            { 
              this.state.posts.length === 0 ?
              <Text>No hay posts</Text> :
              <FlatList
                data={this.state.posts}
                renderItem={({ item }) => <Card id={item.id} post={item.data} />}
                keyExtractor={item => item.id}
              />
            }
          </View>
        }
      </View>
    )
  }
}

export default Home;