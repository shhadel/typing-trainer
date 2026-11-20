import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { Card, PageTitle } from '@typing-trainer/ui'
import { practiceTexts } from '../data/demoData.ts'

export default function TextsPage(): ReactElement {
  return <>
    <PageTitle eyebrow="БИБЛИОТЕКА" title="Выбери свой текст" description="Короткие отрывки помогают размяться, а длинные - поймать ровный ритм." />
    <div className="category-chips">
      <span className="category-chip category-chip--active">Все тексты <b>{practiceTexts.length}</b></span>
      <span className="category-chip">Разминка</span>
      <span className="category-chip">Природа</span>
      <span className="category-chip">Технологии</span>
    </div>
    <section className="text-grid">{practiceTexts.map((text) => <Card className="text-card" key={text.id}>
      <div className="text-card-meta">
        <span>{text.category}</span>
        <span>{text.duration}</span>
      </div>
      <h2>{text.title}</h2>
      <p>{text.text}</p>
      <Link to={`/texts/${text.id}`} className="text-card-link">Посмотреть текст <span>↗</span></Link></Card>)}
    </section>
  </>
}
