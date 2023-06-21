import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, TextInput } from 'react-native';
import { head2 } from '../config/textfont';
import colors from '../config/colors';
import Abutton from '../component/Abutton';

function LoginScreen({navigation}) {

const [fdata, setfdata] = useState({
    email: "",
    conemail: ""
});
const [errmsg,seterrmsg]=useState(null);

const handleSubmit = () =>{
   // console.log(fdata)
    if (  fdata.email ==""|| fdata.conemail==""){
                    seterrmsg("Please enter all feilds");
                    return;         
        }
        else{
            if(fdata.email != fdata.conemail){
                seterrmsg("credentials did not match");
                return;
            }
            else{
                fetch('http://172.16.1.167:3000/signin',{
                    method:'POST',
                    headers:{
                        'Content-Type': "application/json"  
                    },
                    body: JSON.stringify(fdata)
                })
                .then(res =>res.json()).then(
                    data =>{
                       //console.log( data)
                       if (data.error){
                        seterrmsg(data.error)
                       }
                       else{
                        alert('Login Successfull')
                        navigation.navigate('Homepage')
                       }
                    }
                )
            }
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.head1}>SIGN IN</Text>
            
            <Image style={styles.docimg}  source={require("../assets/docimg.jpg")}/>
            { errmsg && <View style={styles.errmsg}><Text style={styles.errmsgtext}> {errmsg} </Text></View>}
            <View style={styles.emailcontainer}>
            <Text style={styles.head2}>Email Address</Text>
            <TextInput style={styles.inputfeild} placeholder='Alex.mercer@gmail.com' placeholderTextColor={colors.grey}
            onChangeText={(text)=>setfdata({...fdata,email:text})}
            onPressIn={()=>{seterrmsg(null)}}/>
            </View>
            <View style={styles.emailcontainer}>
            <Text style={styles.head2}>Password</Text>
            <TextInput style={styles.inputfeild} placeholder='************' placeholderTextColor={colors.grey}
            onChangeText={(text)=>setfdata({...fdata,conemail:text})}
            secureTextEntry
            onPressIn={()=>{seterrmsg(null)}}/>
            </View>
            <Text> Forgot Password?</Text>

            <View style={styles.emailcontainer}>
            <Abutton title={"Login"} onPress={()=>handleSubmit()}/>
            </View>
            <Text> I'm a new user. <Text style={styles.Reghere} onPress={()=>navigation.navigate("Signup")}>Register Here</Text></Text>

        </View>
    );
}

const styles = StyleSheet.create({

    container:{
        height:"100%",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:colors.white
    },
    docimg:{
        width:350,
        height:350
    },
    head1: {
        fontSize: 35,
        color: colors.primary,
        textAlign: "center",
        fontWeight:"bold"
    },
    head2: {
        fontSize: 18,
        color: colors.secondary,
        textAlign: "left",
        fontWeight:800,
        paddingHorizontal:10
        
    },
    emailcontainer:{
        paddingHorizontal:20,
        width:"100%",
        marginVertical:10
    },
    inputfeild:{
        backgroundColor:colors.white,
        borderWidth:2,
        padding:20,
        borderRadius:10,
        marginVertical:5,
        borderColor:colors.primary

    },
    Reghere:{
        fontSize: 18,
        color: colors.primary,
        textAlign: "left",
        fontWeight:800,
        paddingHorizontal:10
        
    },
    errmsg:{
        
        backgroundColor:colors.hotpink,
        borderRadius:10,
        paddingVertical:5,
        paddingHorizontal:20,
        marginVertical:10
    },

    errmsgtext:{
        color:colors.white,
        textAlign:"center",
        fontWeight:"bold",
        fontSize:16,
    }
    
})

export default LoginScreen;
