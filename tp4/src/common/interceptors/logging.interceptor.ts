import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const type = context.getType<string>(); // FIX TYPE ISSUE
    const start = Date.now();

    // ----------------------
    // REST API (HTTP)
    // ----------------------
    if (type === 'http') {
      const req = context.switchToHttp().getRequest();

      const method = req?.method ?? 'UNKNOWN';
      const url = req?.url ?? 'UNKNOWN';

      return next.handle().pipe(
        tap(() => {
          const ms = Date.now() - start;
          console.log(`[HTTP] ${method} ${url} - ${ms}ms`);
        }),
      );
    }

    // ----------------------
    // GRAPHQL
    // ----------------------
    if (type === 'graphql') {
      const gqlContext = context.getArgByIndex(3);

      const fieldName = gqlContext?.fieldName ?? 'UNKNOWN_FIELD';

      return next.handle().pipe(
        tap(() => {
          const ms = Date.now() - start;
          console.log(`[GRAPHQL] ${fieldName} - ${ms}ms`);
        }),
      );
    }

    // ----------------------
    // DEFAULT (fallback)
    // ----------------------
    return next.handle().pipe(
      tap(() => {
        const ms = Date.now() - start;
        console.log(`[UNKNOWN] ${type} - ${ms}ms`);
      }),
    );
  }
}