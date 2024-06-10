import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import { getDatabase, ref, get, child } from 'firebase/database';

interface Article {
  id: string;
  title: string;
  description: string;
  time: string;
  views: number;
  likes: number;
  comments: number;
  imageUrl: string;
}

const ArticlesList = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      const db = getDatabase();
      const dbRef = ref(db);
      const snapshot = await get(child(dbRef, 'articles'));
      const articlesList: Article[] = [];

      if (snapshot.exists()) {
        snapshot.forEach(childSnapshot => {
          const article = { id: childSnapshot.key, ...childSnapshot.val() } as Article;
          articlesList.push(article);
        });
      }

      setArticles(articlesList);
    };

    fetchArticles();
  }, []);

  const openArticleModal = (article: Article) => {
    setSelectedArticle(article);
  };

  const closeModal = () => {
    setSelectedArticle(null);
  };

  const renderItem = ({ item }: { item: Article }) => (
    <TouchableOpacity onPress={() => openArticleModal(item)}>
      <View style={styles.articleContainer}>
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.shortDescription}>{item.description.substring(0, 100)}...</Text>
        <Text style={styles.meta}>{`${item.time} | ${item.views} views | ${item.likes} likes | ${item.comments} comments`}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={articles}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
      <Modal
        visible={selectedArticle !== null}
        animationType="slide"
        onRequestClose={closeModal}
      >
        {selectedArticle && (
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedArticle.title}</Text>
              <Text style={styles.modalDescription}>{selectedArticle.description}</Text>
            </View>
          </View>
        )}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 10,
  },
  articleContainer: {
    marginBottom: 15,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 1,
    elevation: 1,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  shortDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  meta: {
    fontSize: 12,
    color: '#999',
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalContent: {
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    color: '#666',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 999,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007BFF',
  },
});

export default ArticlesList;

