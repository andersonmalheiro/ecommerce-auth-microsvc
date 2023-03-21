export class ResponseError extends Error {
  constructor(public message: string, public stack?: string) {
    super(message);
    this.name = 'ResponseError';
  }
}

type Fields = {
  [x: string]: string[] | undefined;
  [x: number]: string[] | undefined;
  [x: symbol]: string[] | undefined;
};

export class ValidationError extends Error {
  constructor(public message: string, public fields: Fields) {
    super(message);
    this.name = 'ResponseError';
  }
}
