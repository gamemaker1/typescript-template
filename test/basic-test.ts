// ~/test/basic-test.ts
// Test extremely basic things

import { add } from '../source/index.js'

describe('basic tests', () => {
	test('math', () => {
		expect(add(2, 2)).toEqual(4)
	})
})
