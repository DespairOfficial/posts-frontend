export class NestError {
  constructor(_message: string, _timestamp: string, _statusCode: number, _path: string) {
    this.message = _message;
    this.statusCode = _statusCode;
    this.timestamp = _timestamp;
    this.path = _path;
  }
  path: string;
  message: string;
  timestamp: string;
  statusCode: number;
}
