import { NavLink } from 'react-router-dom'
import type { ReactElement } from 'react'

const links = [
  { to: '/', label: 'Обзор', end: true },
  { to: '/train', label: 'Тренировка' },
  { to: '/stats', label: 'Статистика' },
  { to: '/texts', label: 'Тексты' },
]

export default function SidebarNav(): ReactElement {
  return (
    <aside className="sidebar">
      <nav className="nav-links" aria-label="Основная навигация">
        {links.map(({ to, label, end }) => (
          <NavLink key={to} to={to} end={end} className={({ isActive }) => `nav-link${isActive ? ' nav-link--active' : ''}`}>
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
