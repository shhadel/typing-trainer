import type { ReactElement } from 'react'

interface RaceTrackProps {
  progress?: number
  ghostProgress?: number
}

export default function RaceTrack({ progress = 0, ghostProgress = 0 }: RaceTrackProps): ReactElement {
  const player = Math.min(100, Math.max(0, progress))
  const ghost = Math.min(100, Math.max(0, ghostProgress))
  return (
    <div className="race-track" aria-label={`Прогресс заезда ${Math.round(player)} процентов`}>
      <div className="track-lane">
        <span className="lane-label">ВЫ</span>
        <span className="lane-line" />
        <span className="race-car" style={{ left: `calc(${player}% - 16px)`, transform: 'scaleX(-1)' }}>🏎️</span>
      </div>
      <div className="track-lane track-lane--ghost">
        <span className="lane-label">РЕКОРД</span>
        <span className="lane-line" />
        <span className="race-car race-car--ghost" style={{ left: `calc(${ghost}% - 16px)`, transform: `scaleX(-1)`}}>🚙</span>
      </div>
      <span className="finish-flag">⚑</span>
    </div>
  )
}
