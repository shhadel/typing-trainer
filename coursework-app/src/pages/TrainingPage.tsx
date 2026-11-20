import type { KeyboardEvent, ReactElement } from 'react'
import { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Button, Card, PageTitle, StatCard } from '@typing-trainer/ui'
import { addResult, practiceTexts, readResults } from '../data/demoData.ts'
import type { TrainingResult } from '../data/demoData.ts'
import PracticeText from '../components/PracticeText.tsx'
import RaceTrack from '../components/RaceTrack.tsx'

export default function TrainingPage(): ReactElement {
  const [searchParams] = useSearchParams()
  const text = practiceTexts.find((item) => item.id === searchParams.get('textId')) || practiceTexts[0]
  const [value, setValue] = useState<string>('')
  const [startedAt, setStartedAt] = useState<number | null>(null)
  const [elapsed, setElapsed] = useState<number>(0)
  const [result, setResult] = useState<TrainingResult | null>(null)
  const [total, setTotal] = useState<number>(0)
  const [correct, setCorrect] = useState<number>(0)
  const [errors, setErrors] = useState<number>(0)
  const doneRef = useRef(false)
  const target = text.text
  const best = readResults().reduce((max, item) => Math.max(max, item.cpm || 0), 0)

  useEffect(() => {
    if (!startedAt || result) return undefined
    const timer = window.setInterval(() => setElapsed((Date.now() - startedAt) / 1000), 100)
    return () => window.clearInterval(timer)
  }, [startedAt, result])

  useEffect(() => {
    if (value.length < target.length || doneRef.current) return
    doneRef.current = true
    const seconds = Math.max(1, (Date.now() - (startedAt || Date.now())) / 1000)
    const finalErrors = Array.from(target).reduce((count, char, index) => count + (value[index] === char ? 0 : 1), 0)
    const attempt = {
      id: Date.now(), textTitle: text.title,
      cpm: Math.round(correct * 60 / seconds),
      accuracy: total ? Math.round(correct / total * 100) : 100,
      rawErrors: errors, remainingErrors: finalErrors,
      createdAt: new Date().toISOString(),
    }
    addResult(attempt)
    setResult(attempt)
    setElapsed(seconds)
  }, [value, target, startedAt, text.title, correct, total, errors])

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>): void {
    if (event.key.length !== 1 || event.metaKey || event.ctrlKey || event.altKey || doneRef.current) return
    if (!startedAt) setStartedAt(Date.now())
    setTotal((count) => count + 1)
    const expected = target[value.length]
    if (event.key === expected) setCorrect((count) => count + 1)
    else setErrors((count) => count + 1)
  }

  function restart(): void {
    doneRef.current = false
    setTotal(0)
    setCorrect(0)
    setErrors(0)
    setValue(''); setStartedAt(null); setElapsed(0); setResult(null)
  }

  const cpm = startedAt ? Math.round(correct * 60 / Math.max(elapsed, 0.1)) : 0
  const accuracy = total ? Math.round(correct / total * 100) : 100
  const progress = target.length ? value.length / target.length * 100 : 0

  return (
    <>
      <PageTitle eyebrow="ЗАЕЗД № 01" title="Приготовься" description="Набирай текст ниже. Твоя машинка движется вместе с каждым символом." action={<Button variant="ghost" onClick={restart}>↺ Сначала</Button>} />
      <Card className="race-card">
        <div className="race-card-heading">
          <div>
            <span className="ui-eyebrow">{text.title.toUpperCase()}</span>
            <h2>Личная гонка</h2>
          </div>
          <span className="race-tag">⏱ {text.duration}</span>
        </div>
        <RaceTrack progress={progress} ghostProgress={best ? Math.min(88, best / 8) : 0} />
        <div className="track-legend">
          <span>
            <i className="legend-dot"/> ТЫ</span>
          <span><i className="legend-dot legend-dot--ghost"/> ТВОЙ ЛИЧНЫЙ РЕКОРД</span>
        </div>
      </Card>
      <section className="training-metrics">
        <StatCard label="Чистая скорость" value={`${cpm} ЗПМ`} note="верные знаки в минуту" />
        <StatCard label="Точность" value={`${accuracy}%`} note="верных нажатий" />
        <StatCard label="Ошибки" value={errors} note="включая исправленные" />
      </section>
      <Card className="typing-card">
        <PracticeText target={target} value={value} onChange={(event) => setValue(event.target.value.slice(0, target.length))} onKeyDown={handleKeyDown} onPaste={(event) => event.preventDefault()} disabled={Boolean(result)} />
      </Card>
      {result && <Card className="result-banner">
        <span className="result-confetti">✳</span>
        <div>
          <span className="ui-eyebrow">ФИНИШ!</span>
          <h2>Отличный заезд</h2>
          <p>{result.cpm} ЗПМ · {result.accuracy}% точности · ошибок {result.rawErrors} (осталось в тексте {result.remainingErrors})</p>
        </div>
        <Link to="/stats">
          <Button variant="secondary">Моя статистика ↗</Button>
        </Link>
      </Card>
      }
      <p className="training-hint">Ошибки можно исправлять клавишей Backspace - они всё равно останутся в статистике попытки.</p>
    </>
  )
}
