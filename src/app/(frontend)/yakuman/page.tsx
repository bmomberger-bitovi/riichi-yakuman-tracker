import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const yakuman = await payload.find({
    collection: 'yakuman',
    depth: 0,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      meta: true,
      yakumanAchievements: true,
    },
    populate: { 'yakuman-achievements': {
      'date': true
    } }
  })

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Yakuman</h1>
        </div>
      </div>

      <div className="grid grid-cols-12 container mb-8">
        <div className="col col-span-9 font-bold">Yakuman name</div>
        <div className="col col-span-3 right font-bold">Times achieved</div>
      </div>

      <CollectionArchive yakuman={yakuman.docs} />

      <div className="container">
        {yakuman.totalPages > 1 && yakuman.page && (
          <Pagination page={yakuman.page} totalPages={yakuman.totalPages} />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Payload Website Template Posts`,
  }
}
