import { NotificationsService } from 'src/notifications/notifications.service';
export declare class OrdersService {
    private readonly notifications;
    constructor(notifications: NotificationsService);
    createOrder(orderDto: any): {
        status: string;
        order: any;
    };
}
