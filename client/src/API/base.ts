export abstract class BaseAPI {
  protected url: string;

  constructor(url: string) {
    this.url = url;
  }
}
