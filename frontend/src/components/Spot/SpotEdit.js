import React from 'react';
import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory, Redirect} from "react-router-dom";
import {createOneSpot} from "../../store/spots";
import {useParams} from 'react-router-dom';
import {updatespot,getOneSpot} from '../../store/spots';
import './SpotEditCss.css'

function SpotEdit(){
  // console.log('get a sopt ');
  let spotObj =  useSelector(state => (state.spot));
  const spotArr = Object.values(spotObj)
  console.log('spotObj---------------', spotObj)
  console.log('spotsArr------------------', spotArr)
  //console.log('spot item ----------', spotArr[0].id)
  // let spotinfo = spot.oneSpot.Reviews;

  // {spotObj.oneSpot?.Reviews?.id}

  const {spotId} = useParams()
   let editspot = spotArr.find(item =>item.id == spotId)
   console.log('editspot----------------', editspot);



   const history = useHistory();
   const dispatch = useDispatch();
  const [name, setName] = useState(editspot.name);
  const [description, setDescription] = useState(editspot.description);
  const [address, setAddress] = useState(editspot.address);
  const [city, setCity] = useState(editspot.city);
  const [state, setState] = useState(editspot.state);
  const [country, setCountry] = useState(editspot.country);
  const [lat, setLat] = useState(editspot.lat);
  const [lng, setLng] = useState(editspot.lng);
  const [price, setPrice] = useState(editspot.price);
  const [imageurl,setImageurl] = useState(editspot.imageurl);


  const [errors, setErrors] = useState([]);

  useEffect (() => {
    dispatch(getOneSpot(spotId))
  }, [dispatch, spotId]);

  useEffect(()=>{
    const errors= [];
    if(name.length ===0){
      errors.push("Name field is required")
    }

    if (description.length === 0){
      errors.push('Description filed is required')
    }
    if (address.length === 0){
      errors.push('address filed is required')
    }
    if (city.length === 0){
      errors.push('city filed is required')
    }
    if (state.length === 0){
      errors.push('state filed is required')
    }
    if (country.length === 0){
      errors.push('country filed is required')
    }
    if (lat <= 0){
      errors.push('lat filed is required')
    }
    if (lng.length <=0){
      errors.push('lng filed is required')
    }
    if(price <= 0 ){
      errors.push("price field must be more than 0")
    }
    if( !(/\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(imageurl))&& !(imageurl.includes('unsplash'))){
      errors.push("image filed is required")
    }
    setErrors(errors)
  }, [name, description, address, city, state, country, lat, lng, price, imageurl])

  const onSubmit = async (e) =>{
    e.preventDefault()
    const spotinfo={name, description, address, city, state, country, lat, lng, price, imageurl};
    const updatedspot = await dispatch(updatespot(spotId,spotinfo));
    console.log('dispatchhelper')
    if(updatedspot ){
    //  history.push(`/spots/${dispatchhelper.id}`);
      // history.push(`/`);
    history.push('/spots/current');

    // history.push(`/spots`)
  }
}
   if(editspot){


    return (

      <div className='createspot_container'>
      <form  className='createspot_form' onSubmit={onSubmit}>
       <div className='createspot_title'>
       Update A  Spot
       </div>
       <ul>
        {errors.map((error)=>(
          <li key={error}>{error}</li>
        ))}
       </ul>
       <br></br>

       <label>
       <input
          type="text"
          name="name"
          value={name}
          placeholder='name'
          onChange={(e)=>setName(e.target.value)}
          className='createspot_input'
        />
        </label>


        <lable>
        <input
          type="text"
          name="description"
          value={description}
          placeholder='description'
          onChange={(e)=>setDescription(e.target.value)}
          className='createspot_input'
        />
        </lable>


        <lable>
        <input
          type="text"
          name="address"
          value={address}
          placeholder='address'
          onChange={(e)=>setAddress(e.target.value)}
          className='createspot_input'
        />
        </lable>




        <lable>
        <input
          type="text"
          name="city"
          value={city}
          placeholder='city'
          onChange={(e)=>setCity(e.target.value)}
          className='createspot_input'
        />
        </lable>


        <lable>
        <input
          type="text"
          name="state"
          value={state}
          placeholder='state'
          onChange={(e)=>setState(e.target.value)}
          className='createspot_input'
        />
        </lable>



        <lable>
        <input
          type="text"
          name="country"
          value={country}
          placeholder='country'
          onChange={(e)=>setCountry(e.target.value)}
          className='createspot_input'
        />
        </lable>


        <lable>
        <input
          type="decimal"
          name="lat"
          value={lat}
          placeholder='lat'
          onChange={(e)=>setLat(e.target.value)}
          className='createspot_input'
        />
        </lable>




        <lable>
        <input
          type="decimal"
          name="lng"
          value={lng}
          placeholder='lng'
          onChange={(e)=>setLng(e.target.value)}
          className='createspot_input'
        />
        </lable>

        <lable>
        <input
          type="integer"
          name="price"
          value={price}
          placeholder='price'
          onChange={(e)=>setPrice(e.target.value)}
          className='createspot_input'
        />
        </lable>


        <lable>
        <input
          type="string"
          name="imageurl"
          value={imageurl}
          placeholder='imageurl'
          onChange={(e)=>setImageurl(e.target.value)}
          className='createspot_input'
        />
        </lable>


        <button type="submit" disabled ={errors.length>0} className='updatespot_btn'>
        Update a Spot
       </button>


      </form>
      </div>
    );
   }
  }








export default SpotEdit;
