import { faker } from '@faker-js/faker';
import axios from 'axios';
import { AxiosHttpClient } from '~/app/infra/http';

jest.mock('axios');

type SutTypes = {
  sut: AxiosHttpClient;
};

const makeSut = (): SutTypes => {
  return {
    sut: new AxiosHttpClient(axios)
  };
};

describe('AxiosHttpClient', () => {
  describe('post', () => {
    test('should call axios.post with correct URL values', async () => {
      const defaultValue = {
        data: null,
        status: 200
      };
      jest.spyOn(axios, 'request').mockResolvedValueOnce(defaultValue);
      const { sut } = makeSut();
      const response = await sut.request({
        method: 'post',
        url: faker.internet.url()
      });
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeNull();
    });

    test('should return correct error on axios.post', async () => {
      const defaultValue = {
        response: {
          status: 500,
          data: 'Error'
        }
      };
      jest.spyOn(axios, 'request').mockRejectedValueOnce(defaultValue);
      const { sut } = makeSut();
      const response = await sut.request({
        method: 'post',
        url: faker.internet.url()
      });
      expect(response).toEqual({
        statusCode: defaultValue.response.status,
        body: defaultValue.response.data
      });
    });
  });
});
