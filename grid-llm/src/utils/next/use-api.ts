import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export function useNextApi<T>(url: string)
{
	return useSWR<T>(url, fetcher)
}
