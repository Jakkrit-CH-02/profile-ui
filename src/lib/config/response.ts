export type Response<T> = {
  data: T;
  message: string;
  error: boolean;
}