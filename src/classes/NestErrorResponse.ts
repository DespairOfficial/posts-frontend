import { NestError } from './NestError';

export class NestErrorResponse {
  constructor(_status: number, _data: NestError) {
    this.status = _status;
    this.data = _data;
  }
  data: NestError;
  status: number;
}
