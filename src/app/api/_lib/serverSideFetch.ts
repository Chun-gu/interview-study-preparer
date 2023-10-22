export function serverSideFetch(
  url: string,
  { method, headers, ...options }: RequestInit,
) {
  return fetch(`${process.env.DISCORD_API_ENDPOINT + url}`, {
    method,
    headers: {
      Authorization: `Bot ${process.env.DISCORD_BOT_API_KEY}`,
      'Content-Type': 'application/json; charset=UTF-8',
      'User-Agent':
        'DiscordBot (https://github.com/chun-gu/interview-study-preparer, 1.0.0)',
      ...headers,
    },
    ...options,
  })
}
