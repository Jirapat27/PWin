/* import React, { useCallback, useRef , useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, Button, TouchableOpacity } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Text, View } from 'react-native'
import React, { Component } from 'react'




export default function BottomSheet() {
  
  // hooks
  const sheetRef = useRef<BottomSheet>(null);
  const [isOpen, setOpen] = useState(true);
  
  // variables
  const snapPoints = ["50%", "100%"];
  const handleSnapPress = useCallback((index)=>{
    sheetRef.current?.snapToIndex(index);
    setOpen(true);
  }, []);


  // render
  return (
    <SafeAreaView style={styles.sheetcontainer}>
          <TouchableOpacity
        style={styles.button}
        onPress={() => handleSnapPress(0)}
      >
        <Text>sheet</Text>
      </TouchableOpacity>
      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose ={true}
        onClose={()=> setIsOpen(false)}
      >
        <BottomSheetView>
          <Text>Awesome 🔥</Text>
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sheetcontainer: {
    flex: 1,
    backgroundColor: 'gray',
    alignItems: 'center',

  },
});

 */