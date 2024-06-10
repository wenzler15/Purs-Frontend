import { faker } from '@faker-js/faker';
import 'jest-localstorage-mock';
import { LocalStorageAdapter } from '~/app/infra/cache';

const makeSut = (): LocalStorageAdapter => {
  return new LocalStorageAdapter();
};

const objectElement = { name: 'John', age: 25 };

describe('LocalStorageAdapter', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('should call localStorage.setItem with correct values', () => {
    const sut = makeSut();
    const key = faker.database.column();
    sut.set(key, objectElement);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      key,
      JSON.stringify(objectElement)
    );
  });

  test('should call localStorage.removeItem if value is null', () => {
    const sut = makeSut();
    const key = faker.database.column();
    sut.set(key, undefined);
    expect(localStorage.removeItem).toHaveBeenCalledWith(key);
  });

  test('should call localStorage.getItem with correct value', () => {
    const sut = makeSut();
    const key = faker.database.column();
    const getItemSpy = jest
      .spyOn(localStorage, 'getItem')
      .mockReturnValueOnce(JSON.stringify(objectElement));
    const obj = sut.get(key);
    expect(obj).toEqual(objectElement);
    expect(getItemSpy).toHaveBeenCalledWith(key);
  });

  test('should call localStorage.getItem and return empty object', () => {
    const sut = makeSut();
    const key = faker.database.column();
    jest.spyOn(localStorage, 'getItem').mockImplementationOnce(() => null);
    const obj = sut.get(key);
    expect(obj).toEqual({});
  });
});
