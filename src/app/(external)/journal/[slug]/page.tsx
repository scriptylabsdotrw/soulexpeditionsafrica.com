import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { formatDate, getJournalPost, getJournalPosts } from '@/external/lib/data';
import { lexicalToBlocks, lexicalToPlainText } from '@/external/lib/lexical';

export const dynamic = 'force-dynamic';

export async function generateMetadata(props: any) {
  const { params } = props as { params: Promise<{ slug: string }> };
  const { slug } = await params;
  const a = await getJournalPost(slug);
  if (!a) return { title: 'Journal · Soul Expeditions Africa' };
  return {
    title: `${a.title} · Journal · Soul Expeditions Africa`,
    description: a.excerpt || lexicalToPlainText(a.body).slice(0, 160),
  };
}

export default async function ArticlePage(props: any) {
  const { params } = props as { params: Promise<{ slug: string }> };
  const { slug } = await params;

  const [a, all] = await Promise.all([getJournalPost(slug), getJournalPosts()]);
  if (!a) notFound();

  const blocks = lexicalToBlocks(a.body);
  const half = Math.ceil(blocks.length / 2);
  const firstHalf = blocks.slice(0, half);
  const secondHalf = blocks.slice(half);

  /* Same-category posts first, then anything else, capped at three. */
  const others = all.filter((x) => x.slug !== a.slug);
  const related = [
    ...others.filter((x) => x.category && x.category === a.category),
    ...others.filter((x) => !x.category || x.category !== a.category),
  ].slice(0, 3);

  const meta = [a.author, a.authorRole, formatDate(a.publishedAt), a.readTime].filter(Boolean);

  return (
    <main className="bg-white">
      {/* ─────────── HERO ─────────── */}
      <section className="relative isolate">
        <div className="absolute inset-0 -z-10 bg-neutral-950">
          {a.image && (
            <Image
              src={a.image}
              alt={a.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          )}
          <div className="hero-overlay" />
        </div>

        <div className="mx-auto flex min-h-[58svh] max-w-[1280px] flex-col justify-end px-6 pb-14 pt-28 text-white lg:px-10">
          <Link
            href="/journal"
            className="self-start text-[0.7rem] font-medium uppercase tracking-[0.32em] text-white/70 transition hover:text-white"
          >
            ← All journal
          </Link>

          {a.category && (
            <div className="mt-8 inline-flex items-center gap-3 self-start text-[0.66rem] font-medium uppercase tracking-[0.4em] text-white/85">
              <span className="h-1.5 w-1.5 rounded-full bg-[#F58220]" />
              <span>
                {a.category}
                {a.tag ? ` · ${a.tag}` : ''}
              </span>
            </div>
          )}

          <h1 className="mt-6 text-balance text-[clamp(2.4rem,6.5vw,5.6rem)] leading-[0.97] tracking-[-0.038em]">
            <span className="font-bold">{a.title}</span>
          </h1>
          {a.excerpt && (
            <p className="mt-6 max-w-3xl text-balance text-xl leading-9 text-white/85 lg:text-2xl">
              {a.excerpt}
            </p>
          )}

          {meta.length > 0 && (
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-[0.7rem] font-medium uppercase tracking-[0.32em] text-white/70">
              {meta.map((m, i) => (
                <span key={m} className="flex items-center gap-6">
                  {i > 0 && <span className="h-3 w-px bg-white/30" aria-hidden="true" />}
                  {m}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─────────── ARTICLE BODY ─────────── */}
      <article className="px-6 py-14 lg:px-10 lg:py-20">
        <div className="mx-auto grid max-w-[1180px] gap-16 lg:grid-cols-[0.22fr_1fr] lg:gap-20">
          {/* Sticky meta rail */}
          <aside className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-[0.62rem] font-medium uppercase tracking-[0.4em] text-[#F58220]">
              Contents
            </p>
            <div className="mt-6 space-y-5 border-t border-neutral-200 pt-6">
              {a.author && (
                <div>
                  <p className="text-[0.6rem] uppercase tracking-[0.32em] text-neutral-500">
                    Author
                  </p>
                  <p className="mt-2 text-base font-medium text-neutral-950">{a.author}</p>
                  {a.authorRole && (
                    <p className="mt-1 text-sm text-neutral-600">{a.authorRole}</p>
                  )}
                </div>
              )}
              {formatDate(a.publishedAt) && (
                <div>
                  <p className="text-[0.6rem] uppercase tracking-[0.32em] text-neutral-500">
                    Published
                  </p>
                  <p className="mt-2 text-base text-neutral-950">{formatDate(a.publishedAt)}</p>
                </div>
              )}
              {a.readTime && (
                <div>
                  <p className="text-[0.6rem] uppercase tracking-[0.32em] text-neutral-500">
                    Reading
                  </p>
                  <p className="mt-2 text-base text-neutral-950">{a.readTime}</p>
                </div>
              )}
              <div className="border-t border-neutral-200 pt-5">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-neutral-950 transition hover:text-[#F58220]"
                >
                  Enquire now →
                </Link>
              </div>
            </div>
          </aside>

          {/* Body */}
          <div className="space-y-6">
            {blocks.length > 0 ? (
              <>
                <div className="space-y-6 [&>p:first-child]:first-letter:float-left [&>p:first-child]:first-letter:mr-3 [&>p:first-child]:first-letter:text-[5rem] [&>p:first-child]:first-letter:font-bold [&>p:first-child]:first-letter:leading-[0.85] [&>p:first-child]:first-letter:text-[#F58220]">
                  {firstHalf}
                </div>

                {a.pullQuote && (
                  <figure className="my-12 border-l-2 border-[#F58220] pl-8 lg:my-16">
                    <blockquote className="text-balance text-3xl font-light leading-[1.18] tracking-[-0.015em] text-neutral-950 lg:text-4xl">
                      <span className="font-bold text-[#F58220]">“</span>
                      {a.pullQuote.quote}
                      <span className="font-bold text-[#F58220]">”</span>
                    </blockquote>
                    {a.pullQuote.attribution && (
                      <figcaption className="mt-6 text-[0.65rem] font-medium uppercase tracking-[0.32em] text-neutral-500">
                        — {a.pullQuote.attribution}
                      </figcaption>
                    )}
                  </figure>
                )}

                <div className="space-y-6">{secondHalf}</div>
              </>
            ) : (
              <p className="text-lg leading-8 text-neutral-500">
                This story is still being written.
              </p>
            )}

            {/* Article footer */}
            <div className="mt-16 flex items-center justify-between border-t border-neutral-200 pt-10">
              {a.category ? (
                <div>
                  <p className="text-[0.6rem] uppercase tracking-[0.4em] text-neutral-500">
                    Filed under
                  </p>
                  <p className="mt-3 text-lg font-bold text-neutral-950">{a.category}</p>
                </div>
              ) : (
                <span />
              )}
              <Link
                href="/journal"
                className="inline-flex items-center gap-3 rounded-full border border-neutral-200 bg-white px-7 py-3.5 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-neutral-950 transition hover:border-[#F58220] hover:text-[#F58220]"
              >
                More journal →
              </Link>
            </div>
          </div>
        </div>
      </article>

      {/* ─────────── RELATED ─────────── */}
      {related.length > 0 && (
        <section className="bg-neutral-50/70 px-6 py-14 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-[1280px] space-y-12">
            <div className="flex items-end justify-between gap-6 border-b border-neutral-200 pb-6">
              <div className="flex items-start gap-5">
                <span className="mt-3 inline-block h-px w-10 bg-[#F58220]" />
                <h2 className="text-balance text-[clamp(1.8rem,3.6vw,2.6rem)] leading-[1.04] tracking-[-0.025em] text-neutral-950">
                  <span className="font-bold">Keep reading.</span>
                </h2>
              </div>
              <Link
                href="/journal"
                className="hidden text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-neutral-700 hover:text-[#F58220] sm:inline"
              >
                All journal →
              </Link>
            </div>

            <ul className="grid gap-px overflow-hidden rounded-sm bg-neutral-200/80 md:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug} className="bg-white">
                  <Link href={`/journal/${r.slug}`} className="group flex h-full flex-col">
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                      {r.image && (
                        <Image
                          src={r.image}
                          alt={r.title}
                          fill
                          sizes="(min-width: 768px) 33vw, 100vw"
                          className="object-cover transition duration-[1500ms] ease-out group-hover:scale-105"
                        />
                      )}
                      {r.category && (
                        <div className="absolute left-5 top-5">
                          <span className="rounded-full bg-black/35 px-3 py-1.5 text-[0.6rem] font-medium uppercase tracking-[0.32em] text-white backdrop-blur">
                            {r.category}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-7">
                      <h3 className="text-balance text-2xl font-light leading-tight tracking-tight text-neutral-950 transition group-hover:text-[#F58220]">
                        <span className="font-bold">{r.title}</span>
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-neutral-600">{r.excerpt}</p>
                      <div className="mt-6 flex items-center justify-between border-t border-neutral-200 pt-5 text-[0.6rem] uppercase tracking-[0.32em] text-neutral-500">
                        <span>{formatDate(r.publishedAt)}</span>
                        <span className="transition group-hover:translate-x-1 group-hover:text-[#F58220]">
                          Read →
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </main>
  );
}
