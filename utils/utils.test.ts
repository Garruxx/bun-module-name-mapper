import type { OnResolveArgs } from 'bun'
import { insert$GroupValues, resolveCallback } from './utis'

describe('utils', () => {
	describe('insert$GroupValues', () => {
		test('should be defined', () => {
			expect(insert$GroupValues).toBeDefined()
		})

		test('should replace groups', () => {
			const text = 'here the 1 $1, here the 2 $2 and here the 3 $3'
			const groups = /(group1) (group2) (group3)/.exec(
				'group1 group2 group3',
			)
			console.log(groups)

			expect(insert$GroupValues(/\$\d/g, text, groups)).toBe(
				'here the 1 group1, here the 2 group2 and here the 3 group3',
			)
		})
	})

	describe('resolveCallback', () => {
		test('should be defined', () => {
			expect(resolveCallback).toBeDefined()
		})

		test('should return a function', () => {
			expect(
				typeof resolveCallback({
					'^src/(.*)$': '<rootDir>/src/$1',
				}),
			).toBe('function')
		})
		test('the returned function should execute correctly', () => {
			const callback = resolveCallback({
				'^src/(.*)$': 'test/src/$1',
			})
			expect(
				callback({
					path: 'src/path/file',
				} as OnResolveArgs),
			).toEqual({ path: 'test/src/path/file' })
		})

		test('the returned function should execute correctly 2', () => {
			const path = 'src/path/file'
			const expected = 'test/src/path/file/path/file'
			const callback = resolveCallback({
				'^src/(.*)$': 'test/src/$1/$1',
			})
			expect(
				callback({
					path,
				} as OnResolveArgs),
			).toEqual({ path: expected })
		})
	})
})
