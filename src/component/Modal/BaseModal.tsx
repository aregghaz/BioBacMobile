import {Modal, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
interface ModalCardProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function ModalCard({ isVisible, onClose, children }: ModalCardProps) {

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1} // Keep full opacity on overlay
        onPress={onClose} // Close modal when pressing outside
      >
       {children}

      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Semi-transparent background
  },

});
