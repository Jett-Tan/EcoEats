import React, { useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
  Image,
} from "react-native";
import { getDatabase, ref, push } from "firebase/database";
import * as ImagePicker from "expo-image-picker"; // Import ImagePicker
import ArticlesList from "../communityArticle";
import app from "../../components/auth/firebaseConfig"; // Ensure this path is correct

const Community = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [newArticle, setNewArticle] = useState({
    title: "",
    description: "",
    time: "",
    views: 0,
    likes: 0,
    comments: 0,
    imageUrl: "",
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const imageUrl = result?.assets?.[0]?.uri ?? ''; // Extracting URI from assets
      setNewArticle({ ...newArticle, imageUrl });
    }
  };

  const addArticle = async () => {
    if (newArticle.title && newArticle.description && newArticle.imageUrl) {
      try {
        const db = getDatabase(app);
        const articlesRef = ref(db, "articles");
        await push(articlesRef, {
          ...newArticle,
          time: new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }), // Set the current time
        });
        Alert.alert("Success", "Article added successfully!");
        setNewArticle({
          title: "",
          description: "",
          time: "",
          views: 0,
          likes: 0,
          comments: 0,
          imageUrl: "",
        });
        setModalVisible(false);
      } catch (error) {
        Alert.alert("Error", "Failed to add article");
      }
    } else {
      Alert.alert(
        "Error",
        "Please fill in the title, description, and upload an image"
      );
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
            onChangeText={(text) => setSearchQuery(text)}
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ArticlesList searchQuery={searchQuery} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalHeader}>Add New Article</Text>
            <TouchableOpacity onPress={pickImage}>
              <View style={styles.imagePicker}>
                {newArticle.imageUrl ? (
                  <Image
                    source={{ uri: newArticle.imageUrl }}
                    style={styles.selectedImage}
                  />
                ) : (
                  <Text style={styles.imagePlaceholder}>Select Image</Text>
                )}
              </View>
            </TouchableOpacity>
            <TextInput
              style={styles.newArticleInput}
              placeholder="Title"
              value={newArticle.title}
              onChangeText={(text) =>
                setNewArticle({ ...newArticle, title: text })
              }
            />
            <TextInput
              style={styles.newArticleContent}
              placeholder="Content"
              value={newArticle.description}
              onChangeText={(text) =>
                setNewArticle({ ...newArticle, description: text })
              }
              multiline={true}
              textAlignVertical="top" // Ensure the text starts from the top
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={addArticle}>
                <Text style={styles.modalButtonText}>Add</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setModalVisible(false)}
              >
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
    backgroundColor: "#f8f8f8",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 8,
    backgroundColor: "#fff",
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  newArticleInput: {
    width: "100%",
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 8,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  newArticleContent: {
    width: "100%",
    height: 100,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 8,
    backgroundColor: "#fff",
    marginBottom: 10,
    textAlignVertical: "top",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  imagePicker: {
    alignItems: "center",
    marginBottom: 20,
  },
  selectedImage: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
  },
  imagePlaceholder: {
    fontSize: 16,
    color: "#007BFF",
  },
});

export default Community;
