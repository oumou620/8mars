
import '@testing-library/jest-dom';

// Si stringContaining n'est pas défini dans l'environnement de test, nous le définissons
if (!expect.stringContaining) {
  expect.stringContaining = (expected: string) => ({
    asymmetricMatch: (actual: string) => {
      return typeof actual === 'string' && actual.includes(expected);
    },
    toJSON: () => `StringContaining(${expected})`,
  });
}

// De même pour stringMatching s'il n'est pas défini
if (!expect.stringMatching) {
  expect.stringMatching = (expected: string | RegExp) => ({
    asymmetricMatch: (actual: string) => {
      return typeof actual === 'string' && 
             (typeof expected === 'string' 
               ? actual.includes(expected) 
               : expected.test(actual));
    },
    toJSON: () => `StringMatching(${expected})`,
  });
}
