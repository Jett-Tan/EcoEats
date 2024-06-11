import { useState, useEffect } from "react";

import ProfilePage from '../(tabs)/profile';
import AddModal from './add';

export default function ProfilePageOverlay() {
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
      {modalVisible && <ProfilePage/>}        
      {/* <ProfilePage/> */}
    </>
  )
}
