import type { ReactElement } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button, Card, PageTitle } from '@typing-trainer/ui'
import { practiceTexts } from '../data/demoData.ts'

export default function TextDetailsPage(): ReactElement {
  const { textId } = useParams()
  const text = practiceTexts.find((item) => item.id === textId)
  if (!text) return <>
    <PageTitle eyebrow="КАТАЛОГ" title="Текст не найден." description="Возможно, он уже уехал с трассы." />
    <Link to="/texts">
      <Button>Вернуться к текстам</Button>
    </Link>
  </>
  return <>
    <PageTitle eyebrow={`${text.category.toUpperCase()} · ${text.duration.toUpperCase()}`} title={text.title} description="Прочитай отрывок и приготовься к заезду."
      action={
        <Link to={`/train?textId=${text.id}`}>
          <Button>Начать тренировку</Button>
        </Link>} />
    <Card className="full-text-card">
      <span className="ui-eyebrow">ТЕКСТ ДЛЯ ТРЕНИРОВКИ</span>
      <p>{text.text}</p>
      <Link to="/texts" className="text-link">← Все тексты</Link>
    </Card>
  </>
}
