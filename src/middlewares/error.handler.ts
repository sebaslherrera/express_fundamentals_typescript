export function logErrors(err: any, req: any, res: any, next: Function): void {
  console.log("logErrors");
  console.error(err);
  next(err);
}

export function errorHandler(err: any, req: any, res: any, next: Function) {
  console.log("errorHandler");
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

export function boomErrorHandler(err: any, req: any, res: any, next: Function) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }
  next(err);
}
