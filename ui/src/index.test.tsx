import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { Button, Card, EmptyState, PageTitle, StatCard } from './index.tsx'

describe('Button', () => {
  it('отображает основной вариант по умолчанию и перенаправляет атрибуты', () => {
    const html = renderToStaticMarkup(createElement(Button, { id: 'start', children: 'Start' }))

    expect(html).toContain('class="ui-button ui-button--primary"')
    expect(html).toContain('id="start"')
    expect(html).toContain('Start')
  })

  it('отображает каждый именованный вариант и пользовательский класс', () => {
    const variants = ['secondary', 'ghost'] as const

    for (const variant of variants) {
      const html = renderToStaticMarkup(createElement(Button, { variant, className: 'wide', children: variant }))

      expect(html).toContain(`ui-button--${variant} wide`)
      expect(html).toContain(variant)
    }
  })
})

describe('Card', () => {
  it('отображает свои дочерние элементы, класс и стандартные атрибуты раздела', () => {
    const html = renderToStaticMarkup(createElement(Card, { className: 'history', id: 'history', children: 'Attempts' }))

    expect(html).toContain('class="ui-card history"')
    expect(html).toContain('id="history"')
    expect(html).toContain('Attempts')
  })
})

describe('StatCard', () => {
  it('показывает дополнительное примечание, если оно прилагается', () => {
    const html = renderToStaticMarkup(createElement(StatCard, { label: 'Speed', value: 42, note: 'chars/min' }))

    expect(html).toContain('ui-stat-card__label">Speed')
    expect(html).toContain('ui-stat-card__value">42')
    expect(html).toContain('ui-stat-card__note">chars/min')
  })

  it('опускает примечание, если оно не указано', () => {
    const html = renderToStaticMarkup(createElement(StatCard, { label: 'Attempts', value: 3 }))

    expect(html).not.toContain('ui-stat-card__note')
  })
})

describe('PageTitle', () => {
  it('визуализирует необязательную описание и действие', () => {
    const html = renderToStaticMarkup(createElement(PageTitle, {
      eyebrow: 'TRAINING',
      title: 'Start',
      description: 'Type the passage',
      action: createElement('button', null, 'Restart'),
    }))

    expect(html).toContain('TRAINING')
    expect(html).toContain('<h1>Start</h1>')
    expect(html).toContain('<p>Type the passage</p>')
    expect(html).toContain('Restart')
  })

  it('отображает только необходимый заголовок, если необязательный контент отсутствует', () => {
    const html = renderToStaticMarkup(createElement(PageTitle, { title: 'Texts' }))

    expect(html).toContain('<h1>Texts</h1>')
    expect(html).not.toContain('ui-eyebrow')
    expect(html).not.toContain('<p>')
    expect(html).not.toContain('ui-page-title__action')
  })
})

describe('EmptyState', () => {
  it('отображает его название и пояснительное содержание', () => {
    const html = renderToStaticMarkup(createElement(EmptyState, { title: 'No attempts', children: 'Start a training run' }))

    expect(html).toContain('<h3>No attempts</h3>')
    expect(html).toContain('<p>Start a training run</p>')
  })
})
