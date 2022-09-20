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

  const onSubmit = async (e) =>{
    e.preventDefault()
    const spotinfo={name, description, address, city, state, country, lat, lng, price, imageurl};

    if(name.length ===0 ){
      alert("Name field is required")
      return;
    } else if (description.length  <=3){
      alert('Description filed is required')
      return;
    } else if (address.length <= 3){
      alert ('address filed is required')
      return;
    }else if (city.length < 2){
      alert ('city filed is required')
      return
    } else if (state.length <2){
      alert('state filed is required')
      return
    } else if (country.length < 2){
      alert('country filed is required')
      return
    } else if (lat <-90 || lat> 90){
      alert('lat is not legit')
      return
    }else if (lng <-180 || lng > 180){
      alert('lng is not legit')
      return
    } else if(price <= 0 ){
      alert ("price field must be more than 0")
      return
    } else if(!(/\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(imageurl))&& !(imageurl.includes('unsplash'))  ){
      alert ("image filed is required")
      return
    } else {
       dispatch(createOneSpot(spotinfo)).catch(
        async(res) =>{
          const data=await res.json();
          if(data && data.errors) setErrors(data.errors);
        }
       )

      }




      return history.push('/spots/current')

    //console.log('dispatchhelper-----------------', dispatchhelper)
    // if(dispatchhelper ){
    //   history.push(`/spots/${dispatchhelper.id}`);
      // history.push(`/`);
    };



    return (
      <div className='createspot_container'>

      <form className='createspot_form' onSubmit={onSubmit}>
      <div className='createspot_title'>
       Create A New Spot
       </div>
       <ul>
        {errors.map((error)=>(
          <li key={error}>{error}</li>
        ))}
       </ul>

       <br></br>

       <div className='createspot_rows'>

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


        <button type="submit" disabled ={errors.length>0} className='createspot_btn'>
        Create a Spot
       </button>

      </div>
      </form>
      </div>

    );

  }








export default SpotCreate;
