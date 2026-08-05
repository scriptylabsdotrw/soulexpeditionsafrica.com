/* ────────────────────────────────────────────────────────────
   Minimal Lexical → React renderer for Payload rich-text fields.

   Returns one React node per top-level block so callers can slice
   the article body (e.g. to inject a pull-quote at the halfway mark)
   without needing to know anything about Lexical's shape.
   ──────────────────────────────────────────────────────────── */

import Link from 'next/link';
import type { ReactNode } from 'react';

type LexicalNode = {
  type?: string;
  tag?: string;
  text?: string;
  format?: number | string;
  listType?: string;
  fields?: { url?: string; newTab?: boolean; linkType?: string };
  children?: LexicalNode[];
};

/* Text-format bit flags, as emitted by Lexical. */
const BOLD = 1;
const ITALIC = 1 << 1;
const STRIKETHROUGH = 1 << 2;
const UNDERLINE = 1 << 3;
const CODE = 1 << 4;

const renderText = (node: LexicalNode, key: string): ReactNode => {
  let out: ReactNode = node.text ?? '';
  const format = typeof node.format === 'number' ? node.format : 0;

  if (format & CODE) {
    out = (
      <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[0.9em]">{out}</code>
    );
  }
  if (format & BOLD) out = <strong className="font-semibold text-neutral-950">{out}</strong>;
  if (format & ITALIC) out = <em>{out}</em>;
  if (format & UNDERLINE) out = <u>{out}</u>;
  if (format & STRIKETHROUGH) out = <s>{out}</s>;

  return <span key={key}>{out}</span>;
};

/** Render a node's children as inline content. */
const renderInline = (nodes: LexicalNode[] | undefined, keyPrefix: string): ReactNode[] =>
  (nodes ?? []).map((child, i) => {
    const key = `${keyPrefix}-${i}`;

    if (child.type === 'text') return renderText(child, key);
    if (child.type === 'linebreak') return <br key={key} />;

    if (child.type === 'link' || child.type === 'autolink') {
      const href = child.fields?.url ?? '';
      const external = /^https?:\/\//i.test(href);
      const inner = renderInline(child.children, key);
      const className =
        'underline decoration-[#F58220]/50 underline-offset-4 transition hover:text-[#F58220]';

      if (!href) return <span key={key}>{inner}</span>;
      return external ? (
        <a key={key} href={href} target="_blank" rel="noopener noreferrer" className={className}>
          {inner}
        </a>
      ) : (
        <Link key={key} href={href} className={className}>
          {inner}
        </Link>
      );
    }

    /* Unknown inline node — render whatever text it wraps. */
    return <span key={key}>{renderInline(child.children, key)}</span>;
  });

const HEADING_CLASS: Record<string, string> = {
  h1: 'mt-12 text-balance text-4xl font-bold tracking-[-0.03em] text-neutral-950 lg:text-5xl',
  h2: 'mt-12 text-balance text-3xl font-bold tracking-[-0.025em] text-neutral-950 lg:text-4xl',
  h3: 'mt-10 text-balance text-2xl font-bold tracking-tight text-neutral-950 lg:text-3xl',
  h4: 'mt-8 text-balance text-xl font-semibold tracking-tight text-neutral-950',
  h5: 'mt-8 text-lg font-semibold text-neutral-950',
  h6: 'mt-8 text-base font-semibold uppercase tracking-[0.2em] text-neutral-600',
};

const renderBlock = (node: LexicalNode, key: string): ReactNode => {
  switch (node.type) {
    case 'heading': {
      const tag = (node.tag ?? 'h2').toLowerCase();
      const Tag = tag as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
      return (
        <Tag key={key} className={HEADING_CLASS[tag] ?? HEADING_CLASS.h2}>
          {renderInline(node.children, key)}
        </Tag>
      );
    }

    case 'quote':
      return (
        <blockquote
          key={key}
          className="border-l-2 border-[#F58220] pl-8 text-xl italic leading-[1.8] text-neutral-700"
        >
          {renderInline(node.children, key)}
        </blockquote>
      );

    case 'list': {
      const ordered = node.listType === 'number';
      const ListTag = ordered ? 'ol' : 'ul';
      return (
        <ListTag
          key={key}
          className={`space-y-3 pl-6 text-xl leading-[1.85] text-neutral-800 ${
            ordered ? 'list-decimal' : 'list-disc'
          } marker:text-[#F58220]`}
        >
          {(node.children ?? []).map((li, i) => (
            <li key={`${key}-li-${i}`}>{renderInline(li.children, `${key}-li-${i}`)}</li>
          ))}
        </ListTag>
      );
    }

    case 'horizontalrule':
      return <hr key={key} className="my-12 border-neutral-200" />;

    case 'paragraph':
    default: {
      const inline = renderInline(node.children, key);
      /* Skip Lexical's trailing empty paragraphs. */
      if (!node.children?.length) return null;
      return (
        <p key={key} className="text-balance text-xl leading-[1.85] text-neutral-800">
          {inline}
        </p>
      );
    }
  }
};

/**
 * Convert a Payload rich-text value into an array of React blocks.
 * Returns `[]` for empty / malformed content so callers can branch on length.
 */
export const lexicalToBlocks = (value: unknown): ReactNode[] => {
  const root = (value as { root?: LexicalNode } | null | undefined)?.root;
  if (!root?.children?.length) return [];
  return root.children
    .map((node, i) => renderBlock(node, `blk-${i}`))
    .filter((n): n is ReactNode => n !== null);
};

/** Plain-text version of a rich-text value — useful for meta descriptions. */
export const lexicalToPlainText = (value: unknown): string => {
  const walk = (nodes: LexicalNode[] | undefined): string =>
    (nodes ?? [])
      .map((n) => (n.type === 'text' ? (n.text ?? '') : walk(n.children)))
      .join(' ');
  const root = (value as { root?: LexicalNode } | null | undefined)?.root;
  return walk(root?.children).replace(/\s+/g, ' ').trim();
};
