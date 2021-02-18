import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { serialize } from 'class-transformer';
import { exception } from 'console';
import { Response } from 'express';
import { EntityNotFoundError } from 'typeorm';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest();
    let data = {};

    const pad = (v) => (v < 10 ? '0' + v : v);
    const tick = (v = new Date()) =>
      v.getUTCFullYear() +
      pad(v.getUTCMonth() + 1) +
      pad(v.getUTCDate()) +
      pad(v.getUTCHours()) +
      pad(v.getUTCMinutes()) +
      pad(v.getUTCSeconds()) +
      (v.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5);

    data['tick'] = +tick();
    data[req.method] = req.url;

    if (this.isNotFoundRouter(exception)) {
      const message =
        exception.response.error === 'Not Found'
          ? `Acesso negado a rota ${req.url} usando o método ${req.method}.`
          : exception.response.message + '. ' + exception.response.error;
      data['message'] = message;
      res.status(404).json({ ...data })
    }

    if (this.isBadRequest(exception)) {
      let violations = {};
      exception.response.message.map((v) => {
        violations[v.property] = Object.values(v.constraints)
          .join(', ')
          .split(`${v.property} `)
          .join('');
      });
      data['body'] = req.body;
      data['message'] = exception.response.error;
      data['violations'] = violations;
      res.status(404).json({ ...data });
    }

    if (this.isEntityNotFound(exception)) {
      const message = exception.message
        .replace(/\"/gi, '')
        .replace(
          'Could not find any entity of type ',
          'Não foi possível encontrar em ',
        )
        .replace('matching: ', 'o valor ');
      data['message'] = message;
      res.status(404).json({ ...data });
    }

    // if (exception instanceof EntityNotFoundError) {
    //   data.statusCode = 404
    //   data.message = [(exception as EntityNotFoundError).message]
    // } else if (exception.response.statusCode == 422) {
    //   data.statusCode = 422
    //   data.message = [...exception.response.message, exception.message]
    // } else if (exception instanceof HttpException) {
    //   data.statusCode = exception.getStatus()
    //   data.message = [exception.message]
    // } else {
    //   data.statusCode = HttpStatus.INTERNAL_SERVER_ERROR
    //   data.message = [exception.response.message, exception.message]
    // }
    // const nt = 'nao tratado';
    // res.json({ nt, ...data })
  }

  isNotFoundRouter = (e) =>
    e['response'] !== undefined &&
    e['response']['error'] !== undefined &&
    e['response']['error'] === 'Not Found';
  isBadRequest = (e) =>
    e['response'] !== undefined &&
    e['response']['error'] !== undefined &&
    e['response']['error'] === 'Bad Request';
  isEntityNotFound = (e) =>
    e['name'] !== undefined && e['name'] === 'EntityNotFound';
}
