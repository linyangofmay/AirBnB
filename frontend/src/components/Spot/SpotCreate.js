import React from 'react';
import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory, Redirect} from "react-router-dom";
import {createOneSpot} from "../../store/spots";
import './SpotCreateCss.css'

function SpotCreate(){
  const history = useHistory();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [price, setPrice] = useState("");
  const [imageurl, setImageurl] =useState("");

  const [errors, setErrors] = useState([]);

  //console.log('I am working on a form ');

  useEffect(()=>{
    const errors= [];
    if(name.length ===0 ){
      errors.push("Name field is required")
    }

    if (description.length  <=3){
      errors.push('Description filed is required')
    }
    if (address.length <= 3){
      errors.push('address filed is required')
    }
    if (city.length < 2){
      errors.push('city filed is required')
    }
    if (state.length <2){
      errors.push('state filed is required')
    }
    if (country.length < 2){
      errors.push('country filed is required')
    }
    if (lat <-90 || lat> 90){
      errors.push('lat filed is required')
    }
    if (lng <-180 || lng > 180){
      errors.push('lng filed is required')
    }
    if(price <= 0 ){
      errors.push("price field must be more than 0")
    }
    if(!(/\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(imageurl))&& !(imageurl.includes('unsplash'))  ){
      errors.push("image filed is required")
    }
    setErrors(errors)
  }, [name, description, price, address, city, state, country, lat, lng, price, imageurl])

  const onSubmit = async (e) =>{
    e.preventDefault()
    const spotinfo={name, description, address, city, state, country, lat, lng, price, imageurl};
    const dispatchhelper = await dispatch(createOneSpot(spotinfo));
    //console.log('dispatchhelper-----------------', dispatchhelper)
    if(dispatchhelper ){
      history.push(`/spots/${dispatchhelper.id}`);
      // history.push(`/`);
    }

    // history.push(`/spots`)
  }

    return (
      <div className='cscontainer'>
      <form
       onSubmit={onSubmit}
      >
       <div className='spotform'>
       <h2>Create A New Spot</h2>
       </div>

       <ul>
        {errors.map((error)=>(
          <li key={error}>{error}</li>
        ))}
       </ul>

       <div className='row'>
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

        <div className='row'>
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


        <div className='row'>
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


        <div className='row'>
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

        <div className='row'>
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


        <div className='row'>
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

        <div className='row'>
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

        <div className='row'>
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

        <div className='row'>
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

        <div className='row'>
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
        Create a Spot
      </button>
      </form>
      </div>

    );

  }








export default SpotCreate;
