import { Icon } from "@/components/navigation/Icon";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function RewardTab() {
  const [activeTab, setActiveTab] = useState("MyWallet");
  const slideAnim = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef(null);

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: activeTab === "MyWallet" ? 0 : -width,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [activeTab, slideAnim]);

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setActiveTab(currentIndex === 0 ? "MyWallet" : "MyRewards");
  };

  const handleRedeemNowPress = () => {
    router.push('/redeemEcoPoints');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Rewards</Text>
      </View>
      <View style={styles.navbar}>
        <TouchableOpacity
          style={[
            styles.navItem,
            activeTab === "MyWallet" && styles.navItemActive,
          ]}
          onPress={() => {
            setActiveTab("MyWallet");
            scrollRef.current.scrollTo({ x: 0 });
          }}
        >
          <Text
            style={
              activeTab === "MyWallet" ? styles.navTextActive : styles.navText
            }
          >
            My Wallet
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.navItem,
            activeTab === "MyRewards" && styles.navItemActive,
          ]}
          onPress={() => {
            setActiveTab("MyRewards");
            scrollRef.current.scrollTo({ x: width });
          }}
        >
          <Text
            style={
              activeTab === "MyRewards" ? styles.navTextActive : styles.navText
            }
          >
            My Rewards
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        ref={scrollRef}
      >
        <View style={styles.tab}>
            <Text style={styles.pointsText}>My Eco Points:</Text>
            <View style={{flexDirection:"row"}}>
              <Text style={[styles.pointsValue,{marginRight:10}]}>150</Text>
              <Icon name="leaf" size={48} color="#000" />
            </View>
            <TouchableOpacity style={styles.redeemButton} onPress ={handleRedeemNowPress}>
              <Text style={styles.redeemButtonText}>Redeem Now</Text>
            </TouchableOpacity>
            <Text style={styles.expiryText}>No Eco Points expiring yet.</Text>
          <View style={styles.transactionHistory}>
            <Text style={styles.transactionText}>Transaction History</Text>
            <SafeAreaView
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={styles.noTransactionText}>
                You have no recent transaction.
              </Text>
            </SafeAreaView>
          </View>
        </View>
        <View style={styles.tab}>
          <SafeAreaView style={{ width: "100%", alignItems: "flex-end" }}>
            <TouchableOpacity>
              <Text style={styles.viewHistoryText}>View History</Text>
            </TouchableOpacity>
          </SafeAreaView>
          <View style={styles.transactionHistory}>
            <SafeAreaView
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={styles.transactionText}>
                You don't have any rewards yet
              </Text>
              <Text style={styles.noTransactionText}>
                Start exchanging Ecopoints for rewards!
              </Text>
            </SafeAreaView>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#E0E0E0",
    marginTop: 50,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  navItem: {
    padding: 10,
    alignItems: "center",
  },
  navItemActive: {
    borderBottomWidth: 2,
    borderBottomColor: "#49B379",
  },
  navText: {
    fontSize: 16,
    color: "#7F7F7F",
  },
  navTextActive: {
    fontSize: 16,
    color: "#49B379",
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    overflow: "hidden",
  },
  slider: {
    flexDirection: "row",
    width: width * 2,
  },
  tab: {
    width: width,
    padding: 20,
    alignItems: "center",
  },
  pointsText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  pointsValue: {
    fontSize: 48,
    fontWeight: "bold",
  },
  redeemButton: {
    marginTop: 20,
    backgroundColor: "#49B379",
    padding: 10,
    borderRadius: 5,
  },
  redeemButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  expiryText: {
    marginTop: 10,
    fontSize: 14,
    color: "#7F7F7F",
  },
  transactionHistory: {
    marginTop: 20,
    width: "100%",
    padding: 20,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    height: "50%",
  },
  transactionText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  noTransactionText: {
    marginTop: 10,
    fontSize: 14,
    color: "#7F7F7F",
    textAlign: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    paddingVertical: 10,
  },
  footerItem: {
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#7F7F7F",
  },
  footerTextActive: {
    fontSize: 14,
    color: "#000000",
    fontWeight: "bold",
  },
  viewHistoryText: {
    color: "#0062E0",
    fontSize: 12,
    textAlign: "right",
    marginTop: 10,
    marginRight: 10,
  },
});
