import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { Button, PageTitle } from '@typing-trainer/ui'

export default function NotFoundPage(): ReactElement {
  return <div className="not-found-page">
    <span className="not-found-number">404</span>
    <PageTitle eyebrow="СБОЙ МАРШРУТА" title="Такой трассы нет." description="Похоже, эта страница свернула не туда." />
    <Link to="/">
      <Button>На главную ↗</Button>
    </Link>
  </div>
}
