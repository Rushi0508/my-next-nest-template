import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { Response } from 'express'

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    if (exception instanceof HttpException || exception instanceof Error) {
      const status = exception instanceof HttpException ? exception.getStatus() : 500
      let errorResponse = { message: 'Something went wrong' }
      if (exception instanceof HttpException) {
        errorResponse = exception.getResponse() as { message: string }
      } else if (
        exception instanceof Prisma.PrismaClientKnownRequestError ||
        exception instanceof Prisma.PrismaClientUnknownRequestError ||
        exception instanceof Prisma.PrismaClientInitializationError ||
        exception instanceof Prisma.PrismaClientRustPanicError ||
        exception instanceof Prisma.PrismaClientValidationError
      ) {
        errorResponse = { message: 'Validation error. Please try again.' }
      } else if (exception instanceof Error) {
        errorResponse = { message: exception.message }
      }

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
