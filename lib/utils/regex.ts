type Entity = {
  name: string,
  url: string
}

export function fromHtml(html: string): Entity {
  const content = html.match(/<a\s.*?href=\'([^\"]+)\'[^>]*>(.*?)<\/a>/)
  return { name: content![2], url: content![1] }
}
