import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm'

@Entity('template')
export class Template {
  @PrimaryColumn({
    type: 'varchar',
    length: 26,
    comment: '自增主键',
  })
  id: string

  @Column({
    type: 'varchar',
    length: 20,
    comment: '模版名称',
  })
  name: string

  @CreateDateColumn({
    comment: '修改时间',
  })
  createdAt: Date

  @UpdateDateColumn({
    comment: '修改时间',
  })
  updatedAt: Date
}
