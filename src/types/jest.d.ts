
declare global {
  // Jest namespace
  const jest: {
    fn: <T = any>() => jest.Mock<T>;
    mock: <T = any>(moduleName: string, factory?: () => T) => jest.Mock<T>;
    clearAllMocks: () => void;
    requireActual: <T = any>(moduleName: string) => T;
  };

  // Test functions
  const describe: (name: string, fn: () => void) => void;
  const it: (name: string, fn: () => void | Promise<void>, timeout?: number) => void;
  const test: (name: string, fn: () => void | Promise<void>, timeout?: number) => void;
  const beforeEach: (fn: () => void | Promise<void>) => void;
  const afterEach: (fn: () => void | Promise<void>) => void;
  const beforeAll: (fn: () => void | Promise<void>) => void;
  const afterAll: (fn: () => void | Promise<void>) => void;

  // Expectations
  const expect: <T = any>(actual: T) => Expect<T>;

  interface Expect<T = any> {
    not: Expect<T>;
    toBe: (expected: any) => void;
    toEqual: (expected: any) => void;
    toMatch: (expected: string | RegExp) => void;
    toBeDefined: () => void;
    toBeUndefined: () => void;
    toBeNull: () => void;
    toBeTruthy: () => void;
    toBeFalsy: () => void;
    toContain: (expected: any) => void;
    toHaveLength: (expected: number) => void;
    toBeGreaterThan: (expected: number) => void;
    toBeGreaterThanOrEqual: (expected: number) => void;
    toBeLessThan: (expected: number) => void;
    toBeLessThanOrEqual: (expected: number) => void;
    toBeInstanceOf: (expected: any) => void;
    toHaveBeenCalled: () => void;
    toHaveBeenCalledWith: (...args: any[]) => void;
    toHaveBeenCalledTimes: (expected: number) => void;
    toBeInTheDocument: () => void;
    toBeDisabled: () => void;
    toBeEnabled: () => void;
    toBeVisible: () => void;
    toBeChecked: () => void;
    toBeEmpty: () => void;
    toHaveAttribute: (attr: string, value?: any) => void;
    toHaveClass: (className: string) => void;
    toHaveValue: (value: any) => void;
    toHaveFocus: () => void;
    toContainElement: (element: any) => void;
    toContainHTML: (html: string) => void;
    toMatchSnapshot: () => void;
  }
  
  // Support for custom matchers
  namespace jest {
    interface Mock<T = any> {
      (...args: any[]): any;
      mockImplementation: (fn: (...args: any[]) => any) => Mock<T>;
      mockReturnValue: (value: any) => Mock<T>;
      mockReturnThis: () => Mock<T>;
      mockResolvedValue: (value: any) => Mock<T>;
      mockRejectedValue: (value: any) => Mock<T>;
      mockReturnValueOnce: (value: any) => Mock<T>;
      mockResolvedValueOnce: (value: any) => Mock<T>;
      mockRejectedValueOnce: (value: any) => Mock<T>;
      mockImplementationOnce: (fn: (...args: any[]) => any) => Mock<T>;
      mockClear: () => Mock<T>;
      mockReset: () => Mock<T>;
      mockRestore: () => Mock<T>;
      mockName: (name: string) => Mock<T>;
      getMockName: () => string;
      mock: {
        calls: any[][];
        instances: any[];
        invocationCallOrder: number[];
        results: any[];
      };
    }
    
    interface Expect extends jest.Matchers<void> {
      stringContaining(expected: string): any;
      stringMatching(expected: string | RegExp): any;
    }
  }
}

export {};
