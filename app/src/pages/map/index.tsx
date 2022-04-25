
import React,{useState, useEffect} from "react";
import jwt_decode from 'jwt-decode'
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api"
import templeMark from "assets/images/templeMark.png"
import { Navbar } from "components/common/Navbar";
import mapStyles from "./mapStyles";
import { Screen } from 'components/layouts/Screen'
import { decode } from "punycode";

const templeList = [
  { lat: 13.751391, lng: 100.492519, name: 'วัดพระศรีรัตนศาสดาราม' },
  { lat: 19.824667, lng: 99.763333, name: 'วัดร่องขุ่น' },
  { lat: 13.74371, lng: 100.488966, name: 'วัดอรุณราชวราราม' },
  { lat: 18.8052, lng: 98.9216, name: 'วัดพระธาตุดอยสุเทพราชวรวิหาร' },
  { lat: 13.81693, lng: 100.05998, name: 'วัดพระปฐมเจดีย์' },
]


const libraries:any = ["places"];
export const MapTemple = () => {
  const [decoded, setDecoded] = useState<any>({})
  const [markers, setMarkers] = useState(templeList)
  const [selected,setSelected] = useState<any>()
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
  }, [])
  const mapContainerStyle = {
    width: "100vw",
    height: "60vw",
  }
  const center = {
    lat: 15.870032,
    lng: 100.992541,
  }
  const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    // zoomControl: true,
  }
  const {isLoaded, loadError} = useLoadScript({
      googleMapsApiKey: "",
      libraries,
    })
  if (loadError) return <div>Error loading maps</div>
  if (!isLoaded) return <div>Loadings Maps</div>

  

  return (
    <Screen>
      <Navbar isBoards={false} username={decoded.display_name} />
      <div className="mt-24">
        <GoogleMap mapContainerStyle={mapContainerStyle} zoom={8} center={center} options={options}>
          {markers.map((marker, index) => (
            <Marker
              onClick={() => setSelected(marker)}
              key={index}
              position={{ lat: marker.lat, lng: marker.lng }}
              icon={{
                url: templeMark,
                scaledSize: new window.google.maps.Size(30, 30),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15),
              }}
            ></Marker>
          ))}
          {selected ? (
            <InfoWindow position={{ lat: selected.lat, lng: selected.lng }} onCloseClick={()=> {
              setSelected(null);
            }}>
              <div>
                <p className="text-sm">{selected.name}</p>
              </div>
            </InfoWindow>
          ) : null}
        </GoogleMap>
      </div>
    </Screen>
  )
}
  export default MapTemple
