import React, { useState, useEffect, useRef, useCallback } from 'react'
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api'
import jwt_decode from 'jwt-decode'

import { Navbar } from 'components/common/Navbar'
import { Screen } from 'components/layouts/Screen'
import { templeList } from './templeList'

import mapStyles from './mapStyles'
import templeMark from 'assets/images/templeMark.png'

const libraries: any = ['places']
export const MapTemple = () => {
  const [lat, setLat] = useState<number>(0)
  const [lng, setLng] = useState<number>(0)
  const [decoded, setDecoded] = useState<any>({})
  const [markers, setMarkers] = useState(templeList)
  const [selected, setSelected] = useState<any>(null)
 
  useEffect(() => {
    if (window.localStorage.getItem('accessToken') == null) {
      window.localStorage.setItem('auth', 'NO')
    } else {
      const token = window.localStorage.getItem('accessToken')
      const userData = JSON.parse(
        JSON.stringify(jwt_decode(token || '{}')).replace(
          'http://schemas.microsoft.com/ws/2008/06/identity/claims/role',
          'role',
        ),
      )
      setDecoded(userData)
      console.log(userData)
    }
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log('Latitude is :', position.coords.latitude)
      console.log('Longitude is :', position.coords.longitude)
      setLat(position.coords.latitude)
      setLng(position.coords.longitude)
    })
  }, [])
  const mapContainerStyle = {
    width: '100vw',
    height: '100vw',
  }


  const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
  }

  const mapRef = useRef()
  const onMapLoad = useCallback((map) => {
    mapRef.current = map
  }, [])

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCOjuP4W2gZo0vpiNznroBDOIE3JmnWgE0',
    libraries,
  })

  if (loadError) return <div>Error loading maps</div>
  if (!isLoaded) return <div>Loadings Maps</div>

  return (
    <Screen>
      <Navbar isBoards={false} username={decoded.display_name} />
      <div className="min-h-screen md:mt-24">
        <GoogleMap mapContainerStyle={mapContainerStyle} zoom={8} center={{lat: lat, lng: lng}} options={options} onLoad={onMapLoad}>
          {markers.map((marker, index) => (
            <Marker
              key={index}
              position={{ lat: marker.lat, lng: marker.lng }}
              icon={{
                url: templeMark,
                scaledSize: new window.google.maps.Size(40, 40),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15),
              }}
            ></Marker>
          ))}
        </GoogleMap>
      </div>
    </Screen>
  )
}
export default MapTemple
