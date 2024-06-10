import { useState, useEffect } from "react";

import HomeTab from '../(tabs)/home';
import AddModal from './add';

export default function HomeTabOverlay() {
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
      {modalVisible && <HomeTab/>}        
      {/* <RewardTab/> */}
    </>
  )
}
