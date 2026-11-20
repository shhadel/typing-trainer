import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, EmptyState, PageTitle, StatCard } from '@typing-trainer/ui'
import { readResults } from '../data/demoData.ts'

export default function StatisticsPage(): ReactElement {
  const results = readResults()
  const best = results.reduce((max, item) => Math.max(max, item.cpm || 0), 0)
  const avgAccuracy = results.length ? Math.round(results.reduce((sum, item) => sum + item.accuracy, 0) / results.length) : 0
  const totalErrors = results.reduce((sum, item) => sum + item.rawErrors, 0)
  return <>
    <PageTitle eyebrow="ТВОЙ ПРОГРЕСС" title="Результаты заездов" description="Каждый заезд помогает увидеть, как меняются скорость и точность."
      action={
        <Link to="/train">
          <Button>Новый заезд</Button>
        </Link>} />
    <section className="stats-grid">
      <StatCard label="Всего заездов" value={results.length} note="сохранено локально" />
      <StatCard label="Лучший темп" value={`${best} ЗПМ`} note="чистая скорость" />
      <StatCard label="Средняя точность" value={`${avgAccuracy}%`} note="по всем попыткам" />
      <StatCard label="Сырые ошибки" value={totalErrors} note="с учётом исправленных" />
    </section>
    <Card className="history-card">
      <div className="card-heading">
        <div>
          <span className="ui-eyebrow">ИСТОРИЯ</span>
          <h2>Последние заезды</h2>
        </div>
      </div>
      {results.length === 0 ?
        <EmptyState title="Пока тихо на трассе">Пройди первую тренировку - и результаты появятся здесь.</EmptyState> : <div className="history-table">
          <div className="history-row history-row--head">
            <span>ТЕКСТ</span>
            <span>СКОРОСТЬ</span>
            <span>ТОЧНОСТЬ</span>
            <span>ОШИБКИ</span><span>ДАТА</span>
          </div>
          {results.map((item) => <div className="history-row" key={item.id}>
            <strong>{item.textTitle}</strong>
            <span>{item.cpm} ЗПМ</span>
            <span>{item.accuracy}%</span>
            <span>{item.rawErrors}
              <small>({item.remainingErrors} ост.)</small>
            </span>
            <span>{new Date(item.createdAt).toLocaleDateString('ru-RU')}</span>
          </div>)}
        </div>}
    </Card>
  </>
}
