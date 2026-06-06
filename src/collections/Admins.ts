import type { CollectionConfig } from 'payload'

export const Admins: CollectionConfig = {
  slug: 'admins',
  auth: true, // This enables Payload's built-in authentication for this collection
  admin: {
    useAsTitle: 'email',
  },
  fields: [
    // Email and password fields are automatically added by auth: true
    {
      name: 'name',
      type: 'text',
    },
  ],
}
