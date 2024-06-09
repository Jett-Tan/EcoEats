import { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Dimensions,
  ScrollView,
} from "react-native";
import { Icon } from "@/components/navigation/Icon";
import RewardTab from "../(tabs)/rewards";
import AddModal from "./add";

export default function RewardTabOverlay() {
  return(
    <>
      <AddModal/>
      <RewardTab/>
    </>
  )
}
