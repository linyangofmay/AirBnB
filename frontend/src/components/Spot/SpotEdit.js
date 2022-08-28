import React from 'react';
import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory, Redirect} from "react-router-dom";
import {createOneSpot} from "../../store/spots";
import {useParams} from 'react-router-dom';
import {updatespot,getOneSpot} from '../../store/spots';
import './SpotEditCss.css'

function SpotEdit(){
  console.log('get a sopt ');
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
    const dispatchhelper = await dispatch(updatespot(spotId,spotinfo));
    console.log('dispatchhelper')
    if(dispatchhelper ){
    //  history.push(`/spots/${dispatchhelper.id}`);
      // history.push(`/`);
    history.push(`/spots/${spotId}`);

    // history.push(`/spots`)
  }
}
   if(editspot){


    return (

      <div className='secontainer'>
      <form
       onSubmit={onSubmit}
      >
       <h2>Update A Spot</h2>
       <ul>
        {errors.map((error)=>(
          <li key={error}>{error}</li>
        ))}
       </ul>

       <div className='serow'>
       <div>
       <label>
        Name
       </label>
       </div>

       <div>
       <input
          type="text"
          name="name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />
        </div>
        </div>

        <div className='serow'>
        <div>
        <label>
        Description
        </label>
        </div>

        <div>
        <input
          type="text"
          name="description"
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
        />
        </div>
        </div>


        <div className='serow'>
        <div>
        <label>
        Address
        </label>
        </div>

        <div>
        <input
          type="text"
          name="address"
          value={address}
          onChange={(e)=>setAddress(e.target.value)}
        />
        </div>
        </div>



       <div className='serow'>
        <div>
        <label>
        City
        </label>
        </div>

        <div>
        <input
          type="text"
          name="city"
          value={city}
          onChange={(e)=>setCity(e.target.value)}
        />
        </div>
        </div>


        <div className='serow'>
        <div>
        <label>
        State
        </label>
        </div>

        <div>
        <input
          type="text"
          name="state"
          value={state}
          onChange={(e)=>setState(e.target.value)}
        />
        </div>
        </div>



        <div className='serow'>
         <div>
        <label>
        Country
        </label>
        </div>

        <div>
        <input
          type="text"
          name="country"
          value={country}
          onChange={(e)=>setCountry(e.target.value)}
        />
        </div>
        </div>


       <div className='serow'>
        <div>
        <label>
        lat
        </label>
        </div>

        <div>
        <input
          type="decimal"
          name="lat"
          value={lat}
          onChange={(e)=>setLat(e.target.value)}
        />
        </div>
        </div>



        <div className='serow'>
        <div>
        <label>
        lng
        </label>
        </div>

        <div>
        <input
          type="decimal"
          name="lng"
          value={lng}
          onChange={(e)=>setLng(e.target.value)}
        />
        </div>
        </div>



        <div className='serow'>
        <div>
        <label>
        Price
        </label>
        </div>

        <div>
        <input
          type="integer"
          name="price"
          value={price}
          onChange={(e)=>setPrice(e.target.value)}
        />
        </div>
        </div>


        <div className='serow'>
        <div>
        <label>
        imageurl
        </label>
        </div>

        <div>
        <input
          type="string"
          name="imageurl"
          value={imageurl}
          onChange={(e)=>setImageurl(e.target.value)}
        />
        </div>
        </div>


        <button
        type="submit"
        disabled ={errors.length>0}
      >
        Update a Spot
      </button>
      </form>
      </div>
    );
   }
  }








export default SpotEdit;
