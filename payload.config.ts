import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import { buildConfig } from "payload";
import { Admins } from "./src/collections/Admins";
import { Categories } from "./src/collections/Categories";
import { Favourites } from "./src/collections/Favourites";
import { Media } from "./src/collections/Media";
import { OrderItems } from "./src/collections/OrderItems";
import { Orders } from "./src/collections/Orders";
import { Products } from "./src/collections/Products";
import { Profiles } from "./src/collections/Profiles";

export default buildConfig({
  admin: {
    user: Admins.slug,
  },
  editor: lexicalEditor(),
  collections: [
    Admins,
    Media,
    Categories,
    Products,
    Profiles,
    Orders,
    OrderItems,
    Favourites,
  ],
  plugins: [
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.S3_BUCKET || "products",
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || "minioadmin",
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "minioadmin",
        },
        region: process.env.S3_REGION || "us-east-1",
        endpoint: process.env.S3_ENDPOINT || "http://localhost:9000",
        forcePathStyle: true,
      },
    }),
  ],
  secret:
    process.env.PAYLOAD_SECRET ??
    (() => {
      throw new Error("PAYLOAD_SECRET is not set");
    })(),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),
});
