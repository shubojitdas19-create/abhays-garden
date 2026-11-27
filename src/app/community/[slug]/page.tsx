import type { Metadata } from 'next'
import { CartProvider } from '@/components/store/cart-context'
import { SiteHeader } from '@/components/store/layout/site-header'
import { QuestionThread } from '@/components/store/community/question-thread'
import { initialQuestions } from '@/lib/store/community-data'

type CommunityThreadPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CommunityThreadPageProps): Promise<Metadata> {
  const { slug } = await params
  const question = initialQuestions.find((q) => q.slug === slug)

  if (!question) {
    return {
      title: "Plant Care Discussion | Abhay's Roof Garden Community",
      description: 'Read community plant care advice and verified nursery answers.',
    }
  }

  return {
    title: `${question.title} | Abhay's Roof Garden Clinic`,
    description: question.body.slice(0, 155),
    openGraph: {
      title: question.title,
      description: question.body.slice(0, 155),
      images: question.photo ? [question.photo] : ['/images/pothos.png'],
    },
  }
}

export default async function CommunityThreadPage({ params }: CommunityThreadPageProps) {
  const { slug } = await params

  return (
    <CartProvider>
      <SiteHeader />
      <QuestionThread slug={slug} />
    </CartProvider>
  )
}
