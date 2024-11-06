import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Page } from './page.entity'

@Entity('formValue')
export class FormValue {
  @PrimaryColumn({
    type: 'bigint',
    unsigned: true,
    default: () => process.hrtime.bigint() + BigInt(Math.floor(Math.random() * 10000)),
    comment: '自增主键',
  })
  id: number

  @Column({
    type: 'json',
    comment: '表单提交数据',
  })
  data: Record<string, string>

  @Column({
    type: 'bigint',
    comment: '页面ID',
  })
  pageId: number

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
