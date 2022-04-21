import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/sidebar'
import TopBar from '../../components/topbar'

function Layout() {
  return (
    <div className="h-screen w-screen bg-white flex justify-center">
      <Sidebar className="ml-14" />
      <div className="w-full h-full ml-14">
        <TopBar />
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
