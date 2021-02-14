export default interface RequestOptions {
  body?: string;
  method: 'GET' | 'POST' | 'PUT';
  url: string;
  headers?: Record<string, string>;
}
