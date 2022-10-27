import React, { useContext, useState } from 'react';
import {View, StyleSheet} from 'react-native';
import MapView, {Marker, Polyline} from 'react-native-maps';
import { Avatar, Text, Button, Colors } from 'react-native-paper';
import * as Location from 'expo-location';

import {UserContext} from '../context/UserContext';
import { constants } from '../utils/Constants';

const RoadTripView = () => {
    //const journeyInfo = route.params;
    //const journeyRoute = journeyInfo.route;
    //const journeyDestination = journeyInfo.destination;

    //const user = useContext(UserContext);
    //const userInfo = user.userInfo;
    
    const [origin, setOrigin] = useState({
        latitude: -34.59908,
        longitude: -58.38186,
    });
    const [destination, setDestination] = useState({
        latitude: -34.59908,
        longitude: -58.38186,
    });
    const [route, setRoute] = useState([origin, destination]);

    const getLocationPermission = async () => {
        try {
            const {status} = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                alert('Permiso denegado');
                return;
            }

            const location = await Location.getCurrentPositionAsync({});
            const current = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            };
            setOrigin(current);
        } catch (error) {
            console.error(error.message);
            return null;
        }
    };

    React.useEffect(() => {
        getLocationPermission();
    }, []);

    return (
        <>
        <View style={styles.appBar}>
            <View style={styles.profile}>
                <Avatar.Image size={45} source={constants.DEFAULT_URL_USER_PICTURE} />
                <Text>Celeste Dituro</Text>
            </View>
        </View>
        <View style={styles.container}>
            <MapView
                style={styles.map}
                region={{
                    latitude: origin.latitude,
                    longitude: origin.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}>
                <Marker
                    draggable
                    coordinate={origin}
                    onDragEnd={(direction) => setOrigin(direction.nativeEvent.coordinate)} />
                <Marker
                    draggable
                    coordinate={destination}
                    onDragEnd={(direction) => setDestination(direction.nativeEvent.coordinate)} />
                <Polyline
                    coordinates={route}
                    strokeColor="red"
                    strokeWidth={5} />
            </MapView>
            <Button
                style={styles.button}
                color={Colors.red800}
                mode="contained"
                onPress={() => {
                    console.log('Cancel journey');
                    handleCancelJourney();
                }}>
                <Text style={styles.buttonText}>Cancelar viaje</Text>
            </Button>
        </View>
        </>
    );
}

export default RoadTripView;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
    },
    appBar:{      
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        height: '10%',
        marginTop: 50,
    },
    profile:{
        alignItems:'center',
        padding: 5,
    },
    map: {
        margin: 5,
        width: '95%',
        height: '75%',
    },
    button: {
        padding: 5,
        width: 210,
        height: 50,
        marginTop: 30,
      },
    buttonText: {
        fontSize: 16,
        color: 'white',
    },
 });

