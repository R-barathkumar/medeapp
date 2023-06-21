import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, TextInput, ScrollView } from 'react-native';
import { head2 } from '../config/textfont';
import colors from '../config/colors';
import Abutton from '../component/Abutton';
import Screen from '../component/Screen';

function SignupScreen({navigation}) {

    const [fdata, setfdata]=useState({
        firstname:"",
        lastname:"",
        dob:"",
        phoneno:"",
        email:"",
        conemail:"",
        address:"",
        zip:"",
    });

    const [errmsg,seterrmsg]=useState(null);

    const handleSubmit = () => {
        //console.log(fdata);
        if (    fdata.firstname =="" ||
                fdata.address =="" ||
                fdata.lastname =="" ||
                fdata.conemail ==""||
                fdata.email ==""||
                fdata.dob==""||
                fdata.zip=="" ||
                fdata.phoneno==""){
                    seterrmsg("Please enter all feilds");
                    return;         
        }
        else{
            if(fdata.email != fdata.conemail){
                seterrmsg("email did not match");
                return;
            }
            else{
                fetch('http://172.16.1.167:3000/verify',{
                    method:'POST',
                    headers:{
                        'Content-Type': "application/json"  
                    },
                    body: JSON.stringify(fdata)
                })
                .then(res =>res.json()).then(
                    data =>{
                        if (data.error === "Invalid Credentials"){
                            seterrmsg(data.error)
                        }
                        else if(data.message === "Verification Code Sent to your email") {
                            
                            console.log(data.udata);
                            alert(data.message);
                            navigation.navigate('verifypage',{userdata:data.udata})
                    }
                    }
                )
            }
        }
    }
    
    return (
        
        <Screen>
            <ScrollView >
            <View style={styles.container}>
            <Text style={styles.head1}>Register</Text>
            { errmsg && <View style={styles.errmsg}><Text style={styles.errmsgtext}> {errmsg} </Text></View>}
            <View style={styles.emailcontainer}>
            <Text style={styles.head2}>First Name</Text>
            <TextInput style={styles.inputfeild} placeholder='Alex' placeholderTextColor={colors.grey} 
            onChangeText={(text)=>setfdata({...fdata,firstname:text})}
            onPressIn={()=>{seterrmsg(null)}}
            autoComplete='name'
            autoCapitalize='none'

            />
            </View>
            <View style={styles.emailcontainer}>
            <Text style={styles.head2}>Last Name</Text>
            <TextInput style={styles.inputfeild} placeholder='Mercer' placeholderTextColor={colors.grey}
            onChangeText={(text)=>setfdata({...fdata,lastname:text})}
            onPressIn={()=>{seterrmsg(null)}}
            autoComplete="name"
            autoCapitalize='none'/>
            </View>
            <View style={styles.emailcontainer}>
            <Text style={styles.head2}>Date of Birth</Text>
            <TextInput style={styles.inputfeild}
            onChangeText={(text)=>setfdata({...fdata,dob:text})}
            onPressIn={()=>{seterrmsg(null)}}
            autoCapitalize='none'
            autoComplete='birthdate-day'
            />
            </View>
            <View style={styles.emailcontainer}>
            <Text style={styles.head2}>Phone Number</Text>
            <TextInput style={styles.inputfeild} placeholder='(123) 4567891' placeholderTextColor={colors.grey}
            onChangeText={(text)=>setfdata({...fdata,phoneno:text})}
            onPressIn={()=>{seterrmsg(null)}}
            keyboardType='number-pad'/>
            </View>

            <View style={styles.emailcontainer}>
            <Text style={styles.head2}>Email ID</Text>
            <TextInput style={styles.inputfeild} placeholder='medcare@gmail.com' placeholderTextColor={colors.grey}
            onChangeText={(text)=>setfdata({...fdata,email:text})}
            onPressIn={()=>{seterrmsg(null)}}
            keyboardType='email-address'
            autoCapitalize='none'/>
            </View>

            <View style={styles.emailcontainer}>
            <Text style={styles.head2}>Confirm Email ID</Text>
            <TextInput style={styles.inputfeild} placeholder='medcare@gmail.com' placeholderTextColor={colors.grey}
            secureTextEntry
            onChangeText={(text)=>setfdata({...fdata,conemail:text})}
            onPressIn={()=>{seterrmsg(null)}}
            autoCapitalize='none'
            autoComplete='email'/>
            </View>

            <View style={styles.emailcontainer}>
            <Text style={styles.head2}>Address</Text>
            <TextInput style={styles.inputfeild} placeholder='106E filber village' placeholderTextColor={colors.grey}
            onChangeText={(text)=>setfdata({...fdata,address:text})}
            onPressIn={()=>{seterrmsg(null)}}
            />
            </View>

            <View style={styles.emailcontainer}>
            <Text style={styles.head2}>ZIP Code</Text>
            <TextInput style={styles.inputfeild} placeholder='LE2 7PT' placeholderTextColor={colors.grey}
            onChangeText={(text)=>setfdata({...fdata,zip:text})}
            onPressIn={()=>{seterrmsg(null)}}
            autoCapitalize='none'
            autoComplete='postal-code'/>
            </View>

            <View style={styles.emailcontainer}>
            <Abutton title={"Register"} onPress={()=>handleSubmit()}/>
            </View>
            <Text style={styles.loginhere1}> Already Registered? <Text style={styles.loginhere2} onPress={()=>navigation.navigate("Login")}>Login Here</Text></Text>
            </View>
            </ScrollView>
        </Screen>
        
    );
}

const styles = StyleSheet.create({

    scrollcontainer:{
        flexGrow: 1,
        
    },

    container:{
        height:"100%",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center"
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
        fontWeight:600,
        paddingHorizontal:10
        
    },
    emailcontainer:{
        paddingHorizontal:20,
        width:"100%",
        marginVertical:5
    },
    inputfeild:{
        backgroundColor:colors.white,
        borderWidth:2,
        padding:18,
        borderRadius:10,
        marginVertical:5,
        borderColor:colors.primary

    },
    loginhere1:{
        textAlign:"center",
        marginVertical:5,
        
    },
    loginhere2:{
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

export default SignupScreen;