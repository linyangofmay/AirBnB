import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';

import { fetchSpots } from '../../store/spots';
import './SpotsBrowserCss.css'


const SpotsBrowser = () => {
  const dispatch = useDispatch()

  // const spots = useSelector(state=> {
  //   return state.spots.list.map(spotsId => state.spots[spotsId]);
  // });
  const spotsObj = useSelector(state => state.spot)

  const spotsArr = Object.values(spotsObj)
  console.log('sportsArr---------', spotsArr)

  const [isLoaded, setIsLoaded] = useState(false);


  // useEffect(()=>{
  //   const dispatchHelper = () =>{
  //     dispatch(fetchSpots());
  //   };
  //   dispatchHelper().then(setIsLoaded(true));
  //  }, [dispatch]);

  useEffect(() => {

    dispatch(fetchSpots())
  }, [dispatch]);

  if (!spotsArr) return null;
  return (

    <div className='outermost_div'>
      <div className='outer_div'>
        {spotsArr.map((spot) => (
          <div className='spotdiv'>
            <NavLink to={`/spots/${spot.id}`} key={spot.id} className='browser_navlink'>


              <img src={`${spot.imageurl}`} className="browser_image_div" alt='preview' />


              <div className='browser_rate_div'>
                <div style={{ fontweight: '600' }}>{spot.city}, {spot.state}</div>
                <div>
                  {spot.avgRating ? Number.parseFloat(spot.avgRating).toFixed(2) : 0} <i className="fas fa-solid fa-star"></i></div>
              </div>
              <div className='spotmiddle'>{spot.name}</div>
              <br></br>
              <div >${spot.price}/night</div>
            </NavLink>

          </div>
        ))}
      </div>

    </div>

  );

}

export default SpotsBrowser;
