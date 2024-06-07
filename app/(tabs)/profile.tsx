import Input from "@/components/Input";
import { Icon } from "@/components/navigation/Icon";
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; //https://oblador.github.io/react-native-vector-icons/#MaterialIcons
import PrefTab from '../prefTab';
import BookmarkTab from '../savedTab';
import StarTab from '../starTab';

const ProfilePage: React.FC = () => {
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Low');
  const [dob, setDOB] = useState('01/01/2000');
  const [gender, setGender] = useState('Male');
  const [activeTab, setActiveTab] = useState('star');

  const renderIcon = (tabKey: string, focused: boolean) => {
    let iconName;

    switch (tabKey) {
      case 'star':
        iconName = focused ? 'star' : 'star-outline';
        break;
      case 'bookmark':
        iconName = focused ? 'bookmark' : 'bookmark-outline';
        break;
      case 'pref':
        iconName = focused ? 'list' : 'list';
        break;
      default:
        iconName = 'star';
        break;
    }
    return <MaterialIcons name={iconName} size={24} color={focused ? 'black' : 'gray'} />;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
    <ScrollView style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.headerRowLeft}>
          <Icon size={90} name="person-circle-sharp" />
          <Text style={styles.headerText}>John Low</Text>
        </View>
        <View style={styles.rating}>
          <Text style={styles.ratingText}>5.0</Text>
          <Text style={styles.starText}>⭐</Text>
        </View>
      </View>
      <View style={styles.subTitle}>
        <Text style={styles.subTitleText}>A profile sub title</Text>
      </View>
      <View style={styles.betweenTextBlock}></View>
      <View style={styles.personalParticulars}>
        <Text style={styles.personalParticularsTitle}>Personal Particulars</Text>
        <View style={styles.betweenTextBlock}></View>
        <Input
          type="First Name"
          placeholder="Enter your First Name"
          value={firstName}
          onChangeText={setFirstName}
          style={{
            inputBox: { width: 350 },
            input: styles.input
          }}
        />
        <Input
          type="Last Name"
          placeholder="Enter your Last Name"
          value={lastName}
          onChangeText={setLastName}
          style={{
            inputBox: { width: 350 },
            input: styles.input
          }}
        />
        <Input
          type="Date of Birth"
          placeholder="Enter your Date of Birth"
          value={dob}
          onChangeText={setDOB}
          style={{
            inputBox: { width: 350 },
            input: styles.input
          }}
        />
        <Input
          type="Gender"
          placeholder="Enter your Gender"
          value={gender}
          onChangeText={setGender}
          style={{
            inputBox: { width: 350 },
            input: styles.input
          }}
        />
      </View>

      <View style={styles.tabs}>
        <View style={styles.tabBar}>
          {['star', 'bookmark', 'pref'].map((tabKey) => (
            <Text
              key={tabKey}
              style={[styles.tabItem, activeTab === tabKey && styles.activeTab]}
              onPress={() => setActiveTab(tabKey)}
            >
              {renderIcon(tabKey, activeTab === tabKey)}
            </Text>
          ))}
        </View>
        <View style={styles.tabContent}>
          {activeTab === 'star' && <StarTab />}
          {activeTab === 'bookmark' && <BookmarkTab />}
          {activeTab === 'pref' && <PrefTab />}
        </View>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    padding: 20,
  },
  betweenTextBlock: {
    padding: 10,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 16,
    color: 'black',
    textAlign: 'left',
    marginTop: 0,
  },
  subTitleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'left',
    marginTop: 0,
  },
  rating: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 20,
  },
  starText: {
    fontSize: 20,
    marginLeft: 5,
  },
  personalParticulars: {
    marginBottom: 20,
  },
  personalParticularsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#dcdcdc',
    borderRadius: 5,
    padding: 5,
    flex: 1,
    textAlign: 'left',
  },
  tabs: {
    marginTop: 0,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tabItem: {
    padding: 10,
    textAlign: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: 'black',
  },
  tabContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
});

export default ProfilePage;
