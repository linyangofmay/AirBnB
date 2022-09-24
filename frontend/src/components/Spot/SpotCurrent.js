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
    <div className='myspot_div'>
      <div className='myspotinner_div'>
        <div className='myspottop_div'>
          <h2 className='myspot_head'> My Listings</h2>
          <NavLink to={`/spots/current/new`}><button className='createspotbtn'>Create A New Spot</button> </NavLink>
        </div>



        <div className='myspotimg_div'>
          {spotsArr.map((spot) => (
            <div key={spot.id} className='eachspot_nav'>
              <NavLink className='myspot_navlink' to={`/spots/${spot.id}`}>
                <div className='allimg_div'>
                  <img src={spot.imageurl} className='eachimg_div' alt='image' />
                </div>

                <div className='myspotinfo_div'>
                  <div>{spot.name}</div>
                  <div>{spot.city} {spot.state}</div>
                  <div><i className="fas fa-solid fa-star"></i>{spot.avgRating ? Number.parseFloat(spot.avgRating).toFixed(2) : 0}</div>
                </div>
              </NavLink>

              <div className='myspotbtns_div'>
                <NavLink to={`/spots/${spot.id}/edit`}><button className='myspot_btn'>EDIT</button></NavLink>
                <p></p>
                <button className='myspot_btn' onClick={() => dispatch(removespot(spot.id))}>DELETE</button>
              </div>

            </div>

          ))}

        </div>
      </div>
    </div>

  )
}






export default SpotCurrent;
