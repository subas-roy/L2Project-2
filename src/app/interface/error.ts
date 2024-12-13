export type TErrorSources = {
  path: string | number;
  meessage: string;
}[];

export type TGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorSources: TErrorSources;
};
