import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { addResult, practiceTexts, readResults, RESULTS_KEY } from './demoData.ts'
import type { TrainingResult } from './demoData.ts'

const storedValues = new Map<string, string>()

function makeResult(id: number): TrainingResult {
  return {
    id,
    textTitle: 'Тихое утро',
    cpm: 120,
    accuracy: 98,
    rawErrors: 2,
    remainingErrors: 1,
    createdAt: '2026-11-21T00:00:00.000Z',
  }
}

describe('practiceTexts', () => {
  it('содержит три текста с полями, необходимыми для страниц', () => {
    expect(practiceTexts).toHaveLength(3)
    expect(practiceTexts[0]).toMatchObject({ id: '1', category: 'Разминка', title: 'Тихое утро' })
  })
})

describe('хранение результатов обучения', () => {
  beforeEach(() => {
    storedValues.clear()
    vi.stubGlobal('localStorage', {
      getItem(key: string): string | null {
        return storedValues.get(key) ?? null
      },
      setItem(key: string, value: string): void {
        storedValues.set(key, value)
      },
    })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('возвращает пустой список, если в хранилище нет результатов или неверный JSON', () => {
    expect(readResults()).toEqual([])
    storedValues.set(RESULTS_KEY, '{invalid')
    expect(readResults()).toEqual([])
  })

  it('фильтрует недопустимые строки и возвращает действительные сохраненные результаты', () => {
    storedValues.set(RESULTS_KEY, JSON.stringify([makeResult(1), { id: 'bad' }]))

    expect(readResults()).toEqual([makeResult(1)])
  })

  it('сначала добавляются новые результаты, а сохраненная история ограничивается сотней строк', () => {
    storedValues.set(RESULTS_KEY, JSON.stringify(Array.from({ length: 100 }, (_, index) => makeResult(index))))

    const results = addResult(makeResult(100))

    expect(results).toHaveLength(100)
    expect(results[0]).toEqual(makeResult(100))
    expect(readResults()).toEqual(results)
  })
})
