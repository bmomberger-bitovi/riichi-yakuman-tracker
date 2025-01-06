import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const YakumanAchievements: CollectionConfig = {
  slug: 'yakuman-achievements',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'date',
  },
  fields: [
    {
      name: 'yakuman',
      type: 'relationship',
      relationTo: 'yakuman',
      required: true,
    },
    {
      name: 'date',
      type: 'date',
      required: true,
    },
  ],
}
