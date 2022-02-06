import React from 'react';
import {SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import Loader from "../UI/Loader";
import ResearchTemp from "./ResearchTemp";

const Researches = (props) => {

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
            {
                props.researches
                    ?
                    props.researches.map( (rsch) =>
                            <ResearchTemp
                                rsch={rsch}
                                key={rsch.id}
                                setRsch={props.setRsch}
                                navigation={props.navigation}
                            />
                    )
                    :
                    <Loader/>
            }
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container:{
        backgroundColor:'sandybrown',
        width:'100%',
        height:'100%'
    }
})

export default Researches;
