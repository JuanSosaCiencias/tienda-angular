import { Category } from './category';

// Test cases for Category, describe is a Jasmine function that groups the test cases
describe('Category', () => {
  // Unit test case for Category, it is a Jasmine function that defines a test case
  // The test case checks if the Category instance is created successfully
  it('should create an instance', () => {
    // The expect function is used to define the expected output
    // The toBeTruthy function checks if the output is true
    expect(new Category(1, 'Electronics', 'Tag1', 'Active')).toBeTruthy();
  });
});
