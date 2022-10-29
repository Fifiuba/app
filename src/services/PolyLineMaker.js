import axios from 'axios';

export default async function PolylineMaker(from,to){

  try{
    const response = await axios.get('http://www.mapquestapi.com/directions/v2/route',{
      params:{
        key:'Plqx1ppoa0ARGH2Oo2uU5olizfNPb0Fo',
        from:from,
        to:to,
        unit:'k',
        generalize:0
      }
    })
    
    let array = response.data.route.shape.shapePoints
    const cord_array = new Array();
    for (let index = 0; index < array.length; index+=2) {
      const element = {latitude: array[index], longitude: array[index + 1]}
      cord_array.push(element)
    }
    return cord_array
  }
  catch (error) {
    console.error(error.response.data.detail);
    return  [];
  }

}