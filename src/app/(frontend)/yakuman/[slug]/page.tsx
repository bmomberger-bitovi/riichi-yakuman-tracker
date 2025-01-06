import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { ContentBlock } from '@/blocks/Content/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { YakumanAchievement } from '@/payload-types'
import { formatDateTime } from '@/utilities/formatDateTime'
import { CMSLink } from '@/components/Link'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'yakuman',
    depth: 1,
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = posts.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Yakuman({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const url = '/posts/' + slug
  const yakuman = await queryYakumanBySlug({ slug })

  if (!yakuman) return <PayloadRedirects url={url} />

  return (
    <>
    <CMSLink url="/" className='ms-6'>Go Back</CMSLink>
    <article className="pt-16 pb-16">
      <PageClient />


      <h2 className='text-3xl text-center mb-12 font-bold'>Yakuman: {yakuman.title}</h2>

      {yakuman.heroImage && (
        <MediaBlock blockType='mediaBlock' media={yakuman.heroImage} />
      )}

      <ContentBlock blockType='content' columns={[
        { size: "full", richText: yakuman.content}]} />

      {yakuman.yakumanAchievements?.docs?.length ? (
        <>
          <h3 className="text-xxl text-center mb-8 font-bold">Dates I achieved this Yakuman</h3>
          <ul className='text-center'>
            {yakuman.yakumanAchievements?.docs?.map((achievement, index) => (
              <li key={index}>{formatDateTime((achievement as YakumanAchievement).date)}</li>
            ))}
          </ul>
        </>
      ) : null}

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

    </article>
    </>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const post = await queryYakumanBySlug({ slug })

  return generateMeta({ doc: post })
}

const queryYakumanBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'yakuman',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
    populate: { 'yakuman-achievements': {
      'date': true
    } }
  })

  return result.docs?.[0] || null
})
