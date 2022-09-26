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

  // useEffect(()=>{
  //   const errors= [];
  //   if(name.length ===0 ){
  //     errors.push("Name field is required")
  //   }

  //   if (description.length  <=3){
  //     errors.push('Description filed is required')
  //   }
  //   if (address.length <= 3){
  //     errors.push('address filed is required')
  //   }
  //   if (city.length < 2){
  //     errors.push('city filed is required')
  //   }
  //   if (state.length <2){
  //     errors.push('state filed is required')
  //   }
  //   if (country.length < 2){
  //     errors.push('country filed is required')
  //   }
  //   if (lat <-90 || lat> 90){
  //     errors.push('lat is not legit')
  //   }
  //   if (lng <-180 || lng > 180){
  //     errors.push('lng is not legit')
  //   }
  //   if(price <= 0 ){
  //     errors.push("price field must be more than 0")
  //   }
  //   if(!(/\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(imageurl))&& !(imageurl.includes('unsplash'))  ){
  //     errors.push("image filed is required")
  //   }
  //   setErrors(errors)
  // }, [name, description, price, address, city, state, country, lat, lng, price, imageurl])

  const handleSubmit = async (e) =>{
    e.preventDefault()
    const spotinfo={name, description, address, city, state, country, lat, lng, price, imageurl};
   setErrors([]);

       const newspot=await dispatch(createOneSpot(spotinfo)).catch(
        async(res) =>{
          const data=await res.json();
          if(data && data.errors) setErrors(data.errors);
        }
       );
      // if (newspot){
      //  history.push(`/spots/${newspot.id}`)}
      if(newspot){
        history.push('/spots/current');
      }

    };



    return (
      <div className='createspot_container'>

      <form className='createspot_form' onSubmit={handleSubmit}>
       <div className='createspot_title'>
       Create A New Spot
       </div>

        {Object.values(errors).map((error)=>(
          <div key={error} className='spotcreate_error'>{error}</div>
        ))}


       <br></br>

       <div className='createspot_rows'>

       <label>
       <input
          type="text"
          name="name"
          value={name}
          placeholder='name need to be more than 3 letters'
          onChange={(e)=>setName(e.target.value)}
          className='createspot_input'
          required
        />
        </label>

        <lable>
        <input
          type="text"
          name="description"
          value={description}
          placeholder='description need to be more than 3 letters'
          required
          onChange={(e)=>setDescription(e.target.value)}
          className='createspot_input'

        />
        </lable>

        <lable>
        <input
          type="text"
          name="address"
          value={address}
          placeholder='address need to be more than 3 letters'
          onChange={(e)=>setAddress(e.target.value)}
          className='createspot_input'
          required
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
          required
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
          required
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
          required
        />
        </lable>

        <lable>
        <input
          type="number"
          name="lat"
          value={lat}
          placeholder='lat'
          onChange={(e)=>setLat(e.target.value)}
          className='createspot_input'
          min='-90'
          max='90'
          required
        />
        </lable>

        <lable>
        <input
          type="number"
          name="lng"
          value={lng}
          placeholder='lng'
          onChange={(e)=>setLng(e.target.value)}
          className='createspot_input'
          min='-180'
          max='180'
          required
        />
        </lable>

        <lable>
        <input
          type="number"
          name="price"
          value={price}
          placeholder='price'
          onChange={(e)=>setPrice(e.target.value)}
          className='createspot_input'
          min='1'
          required
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
          required
        />
        </lable>


        <button type="submit" disabled ={errors.length>0} className='createspot_btn'>
        Create a Spot
       </button>

      </div>
      </form>
      </div>

    );

  }








export default SpotCreate;
