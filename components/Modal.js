import React from "react";
import { Modal as RNModal, View, Alert } from "react-native";

export default function CustomModal({ visible, children }) {
  return (
    <>
      {visible && (
        <RNModal
          animationType="slide"
          transparent={true}
          visible={visible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" , }}>
            <View style={{ backgroundColor: "#372f56", padding: 20, borderRadius: 10, width:"90%", shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}>
              {children}
            </View>
          </View>
        </RNModal>
      )}
    </>
  );
}