const port = process.env.PORT && process.env.NODE_ENV !== 'production' ? `:${process.env.PORT}` : ''

export default (protocol: string, host: string, path: string, file: string) => `${protocol}://${host}${port}/${path}/${file}`
