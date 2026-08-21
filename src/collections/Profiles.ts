import type { CollectionConfig } from "payload";

export const Profiles: CollectionConfig = {
  slug: "profiles",
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  admin: {
    useAsTitle: "firstName",
  },
  fields: [
    {
      name: "id",
      type: "text",
    },
    {
      name: "firstName",
      type: "text",
    },
    {
      name: "lastName",
      type: "text",
    },
    {
      name: "phone",
      type: "text",
    },
    {
      name: "gender",
      type: "text",
    },
    {
      name: "birthday",
      type: "date",
    },
  ],
};
