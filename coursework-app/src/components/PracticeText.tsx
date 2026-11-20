import type { ChangeEventHandler, ClipboardEventHandler, KeyboardEventHandler, ReactElement } from 'react'

interface PracticeTextProps {
  target: string
  value: string
  onChange: ChangeEventHandler<HTMLTextAreaElement>
  onKeyDown: KeyboardEventHandler<HTMLTextAreaElement>
  disabled: boolean
  onPaste: ClipboardEventHandler<HTMLTextAreaElement>
}

export default function PracticeText({ target, value, onChange, onKeyDown, disabled, onPaste }: PracticeTextProps): ReactElement {
  return (
    <div className="practice-panel">
      <div className="practice-label">
        <span>ВАШ ТЕКСТ</span>
        <span>Печатайте в поле ниже</span>
      </div>
      <p className="target-text" aria-label="Текст для набора">
        {Array.from(target).map((char, index) => {
          const typed = value[index]
          const state = typed == null ? '' : typed === char ? 'char--correct' : 'char--wrong'
          return <span key={`${index}-${char}`} className={state}>{char}</span>
        })}
      </p>
      <textarea
        className="typing-input"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onPaste={onPaste}
        disabled={disabled}
        placeholder="Начните набирать здесь…"
        aria-label="Поле для набора текста"
        rows={3}
        spellCheck="false"
        autoCapitalize="off"
        autoComplete="off"
      />
    </div>
  )
}
