import type { CollectionConfig } from 'payload'

export const OrderItems: CollectionConfig = {
  slug: 'order-items',
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'order',
      type: 'relationship',
      relationTo: 'orders',
      required: true,
    },
    {
      name: 'product',
      type: 'relationship',
      relationTo: 'products',
    },
    {
      name: 'quantity',
      type: 'number',
    },
    {
      name: 'price',
      type: 'number',
    },
  ],
}
