import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
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
    db.collection("posts").onSnapshot(snapshot => {
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
      <View style={styles.container}>
        {
          this.state.posts === null ?
            <Text style={styles.loadingText}>Cargando...</Text> :
            <View style={styles.scroll}>
              {
                this.state.posts.length === 0 ?
                  <Text style={styles.noPostsText}>No hay posts</Text> :
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6E6FA',
    padding: 16,
  },
  loadingText: {
    color: '#6A1B9A',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  noPostsText: {
    color: '#6A1B9A',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  scroll: {
    flex: 1,
  }
});

