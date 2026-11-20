export interface PracticeText {
  id: string
  category: string
  title: string
  text: string
  duration: string
}

export interface TrainingResult {
  id: number
  textTitle: string
  cpm: number
  accuracy: number
  rawErrors: number
  remainingErrors: number
  createdAt: string
}

export const practiceTexts: PracticeText[] = [
  {
    id: '1',
    category: 'Разминка',
    title: 'Тихое утро',
    text: 'Утром солнце заглянуло в окно. Город проснулся и наполнился новыми звуками.',
    duration: '1 минута',
  },
  {
    id: '2',
    category: 'Природа',
    title: 'Лесная тропа',
    text: 'Узкая тропа вела через сосновый лес к прозрачному озеру. Ветер качал ветви, а птицы перекликались высоко над головой.',
    duration: '2 минуты',
  },
  {
    id: '3',
    category: 'Технологии',
    title: 'Новый маршрут',
    text: 'Хороший инструмент помогает сосредоточиться на задаче. Маленькие шаги каждый день приводят к большому результату.',
    duration: '2 минуты',
  },
]

export const RESULTS_KEY = 'stroka-training-results'

function isTrainingResult(value: unknown): value is TrainingResult {
  if (typeof value !== 'object' || value === null) return false

  const result = value as Record<string, unknown>

  return typeof result.id === 'number'
    && typeof result.textTitle === 'string'
    && typeof result.cpm === 'number'
    && typeof result.accuracy === 'number'
    && typeof result.rawErrors === 'number'
    && typeof result.remainingErrors === 'number'
    && typeof result.createdAt === 'string'
}

export function readResults(): TrainingResult[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(RESULTS_KEY) || '[]')

    return Array.isArray(parsed) ? parsed.filter(isTrainingResult) : []
  } catch {
    return []
  }
}

export function addResult(result: TrainingResult): TrainingResult[] {
  const results = [result, ...readResults()].slice(0, 100)
  localStorage.setItem(RESULTS_KEY, JSON.stringify(results))

  return results
}
