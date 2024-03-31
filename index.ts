import { type BunPlugin } from 'bun'
import { resolveCallback } from './utils/utis'

export default (mappers: { [key: string]: string }): BunPlugin => ({
	name: 'BunModuelNameMapperPlugin',
	setup(build) {
		const filter = new RegExp(Object.keys(mappers).join('|'))
		build.onResolve({ filter }, resolveCallback(mappers))
	},
})
