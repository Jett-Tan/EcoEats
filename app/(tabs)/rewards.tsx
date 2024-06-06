import { View, Text, StyleSheet } from "react-native";

export default function RewardTab() {
  return (
    <View style={styles.rewardsHeader}>
      <Text style={{ fontSize: 25, fontWeight: "bold", paddingTop: 60 }}>
        Rewards
      </Text>
      <View style={styles.rewardsTab}>
        <View>
          <Text>My Wallet</Text>
        </View>
        <View>
          <Text>My Rewards</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  rewardsHeader: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ecf0f1",
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  rewardsTab: {
    flexDirection: "row",
    marginTop: 10,
  },
});
