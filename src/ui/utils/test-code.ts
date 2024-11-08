export function testCode(arg: string) {
  return `import userSolution from './code';
import systemSolution from './solution';

describe('inputTest', () => {
  test('should check if sum of 2 numbers is correct', () => {
    expect(userSolution(${arg})).toEqual(systemSolution(${arg}));
  });
});`;
}
