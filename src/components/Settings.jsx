import React, {useState} from 'react';
import {Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Modal, Alert} from "react-native";

const Settings = (props) => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Are you sure you want to logout?</Text>
                        <View style={styles.buttonWrap}>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => {
                                    setModalVisible(!modalVisible)
                                    props.setIsAuth(false)
                                }}
                            >
                                <Text style={styles.textStyle}>Yes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.textStyle}>No</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <View style={styles.backImage}>
                <Text style={styles.labelItem}>Logout</Text>
                <TouchableOpacity
                    style={{marginTop:5}}
                    onPress={() => setModalVisible(true)}
                >
                    <Image source={require('../assets/images/logout.png')}/>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'space-around',
        alignItems:'center',
    },
    backImage:{
        width:140,
        height:140,
        display:'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius:50
    },
    labelItem:{
        fontSize:16,
        marginRight:15,
        color:'sandybrown',
        fontWeight:'700'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    buttonWrap:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',

    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        margin:20,
    },
    buttonOpen: {
        backgroundColor: "#90c900",
    },
    buttonClose: {
        backgroundColor: "sandybrown",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize:20
    }
})

export default Settings;
