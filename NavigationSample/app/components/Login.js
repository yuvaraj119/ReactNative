import React, { Component } from 'react'
import {
    View,
    Text,
    AsyncStorage,
    TextInput,
    Alert,
    Dimensions,
    Modal,
    ToastAndroid
} from 'react-native'
import Button from './Button'
import ActivityIndicatorExample from './Spinner'
var SharedPreferences = require('react-native-shared-preferences');

const route = {
    type: 'push',
    route: {
        key: 'about',
        title: 'About'
    }
}

const _values = {
    username: '',
    password: ''
}

const _showProgress = {
    progress: false
}

validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

async function setItem(key, value) {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        console.log(error);
        ToastAndroid.show('Error while saving data', ToastAndroid.LONG)
    }
}

async function getItem(key) {
    try {
        const value = await AsyncStorage.getItem(key);
        console.log(value);
        return value;
    } catch (error) {
        console.log(error);
        ToastAndroid.show('Error while retriving data', ToastAndroid.LONG)
    }
}

async function setMerge(key, value) {
    try {
        await AsyncStorage.mergeItem(key, value);
    } catch (error) {
        console.log(error);
        ToastAndroid.show('Error while saving data', ToastAndroid.LONG)
    }
}

async function removeItem(key) {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        console.log(error);
    }
}

async function getMultiItems(multi_get_keys) {
    await AsyncStorage.multiGet(multi_get_keys, (err, stores) => {
        stores.map((result, i, store) => {  // get at each store's key/value so you can work with it
            let key = store[i][0];
            let value = store[i][1];
        });
    });
}

async function setMultiItems(multi_set_keysValues) {
    try {
        await AsyncStorage.multiSet(multi_set_keysValues);
    } catch (error) {
        console.log(error);
    }
}

async function setMultiMergeItems(multi_set_keysValues) {
    try {
        await AsyncStorage.multiMerge(multi_set_keysValues);
    } catch (error) {
        console.log(error);
    }
}

async function removeMultiItems(multi_set_keys) {
    try {
        await AsyncStorage.multiRemove(multi_set_keys);
    } catch (error) {
        console.log(error);
    }
}

async function getAllKeys() {
    try {
        await AsyncStorage.getAllKeys();
    } catch (error) {
        console.log(error);
    }
}

async function clearAll() {
    try {
        await AsyncStorage.clear();
    } catch (error) {
        console.log(error);
    }
}

const LoginView = ({_handleNavigate}) => {

    //The dimensions may change due to the device being rotated, so you need to get them in each render.
    const {width, height} = Dimensions.get('window');

    const _handlePress = () => {

        const {username, password} = _values
        console.log('username' + username + password);

        if (username == '') {
            ToastAndroid.show('Enter a UserName', ToastAndroid.LONG)
        } else if (password == '') {
            ToastAndroid.show('Enter a Password', ToastAndroid.LONG)
        } else {
            _showProgress.progress=true;
            fetch('http://vip.online.net/User/ValidateUser', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    UserName: username,
                    Password: password,
                    DeviceType: 'Android',
                    DeviceToken: 'eU0z3IR96Mg:APA91bHNyEw3CcMCHZ-MmGhFVRV8XT292NYzrD2xedMFLXdaJqcJ4DXlBmn76asuiXgY8dQk9264_1MzE71cYyp-R6r7hbaWrX8pCur9_N9cesYdWIEkhLTa4E379-lxw4E76LQ17Gt7'
                })
            }).then(response => response.json())
                .then(response => {
                    if (response.data.status == 'Failure') {
                        ToastAndroid.show(response.data.message, ToastAndroid.LONG)
                        _showProgress.progress=false;
                    } else {
                        console.log('data' + response.data.status);
                        ToastAndroid.show('Success', ToastAndroid.LONG)
                        _showProgress.progress=false;
                        //Alert.alert('Response message is:', response.data.status)
                        SharedPreferences.setItem('UserId', String(response.data.UserId));
                        SharedPreferences.setItem('MobileNumber', response.data.MobileNumber);
                        SharedPreferences.setItem('EmailId', response.data.EmailId);

                        setItem('UserId', String(response.data.UserId));
                        setItem('MobileNumber', response.data.MobileNumber);
                        setItem('EmailId', response.data.EmailId);

                        _handleNavigate(route);
                        //return response;
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'steelblue', padding: 10, justifyContent: 'center' }}>
            <View style={{ flex: 1, backgroundColor: 'steelblue', padding: 10, justifyContent: 'center' }}>
                <Text style={{
                    backgroundColor: 'steelblue', justifyContent: 'center', alignItems: 'center', fontSize: 40, textAlign: 'center',
                    color: 'white', marginBottom: 30
                }}>LOGIN</Text>
                <View style={{ justifyContent: 'center' }}>
                    <TextInput
                        style={{ height: 50, marginLeft: 30, marginRight: 30, marginBottom: 20, color: 'white', fontSize: 20 }}
                        placeholder='Username' placeholderTextColor='white'
                        autoFocus={true}
                        returnKeyType='next'
                        keyboardType='email-address'
                        onChangeText={(valUsername) => _values.username = valUsername}
                        />
                    <TextInput
                        secureTextEntry={true}
                        style={{ height: 50, marginLeft: 30, marginRight: 30, marginBottom: 20, color: 'white', fontSize: 20 }}
                        placeholder='Password' placeholderTextColor='white'
                        onChangeText={(valPassword) => _values.password = valPassword}
                        />
                </View>
                <Button onPress={() => { _handlePress() } } label='Login' />
                <Text style={{ color: 'white', justifyContent: 'center', textAlign: 'center', alignItems: 'center', fontSize: 20, textDecorationLine: 'underline', textDecorationStyle: 'solid' }}>
                    Forgot Password
                </Text>
                <Text style={{ color: 'white', marginTop: 10, justifyContent: 'center', textAlign: 'center', alignItems: 'center', fontSize: 20, textDecorationLine: 'underline', textDecorationStyle: 'solid' }}>
                    SignUp
                </Text>
            </View>
            {_showProgress.progress && <ActivityIndicatorExample />}
        </View>
    )
}

export default LoginView
