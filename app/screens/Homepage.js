import React from 'react';
import Abutton from '../component/Abutton';
import { StyleSheet, View } from 'react-native';

function Homepage({navigation}) {
    return (
        <View style={styles.container}>
            <Abutton title={"Logout"}
            onPress={()=>navigation.navigate('Login')}/>
            
        </View>

    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }
})

export default Homepage;