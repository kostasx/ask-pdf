import { expect, test } from 'vitest';

import { AI } from '~/src/ai';

test('it should be able to create an AI instance', () => {
  expect(AI.build).toBeDefined();
});
