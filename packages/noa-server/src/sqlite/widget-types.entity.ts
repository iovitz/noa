import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm'

@Entity('widget-type')
export class WidgetTypes {
  @PrimaryColumn({
    type: 'varchar',
    length: 26,
    comment: 'ulid主键',
  })
  id: string

  @Column({
    type: 'varchar',
    length: 10,
    comment: '组件名称',
  })
  name: string

  @Column({
    type: 'varchar',
    length: 20,
    comment: '组件名称',
    nullable: true,
  })
  desc: string

  @Column({
    type: 'varchar',
    length: 20,
    comment: '组件类型',
  })
  type: string

  @Column({
    type: 'int',
    comment: '页面权重',
    default: 0,
  })
  weight: string

  @CreateDateColumn({
    comment: '修改时间',
  })
  createdAt: Date

  @UpdateDateColumn({
    comment: '修改时间',
  })
  updatedAt: Date
}
