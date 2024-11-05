import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('verifyCode')
export class VerifyCode {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar',
    length: 10,
  })
  code: string

  @Column({
    type: 'varchar',
    length: 10,
  })
  clientId: string

  @Column({
    type: 'varchar',
    length: 50,
  })
  ip: string

  @Column({
    type: 'varchar',
    length: 200,
  })
  ua: string
}
