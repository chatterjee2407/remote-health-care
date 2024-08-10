import  StreamVideoProvider  from '@/providers/StreamClient'
import { Metadata } from 'next';
import React, { ReactNode } from 'react'

export const metadata: Metadata = {
  title: "Interact",
  description: "Video Calling App",
  icons:{
    icon:'public/icons/logo.svg'
  }
};

const RootLayout = ({children}: {children:ReactNode}) => {
  return (
    <main>
      <StreamVideoProvider >
      {children}
      </StreamVideoProvider>
        
    </main>
  )
}

export default RootLayout