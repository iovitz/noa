import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('verifyCode')
export class VerifyCode {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar',
    length: 10,
    comment: '验证码',
  })
  code: string

  @Column({
    type: 'varchar',
    length: 10,
    comment: '用户ClientID',
  })
  clientId: string

  @Column({
    type: 'varchar',
    length: 50,
    comment: '用户IP',
  })
  ip: string

  @Column({
    type: 'varchar',
    length: 200,
    comment: '浏览器的UserAgent',
  })
  ua: string

  @UpdateDateColumn({
    comment: '修改时间',
  })
  updatedAt: Date

  @CreateDateColumn({
    comment: '修改时间',
  })
  createdAt: Date
}
