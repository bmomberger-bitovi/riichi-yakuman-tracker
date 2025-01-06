import { cn } from 'src/utilities/cn'
import React from 'react'

import type { Yakuman } from '@/payload-types'
import Link from 'next/link';

export type Props = {
  yakuman: Pick<Yakuman, 'id' | 'title' | 'slug'
  | 'yakumanAchievements' >[];
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { yakuman } = props

  return (
    <div className={cn('container')}>
      <div>
        <div className="grid grid-cols-4 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
          {yakuman?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return (
                <>
                <div className="col-span-3" key={index}>
                  <Link className="prose" href={`/yakuman/${result.slug}`}>
                      {result.title}
                  </Link>
                </div>
                <div className="col-span-1" key={`achievements-${index}`}>
                  {result.yakumanAchievements?.docs?.length ?? "0"}
                </div>
                </>
              )

            }

            return null
          })}
        </div>
      </div>
    </div>
  )
}
