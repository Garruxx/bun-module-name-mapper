import { type BunPlugin } from 'bun'
import { resolveCallback } from './utils/utils'

export default (mappers: { [key: string]: string }): BunPlugin => ({
	name: 'BunModuleNameMapperPlugin',
	setup(build) {
		const filter = new RegExp(Object.keys(mappers).join('|'))
		build.onResolve({ filter }, resolveCallback(mappers))
	},
})
