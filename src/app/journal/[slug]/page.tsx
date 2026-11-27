import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CartProvider } from '@/components/store/cart-context'
import { SiteHeader } from '@/components/store/layout/site-header'
import { ArticleReader } from '@/components/store/journal/article-reader'
import { getJournalArticleBySlug, journalArticles } from '@/lib/store/journal-data'

type JournalArticlePageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return journalArticles.map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({ params }: JournalArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const article = getJournalArticleBySlug(slug)

  if (!article) {
    return {
      title: "Guide Not Found | Abhay's Roof Garden Journal",
    }
  }

  return {
    title: `${article.title} | Abhay's Roof Garden Journal`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.isoDate,
      authors: [article.author.name],
      images: [article.coverImage],
    },
  }
}

export default async function JournalArticlePage({ params }: JournalArticlePageProps) {
  const { slug } = await params
  const article = getJournalArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  return (
    <CartProvider>
      <SiteHeader />
      <ArticleReader article={article} />
    </CartProvider>
  )
}
