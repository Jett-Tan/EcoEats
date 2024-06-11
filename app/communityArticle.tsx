import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { getDatabase, ref, get, child, update } from 'firebase/database';
import Icon from 'react-native-vector-icons/FontAwesome';

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

interface ArticlesListProps {
  searchQuery: string;
}

const ArticlesList: React.FC<ArticlesListProps> = ({ searchQuery }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [likedArticles, setLikedArticles] = useState<Set<string>>(new Set());

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

  const openArticleModal = async (article: Article) => {
    try {
      const db = getDatabase();
      const articleRef = ref(db, `articles/${article.id}`);
      const newViews = article.views + 1;

      await update(articleRef, { views: newViews });

      setArticles(articles.map(item =>
        item.id === article.id ? { ...item, views: newViews } : item
      ));

      setSelectedArticle({ ...article, views: newViews });
    } catch (error) {
      console.error('Failed to update views:', error);
    }
  };

  const closeModal = () => {
    setSelectedArticle(null);
  };

  const formatDescription = (description: string) => {
    return description.replace(/\\n/g, '\n');
  };

  const handleLike = async (articleId: string, currentLikes: number) => {
    try {
      const db = getDatabase();
      const articleRef = ref(db, `articles/${articleId}`);
      const isLiked = likedArticles.has(articleId);
      const newLikes = isLiked ? currentLikes - 1 : currentLikes + 1;

      await update(articleRef, { likes: newLikes });

      setArticles(articles.map(article =>
        article.id === articleId ? { ...article, likes: newLikes } : article
      ));

      setLikedArticles(prevLikedArticles => {
        const updatedLikes = new Set(prevLikedArticles);
        if (isLiked) {
          updatedLikes.delete(articleId);
        } else {
          updatedLikes.add(articleId);
        }
        return updatedLikes;
      });
    } catch (error) {
      console.error('Failed to like article:', error);
    }
  };

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }: { item: Article }) => {
    const isLiked = likedArticles.has(item.id);

    return (
      <TouchableOpacity onPress={() => openArticleModal(item)}>
        <View style={styles.articleContainer}>
          <Image source={{ uri: item.imageUrl }} style={styles.image} />
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.shortDescription}>{formatDescription(item.description.substring(0, 100))}...</Text>
          <View style={styles.metaContainer}>
            <Text style={styles.meta}>{`${item.time} | ${item.views} views | ${item.comments} comments`}</Text>
            <TouchableOpacity onPress={() => handleLike(item.id, item.likes)}>
              <Icon name="heart" size={24} color={isLiked ? 'red' : 'lightgrey'} />
              <Text style={styles.likesCount}>{item.likes}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredArticles}
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
            <ScrollView contentContainerStyle={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedArticle.title}</Text>
              <Image source={{ uri: selectedArticle.imageUrl }} style={styles.image} />
              <Text style={styles.modalDescription}>{formatDescription(selectedArticle.description)}</Text>
            </ScrollView>
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
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  meta: {
    fontSize: 12,
    color: '#999',
    marginTop: 25,
  },
  likesCount: {
    marginLeft: 5,
    fontSize: 14,
    color: '#666',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalContent: {
    padding: 20,
    paddingBottom: 40, // Extra padding at the bottom for better scrolling experience
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    color: '#666',
    marginTop: 20,
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
