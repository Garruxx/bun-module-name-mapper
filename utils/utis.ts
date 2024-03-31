import type { OnResolveArgs } from 'bun'

export const insert$GroupValues = (
	regexp: RegExp,
	text: string,
	groups: RegExpExecArray | [] | null,
) => {
	return text.replace(regexp, (substring) => {
		const index = Number(substring.replace(/\$/g, ''))
		return groups?.[index] || substring
	})
}

export const resolveCallback = (mappers: { [key: string]: string }) => {
	return ({ path, ...args }: OnResolveArgs) => {
		const mapper = Object.entries(mappers).find(([pattern]) =>
			new RegExp(pattern).test(path),
		)
		if (!mapper) return { path, ...args }
		const [pattern, toPath] = mapper

		const groups = new RegExp(pattern).exec(path)
		const newPath = insert$GroupValues(/\$\d/g, toPath, groups)
		return {
			path: newPath,
			...args,
		}
	}
}
