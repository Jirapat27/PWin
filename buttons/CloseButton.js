// buttons/CloseButton.js

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CloseButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.closeButton}>
      <Text style={styles.closeButtonText}>ปิด</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  closeButton: {
    height: 59,
    backgroundColor: '#FF9A62',
    borderRadius: 10,
    padding: 10,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'semibold',
  },
});

export default CloseButton;
