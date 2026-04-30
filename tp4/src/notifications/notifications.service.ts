import { forwardRef, Inject, Injectable } from '@nestjs/common';
// import { OrdersService } from 'src/orders/orders.service';
import { EVENT_PUBLISHER } from 'src/core/tokens';

@Injectable()
export class NotificationsService {
    // constructor(
    // @Inject(forwardRef(() => OrdersService))  //metho1
    // private readonly ordersService: OrdersService,
    // ) {}

    constructor(
        @Inject(EVENT_PUBLISHER) private readonly eventPublisher: any,
    ) {}

    notify(event:string, playload:any){
        // console.log('[Notify] ${event}', playload);
        this.eventPublisher.publish(event, playload);
        return {ok:true};
    }
}
