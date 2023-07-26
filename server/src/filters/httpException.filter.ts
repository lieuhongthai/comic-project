import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Inject,
} from '@nestjs/common';
import { Log4jsLogger } from '@nestx-log4js/core';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  //   @Inject(Log4jsLogger)
  //   private logger: Log4jsLogger;
  constructor(private logger: Log4jsLogger) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    this.logger.error(
      `${status}: path: ${
        request.url
      } --- param: ${request.query?.toString()} --- query: ${request.params?.toString()} --- body: ${request.body?.toString()} --- message: ${
        exception?.message
      }`,
      HttpExceptionFilter.name,
    );

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
