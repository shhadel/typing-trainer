import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, PageTitle, StatCard } from '@typing-trainer/ui'
import { practiceTexts, readResults } from '../data/demoData.ts'

export default function HomePage(): ReactElement {
  const results = readResults()
  const best = results.reduce((max, result) => Math.max(max, result.cpm || 0), 0)
  const accuracy = results.length ? Math.round(results.reduce((sum, result) => sum + result.accuracy, 0) / results.length) : 0
  return (
    <>
      <PageTitle eyebrow="ПЕЧАТАЙ В СВОЁМ РИТМЕ" title="Привет, гонщик" description="Набирай точнее, ускоряйся и обгоняй свой предыдущий результат!" action={<Link to="/train"><Button>Начать заезд</Button></Link>} />
      <section className="stats-grid" aria-label="Краткая статистика">
        <StatCard label="Тренировок" value={results.length} note="в этом браузере" />
        <StatCard label="Лучший темп" value={`${best} ЗПМ`} note="чистых знаков в минуту" />
        <StatCard label="Точность" value={`${accuracy}%`} note="среднее по тренировкам" />
      </section>
      <section className="home-lower">
        <Card className="welcome-card">
          <div className="welcome-copy">
            <span className="ui-eyebrow">ТВОЯ ПОЛОСА</span>
            <h2>Готов к старту?</h2>
            <p>Выбери текст, сосредоточься на точности и посмотри, как далеко уедет твоя машина.</p>
            <Link to="/train">
              <Button variant="secondary">На стартовую линию{' '}
                <span aria-hidden="true">→</span>
              </Button>
            </Link>
          </div>
        </Card>
        <Card className="text-list-card">
          <div className="card-heading"><div><span className="ui-eyebrow">КАТАЛОГ</span><h2>Тексты для старта</h2></div><Link to="/texts" className="text-link">Все тексты</Link></div>
          {practiceTexts.slice(0, 2).map((text) => <Link className="mini-text-row" to={`/texts/${text.id}`} key={text.id}><span className="mini-text-icon">Aa</span><span><strong>{text.title}</strong><small>{text.category} · {text.duration}</small></span><span className="row-arrow">↗</span></Link>)}
        </Card>
      </section>
    </>
  )
}
