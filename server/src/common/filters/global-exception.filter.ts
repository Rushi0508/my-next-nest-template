import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common'
import { Response } from 'express'

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    if (exception instanceof HttpException || exception instanceof Error) {
      console.log(exception)
      const status = exception instanceof HttpException ? exception.getStatus() : 500
      const errorResponse =
        exception instanceof HttpException ? exception.getResponse() : { message: exception.message }
      console.log(status)
      console.log(errorResponse)
      response.status(status).json(typeof errorResponse === 'string' ? { message: errorResponse } : errorResponse)
    } else {
      console.error('Unexpected error:', exception)

      response.status(500).json({
        message: 'Something went wrong',
        data: exception,
      })
    }
  }
}
