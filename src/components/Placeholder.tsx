import type { ReactNode } from 'react';
import { isPlaceholder, showPlaceholders, type Maybe } from '../content/placeholder';

/**
 * Renders real content normally. If the value is still a todo():
 * - in development, shows a dashed "Placeholder" box describing what's needed
 * - in production, renders nothing
 */
export function PlaceholderNote({ text, inline = false }: { text: string; inline?: boolean }) {
  if (!showPlaceholders) return null;
  const Tag = inline ? 'span' : 'p';
  return (
    <Tag className={`placeholder${inline ? ' placeholder--inline' : ''}`}>
      <span className="placeholder__label">Placeholder</span> {text}
    </Tag>
  );
}

interface FieldProps<T> {
  value: Maybe<T>;
  children: (value: T) => ReactNode;
  inline?: boolean;
}

export function Field<T>({ value, children, inline }: FieldProps<T>) {
  if (isPlaceholder(value)) return <PlaceholderNote text={value.todo} inline={inline} />;
  return <>{children(value)}</>;
}
