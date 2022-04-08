import profile1 from 'assets/images/profile1.jpeg'
import { useState } from 'react'
import likeImg from 'assets/images/like.png'
import unlikeImg from 'assets/images/unlike.png'
export const Story = () => {
  const [clickLike, setClickLike] = useState<boolean>(true)
  const [likePhoto, setLikePhoto] = useState<string>(unlikeImg)
  const handleLike = () => {
    setClickLike(!clickLike)
    if (clickLike === true) {
      console.log('Like')
      setLikePhoto(likeImg)
    } else {
      console.log('UnLike')
      setLikePhoto(unlikeImg)
    }
  }
  return (
    <div className="flex flex-col w-4/5 mt-20 md:mt-28">
      <div className="flex items-center">
        <img src={profile1} className="w-16 h-16 rounded-full" />
        <p className="mx-4 text-xl text-white">Username</p>
      </div>
      <div className="p-4 mt-4 rounded-xl bg-primary-light ">
        <p className="text-3xl font-bold">
          Topic 1 อยากได้ คำพูด/คำคม กำลังใจ แบบตอนที่เหนื่อยมากๆ เหนื่อย ท้อ แบบไม่มีใครเข้าใจ
        </p>
        <p className="w-full mt-4 text-lg break-words">
          // 🎬 โปรเจค FAST & FEEL LOVE เกิดขึ้นได้อย่างไร เต๋อ-นวพล: จริงๆ แล้วเกิดจากการชักชวนของ GDH //
          แล้วก็เป็นงานที่เรารู้สึกว่าอยากลองทำ..เหมือนขึ้นเฟสใหม่อ่ะครับ เหมือนกับว่าเราทำหนังมา 10 ปี เนอะ //
          แล้วมันก็มี 7 เรื่องแล้ว พอเรื่องที่ 8 เราก็รู้สึกว่า ปีใหม่ก็อยากเริ่มสไตล์ใหม่ๆ ซึ่งพอคุยกันกับทาง GDH //
          เขาก็โอเคแล้วก็ให้ลองดูครับ 🎬 ในตัวอย่างบอกว่าเป็นภาพยนตร์แอ็กชั่น จริงๆ แล้ว FAST & FEEL LOVE //
          เป็นภาพยนตร์สไตล์ไหน เต๋อ-นวพล: ส่วนใหญ่เราจะเรียกว่าแอ็กชั่นในชีวิตประจำวันมากกว่าครับ //
          คือ..มันจะเป็นการเล่าเรื่องในชีวิตประจำวัน แต่เล่าเหมือนเป็นภาพยนตร์แอ็กชั่นครับ //
          เราไม่ได้อยากเรียกว่ามันจะเป็นภาพยนตร์แนวตลกหรือแนวอื่นๆ อะไรครับ เพราะผมว่ามันมีความแตกต่างกันนิดหนึ่ง //
          มันคล้ายๆ กับการเอาเรื่องจริงมาล้อเล่น เอาเรื่องจริงมาทำเป็นแอ็กชั่นมากกว่า 🎬 FAST & FEEL LOVE //
          เป็นการนำชีวิตประจำวันมาล้อเล่น มันคือชีวิตของพี่ เต๋อ-นวพล เองเลยหรือเปล่า เต๋อ-นวพล: ใช่ครับ //
          แต่ผมว่ามันเป็นชีวิตประจำวันที่มันเชื่อมโยงกับคนอื่นๆ ด้วย ซึ่งเราไม่ได้จำกัดว่าจะต้องมีอายุเยอะ 30 //
          ขึ้นไปนะ แต่มันจะเชื่อมกับคนธรรมดาทั่วไปที่แบบต้องจัดการชีวิตต่างๆ ด้วยตัวเอง //
          คนที่ต้องเผชิญกับชีวิตประจำวันที่มันแบบ..บางทีก็ปวดหัว ยกตัวอย่างเช่น วันนี้ต้องไปทำธุระที่แบงค์ //
          บางทีมันก็รู้สึกว่ากินเวลาชีวิตไปเหมือนกันนะ หรือว่าวันนี้แบบอยู่ดีๆ หลังคารั่ว น้ำแอร์หยด //
          บางทีก็หมดไปทั้งวันเหมือนกันนะที่จะต้องซ่อมอะไรแบบนี้ หรือ สำหรับคนแบบผมมีความฝันที่จะต้องทำ //
          มันก็เป็นอุปสรรคเหมือนกันประมาณนี้ครับ บางทีเราจะรู้สึกว่าอุปสรรคต่างๆ อะไรพวกนี้ // มันต้องเป็นเรื่องยิ่งใหญ่
          แต่จริงๆ แล้ว มันอาจจะเป็นเรื่องเล็กน้อยก็ได้ // มันก็เลยกลายมาเป็นความน่าสนใจของภาพยนตร์เรื่องนี้ด้วยครับ 🎬
          ใน FAST & FEEL LOVE จะเป็นการนำเรื่อง // ‘ความเร็ว’ มาเล่น แล้วในชีวิตจริงของพี่ ‘เต๋อ-นวพล’
          มีไลฟ์สไตล์ที่รวดเร็วแบบในภาพยนตร์ไหม //{' '}
        </p>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center justify-center">
            <img onClick={handleLike} src={likePhoto} className="w-12 h-8 m-4 cursor-pointer md:w-20 md:h-12" />
            <p className="text-lg font-bold md:text-xl">4</p>
          </div>
          <p className="m-4">ลงวันที่ : 1/2/12</p>
        </div>
      </div>
    </div>
  )
}
