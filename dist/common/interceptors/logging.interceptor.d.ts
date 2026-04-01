import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
export declare class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): import("rxjs").Observable<any>;
}
