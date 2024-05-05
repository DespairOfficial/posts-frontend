import { NestError } from '../classes/NestError';
import { NestErrorResponse } from '../classes/NestErrorResponse';

export const isNestErrorResponse = (x: unknown): x is NestErrorResponse => {

  return Boolean(
    x &&
      typeof x === 'object' &&
      typeof (x as NestErrorResponse).status === 'number' &&
      isNestError((x as NestErrorResponse).data),
  );
};

export const isNestError = (x: unknown): x is NestError => {
  return Boolean(
    x &&
      typeof x === 'object' &&
      typeof (x as NestError).message === 'string' &&
      typeof (x as NestError).timestamp === 'string' &&
      typeof (x as NestError).path === 'string' &&
      typeof (x as NestError).statusCode === 'number',
  );
};
