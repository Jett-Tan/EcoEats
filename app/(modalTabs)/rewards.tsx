import { useState, useEffect } from "react";

import RewardTab from "../(tabs)/rewards";
import AddModal from "./add";

export default function CommunityTabOverlay() {
  const [modalVisible, setModalVisible] = useState(true);

  useEffect(() => {
    setModalVisible(true);
  }, []);

  const toggleVisible = () => {
    setModalVisible(!modalVisible);
  }

  return (
    <>
      <AddModal modalVisible={modalVisible} toggleVisible={toggleVisible}/>
      {modalVisible && <RewardTab/>}        
      {/* <RewardTab/> */}
    </>
  )
}
