import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
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

  const renderItem = ({ item }: { item: Article }) => (
    <View style={styles.articleContainer}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.meta}>{`${item.time} | ${item.views} views | ${item.likes} likes | ${item.comments} comments`}</Text>
    </View>
  );

  return (
    <FlatList
      data={articles}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
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
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  meta: {
    fontSize: 12,
    color: '#999',
    marginTop: 10,
  },
});

export default ArticlesList;
