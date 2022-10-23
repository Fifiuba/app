import axios from "axios";

const getRoute = async () => {
    try {
        const response = await axios.get('http://www.mapquestapi.com/directions/v2/route')
    } catch(error) {
        console.error(error.message);
    }
}

