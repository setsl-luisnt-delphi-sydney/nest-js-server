import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Timestamp } from 'typeorm';

@Entity({ schema: "auth" })
export class User {
   @PrimaryGeneratedColumn({ type: 'bigint' })
   id: number;

   @Column('text')
   name: string;

   @Column('text')
   login: string;

   @Column('text')
   password: string;

   @Column({ type: 'bigint' })
   matrix_id: number;

   @Column({ type: 'boolean', default: false })
   is_matrix: boolean;

   @Column({ type: 'boolean', default: false })
   reset_password: boolean;

   @Column({ type: 'boolean', default: true })
   active: boolean;

   @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
   created_at: Timestamp;

   @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
   updated_at: Timestamp;
}