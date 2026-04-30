import { forwardRef, Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CoreModule } from 'src/core/core.module';
import { ReceiptsModule } from 'src/modules/receipts/receipts.module';

@Module({
  imports: [CoreModule, forwardRef(() => ReceiptsModule)],
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}


