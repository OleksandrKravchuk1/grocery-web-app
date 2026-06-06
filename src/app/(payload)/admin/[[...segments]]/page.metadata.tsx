import { default as Page } from './page'
import configPromise from '@payload-config'
import { generatePageMetadata } from '@payloadcms/next/views'

export const generateMetadata = async ({ params, searchParams }: any) =>
  generatePageMetadata({ config: configPromise, params, searchParams })

export default Page
