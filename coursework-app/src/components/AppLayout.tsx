import type { ReactElement } from 'react'
import { Outlet } from 'react-router-dom'
import SidebarNav from './SidebarNav.tsx'

export default function AppLayout(): ReactElement {
  return (
    <div className="app-frame">
      <SidebarNav />
      <main className="main-area">
        <Outlet />
      </main>
    </div>
  )
}
