export default interface RequestOptions {
  body?: string;
  method: 'POST' | 'PUT';
  url: string;
  headers?: Record<string, string>;
}
