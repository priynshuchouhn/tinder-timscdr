'use client'
import { Button } from '@/components/ui/button';
import { Heart, RotateCcw, Star, X, Zap } from 'lucide-react';
import Image from 'next/image'
import React, { Fragment, Ref, useEffect, useMemo, useRef, useState } from 'react'
import TinderCard from 'react-tinder-card'

function Home() {
  const [swipeDir, setSwipeDir] = useState(null);
  const [db, setDb] = useState([
    {
      name: 'Richard Hendricks',
      age: 20,
      url: '/richard.jpg'
    },
    {
      name: 'Erlich Bachman',
      age: 22,
      url: '/erlich.jpg'
    },
    {
      name: 'Monica Hall',
      age: 23,
      url: '/monica.jpg'
    },
    {
      name: 'Jared Dunn',
      age: 21,
      url: '/jared.jpg'
    },
    {
      name: 'Dinesh Chugtai',
      age: 22,
      url: '/dinesh.jpg'
    }
  ]);
  useEffect(() => {
    if (swipeDir != null) {
      setTimeout(() => {
        setSwipeDir(null)
      }, 1000)
    }
  }, [swipeDir])
  const onSwipe = (direction: any) => {
    setSwipeDir(direction)
    console.log('You swiped: ' + direction)
  }

  const onCardLeftScreen = (myIdentifier: any) => {
    let newDb = [...db];
    newDb = newDb.filter(el => el.name != myIdentifier);
    setDb(newDb);
    console.log(myIdentifier + ' left the screen')
  }

  const [currentIndex, setCurrentIndex] = useState(db.length - 1)
  const [lastDirection, setLastDirection] = useState()
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex)

  const childRefs: any = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
    [db]
  )

  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }
  const canGoBack = currentIndex < db.length - 1
  const canSwipe = currentIndex >= 0

  // set last direction and decrease current index
  const swiped = (direction: any, nameToDelete: any, index: number) => {
    setLastDirection(direction)
    updateCurrentIndex(index - 1)
  }

  const outOfFrame = (name: any, idx: number) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
    // handle the case in which go back is pressed before card goes outOfFrame
    // currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  }

  const swipe = async (dir: any,) => {
    if (canSwipe && currentIndex < db.length) {
      await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
      const newDb = [...db];
      newDb.splice(currentIndex, 1);
      console.log(newDb);
      setDb(newDb);
    }
  }

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return
    const newIndex = currentIndex + 1
    updateCurrentIndex(newIndex)
    await childRefs[newIndex].current.restoreCard()
  }


  return (
    <div className='h-screen flex flex-col items-center justify-evenly overflow-hidden w-full'>
      {db.length > 0 ?
        <>
          <div className='relative p-2 aspect-[4/5] w-full md:w-[25rem] max-h-[75vh] md:max-h-[70vh] rounded-lg md:overflow-hidden shadow-2xl bg-green-50'>
            {
              db.map((user, index) =>
                <Fragment key={user.name}>
                  <TinderCard className='absolute w-full h-full top-0 left-0 swipe'
                    swipeRequirementType='position'
                    preventSwipe={['up', 'down']}
                    ref={childRefs[index]}
                    key={user.name}
                    onSwipe={(dir) => swiped(dir, user.name, index)}
                    onCardLeftScreen={() => outOfFrame(user.name, index)}
                  >
                    <div className='bg-white h-full rounded-md' style={{ 'backgroundImage': `url(` + user.url + `)`, 'backgroundRepeat': 'no-repeat', backgroundSize: 'cover' }} />
                    <div className='absolute left-3 bottom-3'>
                      <p className='text-2xl font-semibold text-white shadow-md'>{user.name}, {user.age}</p>
                      <p className='text-base text-neutral-300'>MCA - A, Noob Coder</p>
                    </div>
                  </TinderCard>
                </Fragment>
              )
            }
          </div>
          <div className='flex gap-3 items-center'>
            <div className="p-[2px] bg-gradient-to-tr from-amber-400  to-amber-600 rounded-full inline-block ">
              <Button variant="outline" className='rounded-full md:h-14 md:w-14 h-12 w-12 border-0 border-amber-400 hover:bg-white group' onClick={() => goBack()}>
                <svg width="0" height="0" className='absolute'>
                  <linearGradient id="rotateCcw" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#fbbf24', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#d97706', stopOpacity: 1 }} />
                  </linearGradient>
                </svg>
                <RotateCcw
                  className="scale-125 stroke-[url(#rotateCcw)] group-hover:scale-150 transition-all"
                  stroke="url(#rotateCcw)"
                />
              </Button>
            </div>
            <div className="p-[2px] bg-gradient-to-tr from-pink-700  to-pink-400 rounded-full inline-block ">
              <Button variant="outline" className='rounded-full md:h-16 md:w-16 h-16 w-16 border-0 hover:bg-white group' onClick={() => swipe('left')}>
                <svg width="0" height="0" className='absolute'>
                  <linearGradient id="xIcon" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#f472b6', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#be185d', stopOpacity: 1 }} />
                  </linearGradient>
                </svg>
                <X className='text-pink-500 scale-[2] group-hover:scale-[2.5] transition-all stroke-3 stroke-[url(#xIcon)]'
                  stroke="url(#xIcon)"
                />
              </Button>
            </div>
            <div className="p-[2px] bg-gradient-to-tr from-sky-400  to-sky-700 rounded-full inline-block ">
              <Button variant="outline" className='rounded-full md:h-14 md:w-14 h-12 w-12 border-0 hover:bg-white group'>
                <svg width="0" height="0" className='absolute'>
                  <linearGradient id="star" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#0369a1', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#38bdf8', stopOpacity: 1 }} />
                  </linearGradient>
                </svg>
                <Star className='fill-sky-500 text-sky-500 scale-[2] group-hover:scale-[2.2] transition-all stroke-3 stroke-[url(#star)]'
                  stroke="url(#star)"
                />
              </Button>
            </div>
            <div className="p-[2px] bg-gradient-to-tr from-green-700  to-green-400 rounded-full inline-block ">
              <Button variant="outline" className='rounded-full md:h-16 md:w-16 h-16 w-16 border-0 hover:bg-white group' onClick={() => swipe('right')}>
                <svg width="0" height="0" className='absolute'>
                  <linearGradient id="heart" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#4ade80', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#15803d', stopOpacity: 1 }} />
                  </linearGradient>
                </svg>
                <Heart className='fill-green-500 text-green-500 scale-[2] group-hover:scale-[2.5] transition-all stroke-3 stroke-[url(#heart)]'
                  stroke="url(#heart)"
                />
              </Button>
            </div>
            <div className="p-[2px] bg-gradient-to-tr from-purple-400  to-purple-700 rounded-full inline-block ">
              <Button variant="outline" className='rounded-full md:h-14 md:w-14 h-12 w-12 border-0 hover:bg-white group'>
                <svg width="0" height="0" className='absolute'>
                  <linearGradient id="zap" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#7e22ce', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#c084fc', stopOpacity: 1 }} />
                  </linearGradient>
                </svg>
                <Zap className='fill-purple-500 text-purple-500 scale-[2] group-hover:scale-[2.2] transition-all stroke-3 stroke-[url(#zap)]'
                  stroke="url(#zap)"
                />
              </Button>
            </div>
          </div>
          <div className='hidden md:flex mb-5'>
            Keyboard controls here
          </div>
        </>
        : <div className='relative flex items-center justify-center p-2 aspect-[4/5] w-full max-h-[75vh] md:max-h-[70vh] rounded-lg overflow-hidden'>
          <p className='text-xl'>You swiped all available user 🙂</p>
        </div>}
    </div>
  )
}

export default Home
