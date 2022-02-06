import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import SurveyTemp from "./SurveyTemp";
import Loader from "../UI/Loader";

const Surveys = (props) => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
            {
                props.currRsch
                    ?
                    props.currRsch.map( (surv) =>
                        <SurveyTemp
                            key={surv.id}
                            data={surv}
                            navigation={props.navigation}
                            setSurv={props.setSurv}
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

export default Surveys;
