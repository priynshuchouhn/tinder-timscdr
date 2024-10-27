'use client'
import Image from 'next/image'
import React, { Fragment, useEffect, useState } from 'react'
import TinderCard from 'react-tinder-card'

function Home() {
  const [isSwipedRight, setIsSwipedRight] = useState(null);
  const [db,setDb] = useState([
    {
      name: 'Richard Hendricks',
      url: '/richard.jpg'
    },
    {
      name: 'Erlich Bachman',
      url: '/erlich.jpg'
    },
    {
      name: 'Monica Hall',
      url: '/monica.jpg'
    },
    {
      name: 'Jared Dunn',
      url: '/jared.jpg'
    },
    {
      name: 'Dinesh Chugtai',
      url: '/dinesh.jpg'
    }
  ]);
  useEffect(() => {
    if (isSwipedRight != null) {
      setTimeout(() => {
        setIsSwipedRight(null)
      }, 1000)
    }
  }, [isSwipedRight])
  const onSwipe = (direction: any) => {
    console.log('You swiped: ' + direction)
  }

  const onCardLeftScreen = (myIdentifier: any) => {
    let newDb = [...db];
    newDb = newDb.filter(el => el.name != myIdentifier);
    setDb(newDb);
    console.log(myIdentifier + ' left the screen')
  }
  return (
    <div className='h-screen flex md:items-center justify-center'>
      {db.length > 0 ? <div className='relative   p-2 aspect-[2/3] w-full md:w-[20rem] max-h-[75vh] rounded-lg overflow-hidden'>
        {
          db.map((user) =>
            <Fragment key={user.name}>
              <TinderCard className='absolute w-full h-full top-0 left-0' swipeRequirementType='position' onSwipe={onSwipe} onCardLeftScreen={() => onCardLeftScreen(user.name)} preventSwipe={['up', 'down']} >
                <div className='bg-white h-full rounded-md' style={{ 'backgroundImage': `url(` + user.url + `)`, 'backgroundRepeat': 'no-repeat', backgroundSize: 'cover' }} />
                <p className='text-2xl absolute left-3 bottom-3 font-semibold text-white'>{user.name}</p>
              </TinderCard>
            </Fragment>
          )
        }
      </div> : <div className='relative flex items-center justify-center  p-2 aspect-[2/3] w-full md:w-[20rem] max-h-[75vh] rounded-lg overflow-hidden'>
        <p className='text-xl'>You swiped all available user 🙂</p>
      </div>}
    </div>
  )
}

export default Home
