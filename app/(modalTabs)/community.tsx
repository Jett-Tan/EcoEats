import { useState, useEffect } from 'react';

import CommunityTab from '../(tabs)/community';
import AddModal from './add';

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
      {modalVisible && <CommunityTab/>}        
      {/* {!modalVisible && <CommunityTab/>}         */}
    </>
  );
}