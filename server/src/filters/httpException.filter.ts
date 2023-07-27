import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Log4jsLogger } from '@nestx-log4js/core';
import { Request, Response } from 'express';
import { HttpExceptionResponseType } from 'src/types/httpExceptionResponseType';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private logger: Log4jsLogger) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const message = exception.message;
    const pipeMessage = exception.getResponse() as HttpExceptionResponseType;

    this.logger.error(
      `${status}: path: ${request.url} --- param: ${
        JSON.stringify(request.query) === '{}' ? null : request.query.toString()
      } --- query: ${request.params?.toString()} --- body: ${request.body?.toString()} --- message: ${
        pipeMessage.message || message
      }`,
      HttpExceptionFilter.name,
    );

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      message: pipeMessage.message || message,
    });
  }
}
