import React, { useState } from 'react';
import { SafeAreaView, StatusBar, Text, TextInput, View, StyleSheet, TouchableOpacity, Alert, Modal } from 'react-native';
import { getDatabase, ref, push } from 'firebase/database';
import ArticlesList from '../communityArticle';
import app from '../../components/auth/firebaseConfig'; // Ensure this path is correct

const Community = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [newArticle, setNewArticle] = useState({
    title: '',
    description: '',
    time: '',
    views: 0,
    likes: 0,
    comments: 0,
    imageUrl: ''
  });

  const addArticle = async () => {
    if (newArticle.title && newArticle.description) {
      try {
        const db = getDatabase(app);
        const articlesRef = ref(db, 'articles');
        await push(articlesRef, {
          ...newArticle,
          time: new Date().toISOString() // Set the current time
        });
        Alert.alert('Success', 'Article added successfully!');
        setNewArticle({
          title: '',
          description: '',
          time: '',
          views: 0,
          likes: 0,
          comments: 0,
          imageUrl: ''
        });
        setModalVisible(false);
      } catch (error) {
        Alert.alert('Error', 'Failed to add article');
      }
    } else {
      Alert.alert('Error', 'Please fill in the title and description');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 40 }}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Community</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search articles..."
            value={searchQuery}
            onChangeText={text => setSearchQuery(text)}
          />
          <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ArticlesList />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalHeader}>Add New Article</Text>
            <TextInput
              style={styles.newArticleInput}
              placeholder="Title"
              value={newArticle.title}
              onChangeText={text => setNewArticle({ ...newArticle, title: text })}
            />
            <TextInput
              style={styles.newArticleInput}
              placeholder="Description"
              value={newArticle.description}
              onChangeText={text => setNewArticle({ ...newArticle, description: text })}
            />
            <TextInput
              style={styles.newArticleInput}
              placeholder="Image URL"
              value={newArticle.imageUrl}
              onChangeText={text => setNewArticle({ ...newArticle, imageUrl: text })}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={addArticle}>
                <Text style={styles.modalButtonText}>Add</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 8,
    backgroundColor: '#fff',
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  newArticleInput: {
    width: '100%',
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 8,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Community;
