import { Navbar } from 'components/common/Navbar'
import { Screen } from 'components/layouts/Screen'
import { useState, useContext, useEffect } from 'react'
import jwt_decode from 'jwt-decode'

import { Footer } from 'components/common/Footer'

import { LoadIcon } from 'components/common/loadIcon'


export const Moon = () => {
  const [decoded, setDecoded] = useState<any>({})
  const [thaiMonth, setThaiMonth] = useState<any>("")
  const [thaiDate, setThaiDate] = useState<any>('')
  const [phaseName, setPhaseName] = useState<string>('')
  const [moonImage, setMoonImage] = useState<any>('')
  const [loading, setLoading] = useState<boolean>(false)

  function load_moon_phases(obj: any, callback: any) {
    const gets = []
    for (const i in obj) {
      gets.push(i + '=' + encodeURIComponent(obj[i]))
    }
    gets.push('LDZ=' + new Date(obj.year, obj.month - 1, 1).valueOf() / 1000)
    const xmlhttp = new XMLHttpRequest()
    const url = 'https://www.icalendar37.net/lunar/api/?' + gets.join('&')
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        callback(JSON.parse(xmlhttp.responseText))
      }
    }
    xmlhttp.open('GET', url, true)
    xmlhttp.send()
  
  }

  const configMoon = {
    lang: 'th',
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    size: 150,
    lightColor: 'rgb(255,255,210)',
    shadeColor: 'black',
    texturize: false,
  }

  const example_1 = (moon: any) => {
    setLoading(false)
    // const day = new Date().getDate()
    const day = new Date().getDate()
    const month = new Date().getMonth()
    let year = new Date().getFullYear()
    year = year+543
    setMoonImage(moon.phase[day].svg)
    const p = moon.phase[day].phaseName
    console.log(p)
    if (p === 'Waning') {
      setPhaseName('วันแรม')
    } else if (p === 'Waxing') {
      setPhaseName('วันขึ้น')
    } else if (p === 'New moon') {
      setPhaseName('วันแรม 15 ค่ำ')
    } else if (p === 'First quarter') {
      setPhaseName('วันขึ้น 8 ค่ำ')
    } else if (p === 'Last quarter') {
      setPhaseName('วันแรม 8 ค่ำ')
    } else if (p === 'Full moon') {
      setPhaseName('วันขึ้น 15 ค่ำ')
    }


    const str = String(month) as string

    const dictThaiOld = {
      '0': 'เดือน 2',
      '1': 'เดือน 3',
      '2': 'เดือน 4',
      '3': 'เดือน 5',
      '4': 'เดือน 6',
      '5': 'เดือน 7',
      '6': 'เดือน 8',
      '7': 'เดือน 9',
      '8': 'เดือน 10',
      '9': 'เดือน 11',
      '10': 'เดือน 12',
      '11': 'เดือน 1',
    }

    const dictThaiNew = {
      '0': 'มกราคม',
      '1': 'กุมภาพันธ์',
      '2': 'มีนาคม',
      '3': 'เมษายน',
      '4': 'พฤษภาคม',
      '5': 'มิถุนายน',
      '6': 'กรกฎาคม',
      '7': 'สิงหาคม',
      '8': 'กันยายน',
      '9': 'ตุลาคม',
      '10': 'พฤษจิกายน',
      '11': 'ธันวาคม',
    }

    setThaiMonth(dictThaiOld[str as keyof typeof dictThaiOld])
    setThaiDate(`${day} ${dictThaiNew[str as keyof typeof dictThaiNew]} ${year}`)

    if (moon.phase[day].svg) {
      document.getElementById('moonSVG')!.innerHTML = [moon.phase[day].svg!] as any
    }
  }

  useEffect(() => {
    setLoading(true)
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
      load_moon_phases(configMoon, example_1)
      
    }
  }, [])
  
  return (
    <Screen>
      <Navbar isBoards={false} username={decoded.display_name} />
      <div className="flex flex-col items-center w-screen h-screen ">
        <p className="pb-8 mt-32 text-3xl font-bold text-white">ปฏิธินจันทรคติ</p>
        {loading ? (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <LoadIcon />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <div id="moonSVG"></div>
            <p className="mt-8 text-2xl text-white">{` ${thaiDate}`}</p>
            <p className="mt-4 text-2xl text-white">{`${phaseName} ${thaiMonth}`}</p>
          </div>
        )}
        <Footer />
      </div>
    </Screen>
  )
}

export default Moon
