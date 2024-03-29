export interface SwaggerDocumentOptions {
  /*** List of modules to include in the specification*/
  // eslint-disable-next-line @typescript-eslint/ban-types
  include?: Function[];
  // eslint-disable-next-line @typescript-eslint/ban-types
  extraModels?: Function[];

  /*** If `true`, swagger will ignore the global prefix set through `setGlobalPrefix()` method*/
  ignoreGlobalPrefix?: boolean;

  /*** If `true`, swagger will also load routes from the modules imported by `include` modules */
  deepScanRoutes?: boolean;
  /*** Custom operationIdFactory that will be used to generate the `operationId` ** based on the `controllerKey` and `methodKey`* @default () => controllerKey_methodKey*/
  operationIdFactory?: (controllerKey: string, methodKey: string) => string;
}
