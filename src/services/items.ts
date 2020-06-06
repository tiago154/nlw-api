import * as repo from '../repositories/items'
import { Request } from 'express'
import imageUrlBuilder from '../util/image-url-builder'

const buildImageUrl = (protocol: string, host: string) => (item: any) => ({
  id: item.id,
  title: item.title,
  imageUrl: imageUrlBuilder(protocol, host, 'uploads', item.image)
})

const listFormattedItems = async ({ protocol, hostname }: Request) => {
  const items = await repo.list()
  const serializedItems = items.map(buildImageUrl(protocol, hostname))
  return serializedItems
}

export { listFormattedItems }
