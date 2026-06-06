import type { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
  slug: 'orders',
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'userId',
      type: 'text',
    },
    {
      name: 'totalPrice',
      type: 'number',
    },
    {
      name: 'status',
      type: 'text',
    },
  ],
}
