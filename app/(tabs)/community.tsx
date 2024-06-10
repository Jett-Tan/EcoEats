import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import ArticlesList from '../communityArticle';

const community = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <ArticlesList />
    </SafeAreaView>
  );
};
export default community;
