import type { ReactElement } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import AppLayout from './components/AppLayout.tsx'
import HomePage from './pages/HomePage.tsx'
import TrainingPage from './pages/TrainingPage.tsx'
import StatisticsPage from './pages/StatisticsPage.tsx'
import TextsPage from './pages/TextsPage.tsx'
import TextDetailsPage from './pages/TextDetailsPage.tsx'
import NotFoundPage from './pages/NotFoundPage.tsx'

function TrainingRoute(): ReactElement {
  const location = useLocation()
  return <TrainingPage key={location.search} />
}

export default function App(): ReactElement {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="train" element={<TrainingRoute />} />
        <Route path="stats" element={<StatisticsPage />} />
        <Route path="texts" element={<TextsPage />} />
        <Route path="texts/:textId" element={<TextDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
