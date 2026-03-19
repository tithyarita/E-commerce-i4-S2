import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const req = context.switchToHttp().getRequest();
    const { method, url } = req;

    const start = Date.now();
    return next.handle().pipe(
      tap(() => {
        console.log(`[HTTP] ${method} ${url} - ${Date.now() - start}ms`);
      }),
    );
  }
}