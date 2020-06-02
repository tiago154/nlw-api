import * as repo from '../repositories/items'

const buildImageUrl = (baseImageUrl: string) => item => ({
  title: item.title,
  imageUrl: `${baseImageUrl}${item.image}`
})

const baseImageUrlBuilder = (protocol: string, host: string) => `${protocol}://${host}/uploads/`

const listFormattedItems = async (protocol: string, host: string) => {
  const urlImage = baseImageUrlBuilder(protocol, host)
  const items = await repo.list()
  const serializedItems = items.map(buildImageUrl(urlImage))
  return serializedItems
}

export { listFormattedItems }
