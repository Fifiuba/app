import React, {useState, useContext} from 'react';
import { View, Text,ScrollView,StyleSheet, StatusBar, SafeAreaView, FlatList,Image} from 'react-native';
import { Button,Colors,ActivityIndicator } from 'react-native-paper';
import getAddrsFromCoords from '../services/GetAddressFromCoords'

const HomeDriver = ({navigation}) => {
    const [avaliableJourneys,setAvaliableJourneys] = useState([])
    const [loading,setLoading] = useState(true)

    
    const DATA = [
        {
            _id: '635dab0a3b01330d59fbc742',
            status: "requested",
            idPassenger: 10,
            driver: {
                idDriver: 1,
                vip: false
            },
            price: 20,
            from: [-34.5860531,-58.399662],
            to: [-34.578827,-58.5005147]
        },
    ];

    function getAddres (items)  {
        try {
            const addresses= []
            DATA.forEach(async journey => {  
                console.log('entra')              
                const fromStreet = await getAddrsFromCoords(journey.from[0],journey.from[1]);
                const toStreet = await getAddrsFromCoords(journey.to[0],journey.to[1]);
                addresses.push({
                    _id: journey._id,
                    from: fromStreet,
                    to: toStreet,
                    price: journey.price
                })
                console.log('andó')
                setLoading(false)
                setAvaliableJourneys(addresses)
            });
        }
        catch(err){
            setLoading(true)
            alert(err)
        }
    }

    const ShowDataContainer = () => {
        if (loading){
            return (
                <ActivityIndicator 
                    style={{justifyContent:'center',alignSelf:'center'}} 
                    size={'larger'} 
                    animating={loading} 
                    color={Colors.red800} /> 
            )
        }
        return (
            <FlatList
                extraData={avaliableJourneys}
                data={avaliableJourneys}
                keyExtractor={item => item._id}
                renderItem={renderItem}
            />)
    }


    const renderItem = ({ item }) => (
        <View style={styles.item} key={item.key}>
            <Text> Desde: {item.from}</Text>
            <Text> Hasta: {item.to}</Text>
            <Text> Ganancia: $ {item.price}</Text>
            <Image source={{uri: 'https://reactjs.org/logo-og.png'}}
                style={{width: 40, height: 40}} />
        </View>
    )

    
    return (
        <View style={styles.container}>

            <SafeAreaView style={styles.dataContainer}>
                <Text style={{textAlign:'center',fontSize:20}}>
                    Viajes Disponibles
                </Text>
                <ShowDataContainer/>
            </SafeAreaView>
            <Button
                style={styles.button}
                color={Colors.blue800}
                mode="contained"
                onPress={getAddres}
            >
                <Text> Buscar Viajes </Text>
            </Button>

        </View>
    )

}

const styles = StyleSheet.create({
    container:{
        flex:3,
        backgroundColor:'green',
        alignItems: 'center',
        width: '100%'
    },
    dataContainer:{
        backgroundColor:'blue',
        height: '70%',
        width:'100%',
    },
    item:{
        backgroundColor:'red'
    },
    button:{
        width: '50%'
    }
});


export default HomeDriver;