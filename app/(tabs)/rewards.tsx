import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useState } from "react";



export default function RewardTab() {

  const [activeTab, setActiveTab] = useState("MyWallet");


return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Rewards</Text>
      </View>
      <View style={styles.navbar}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveTab("MyWallet")}
        >
          <Text style={activeTab === "MyWallet" ? styles.navTextActive : styles.navText}>
            My Wallet
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveTab("MyRewards")}
        >
          <Text style={activeTab === "MyRewards" ? styles.navTextActive : styles.navText}>
            My Rewards
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        {activeTab === "MyWallet" && (
          <>
            <Text style={styles.pointsText}>My Eco Points:</Text>
            <Text style={styles.pointsValue}>0</Text>
            <TouchableOpacity style={styles.redeemButton}>
              <Text style={styles.redeemButtonText}>Redeem Now</Text>
            </TouchableOpacity>
            <Text style={styles.expiryText}>No Eco Points expiring yet.</Text>
            <View style={styles.transactionHistory}>
              <Text style={styles.transactionText}>Transaction History</Text>
              <SafeAreaView
                style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
              >
                <Text style={styles.noTransactionText}>
                  You have no recent transaction.
                </Text>
              </SafeAreaView>
            </View>
          </>
        )}
        {activeTab === "MyRewards" && (
          <>
            {/* Add your My Rewards view content here */}
            <Text style={styles.pointsText}>My Rewards Content</Text>
            {/* Example content */}
            <View style={styles.transactionHistory}>
              <Text style={styles.transactionText}>Rewards History</Text>
              <SafeAreaView
                style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
              >
                <Text style={styles.noTransactionText}>
                  You have no rewards history yet.
                </Text>
              </SafeAreaView>
            </View>
          </>
        )}
      </View>
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
  },
  navText: {
    fontSize: 16,
    color: "#7F7F7F",
  },
  navTextActive: {
    fontSize: 16,
    color: "#00FF00",
    fontWeight: "bold",
    // borderBottomColor: "49B379",
    // borderBottomWidth: 1,
  },
  content: {
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
    backgroundColor: "#00FF00",
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
});
