import type { ButtonHTMLAttributes, HTMLAttributes, ReactElement, ReactNode } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
}

export function Button({ variant = 'primary', className = '', children, ...props }: ButtonProps): ReactElement {
  return <button className={`ui-button ui-button--${variant} ${className}`.trim()} {...props}>{children}</button>
}

export type CardProps = HTMLAttributes<HTMLElement>

export function Card({ className = '', children, ...props }: CardProps): ReactElement {
  return <section className={`ui-card ${className}`.trim()} {...props}>{children}</section>
}

export interface StatCardProps {
  label: string
  value: ReactNode
  note?: ReactNode
}

export function StatCard({ label, value, note }: StatCardProps): ReactElement {
  return (
    <Card className="ui-stat-card">
      <span className="ui-stat-card__label">{label}</span>
      <strong className="ui-stat-card__value">{value}</strong>
      {note && <span className="ui-stat-card__note">{note}</span>}
    </Card>
  )
}

export interface PageTitleProps {
  eyebrow?: string
  title: string
  description?: string
  action?: ReactNode
}

export function PageTitle({ eyebrow, title, description, action }: PageTitleProps): ReactElement {
  return (
    <div className="ui-page-title">
      <div>
        {eyebrow && <div className="ui-eyebrow">{eyebrow}</div>}
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {action && <div className="ui-page-title__action">{action}</div>}
    </div>
  )
}

export interface EmptyStateProps {
  title: string
  children: ReactNode
}

export function EmptyState({ title, children }: EmptyStateProps): ReactElement {
  return <div className="ui-empty-state"><span className="ui-empty-state__mark">✳</span><h3>{title}</h3><p>{children}</p></div>
}
