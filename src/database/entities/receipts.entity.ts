import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('receipts')
export class Receipt {
  @PrimaryGeneratedColumn('uuid')
  receiptId: string;

  @Column({ type: 'timestamptz' })
  issuedAt: Date;

  @Column({ length: 120 })
  name: string;

  @Column({ type: 'double precision' })
  price: number;
}
