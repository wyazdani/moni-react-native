import AppLayout from '@/layouts/app-layout'
import React from 'react'
import { Image } from 'react-native'

const Subscription = () => {
  return (
    <AppLayout title={'Subscription'} className={'justify-center items-center'} >
      <Image source={require('../../assets/images/coming-soon.png')} className='h-80 w-80' resizeMode='contain' />
    </AppLayout>
  )
}

export default Subscription