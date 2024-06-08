import { faker } from '@faker-js/faker';
import { HttpStatusCodeEnum } from '~/app/application/protocols';
import { HttpClientSpy } from '~/app/application/test';
import { RemoteAuthentication } from '~/app/application/usecases';
import { AccessDeniedError, UnexpectedError } from '~/app/domain/errors';

type SutTypes = {
  httpClientSpy: HttpClientSpy;
  sut: RemoteAuthentication;
};

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy();
  const sut = new RemoteAuthentication(url, httpClientSpy);
  return {
    sut,
    httpClientSpy
  };
};

const defaultParams = {
  email: faker.internet.email(),
  password: faker.internet.password()
};

const defaultBodyApi = {
  access_token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Ikx1YW4gVmVyZGVsaG8iLCJlbWFpbCI6Imx1YW52ZXJkZWxobzY0MkBnbWFpbC5jb20iLCJwZXJtaXNzaW9uIjo0LCJjb21wYW55IjpudWxsLCJlbXBsb3llZSI6bnVsbCwiaWF0IjoxNjYyNTEyNDk3LCJleHAiOjE2OTQwNzAwOTd9.PJhjqB3xS62wTaT5IhrLt1C23ZgydHuw6zYrCRsLvP8',
  user: {
    id: 1,
    name: 'Luan Verdelho',
    email: 'luanverdelho642@gmail.com',
    phone: '11 95796-8741',
    permission: 4,
    companyName: null,
    employee: false
  }
} as RemoteAuthentication.Response;

describe('RemoteAuthentication', () => {
  it('should call HttpClient with correct URL', async () => {
    const url = faker.internet.url();
    const { sut, httpClientSpy } = makeSut(url);
    await sut.signIn(defaultParams);
    expect(httpClientSpy.url).toBe(url);
  });

  it('should throw UnexpectedError if HttpClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCodeEnum.notFound
    };
    const promise = sut.signIn(defaultParams);
    await expect(promise).rejects.toThrow(UnexpectedError);
  });

  it('should throw UnexpectedError if HttpClient returns 401', async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCodeEnum.unauthorized
    };
    const promise = sut.signIn(defaultParams);
    await expect(promise).rejects.toThrow(AccessDeniedError);
  });

  it('should throw UnexpectedError if HttpClient returns 403', async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCodeEnum.forbidden
    };
    const promise = sut.signIn(defaultParams);
    await expect(promise).rejects.toThrow(AccessDeniedError);
  });

  it('should throw UnexpectedError if HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCodeEnum.serverError
    };
    const promise = sut.signIn(defaultParams);
    await expect(promise).rejects.toThrow(UnexpectedError);
  });

  it('should return a object if HttpClient returns 200', async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCodeEnum.ok,
      body: defaultBodyApi
    };
    const httpResponse = await sut.signIn(defaultParams);
    expect(httpResponse).toEqual(defaultBodyApi);
  });

  it('should return a object if HttpClient returns 204', async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCodeEnum.noContent,
      body: {}
    };
    const httpResponse = await sut.signIn(defaultParams);
    expect(httpResponse).toEqual({});
  });
});
