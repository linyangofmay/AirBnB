import { NavLink, useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getspotcurrent, removespot, updatespot } from "../../store/spots";
import React from 'react';
import './SpotCurrentCss.css'

const SpotCurrent = () => {
  const dispatch = useDispatch();
  const spotsObj = useSelector(state => state.spot)

  const spotsArr = Object.values(spotsObj)
  //console.log('spotsArr----------------', spotsArr);


  useEffect(() => {
    dispatch(getspotcurrent())
  }, [dispatch]);

  if (!spotsArr) {
    return null
  }
  return (

    <div className='myspotoutermost_div'>

      <div className='myspottop_div'>
        <div className='myspot_head'> My Listings</div>

        <NavLink className='createspotbtn' to={`/spots/current/new`}>
          <div>Create A New Spot</div>
        </NavLink>
      </div>



      <div className='myspotbody_div'>

        {spotsArr.map((spot) => (
          <div key={spot.id} className='myspoteachspot_nav'>
            <NavLink className='myspot_navlink' to={`/spots/${spot.id}`}>
              <div>
                <img src={spot.imageurl} className='eachimg_div' alt='image' />
              </div>

              <div className='browser_rate_div'>
                 {/* <div>{spot.name}</div>
                <div>{spot.city} {spot.state}</div>
                <div><i className="fas fa-solid fa-star"></i> &nbsp;{spot.avgRating ? Number.parseFloat(spot.avgRating).toFixed(2) : 0}</div>
                 */}
                 <div style={{fontweight:'600'}}>{spot.city}, {spot.state}</div>
                <div>
                {spot.avgRating ? Number.parseFloat(spot.avgRating).toFixed(2) : 0} <i className="fas fa-solid fa-star"></i></div>
               </div>
              <div className='spotmiddle'>{spot.name}</div>
              <br></br>
              <div >${spot.price}/night</div>



            </NavLink>


            <div className='myspotbtns_div'>
              <NavLink to={`/spots/${spot.id}/edit`}><button className='myspot_btn'>EDIT</button></NavLink>

              <button className='myspot_btn' onClick={() => dispatch(removespot(spot.id))}>DELETE</button>
            </div>

          </div>

        ))}


      </div>

    </div >

  )};







  export default SpotCurrent;
