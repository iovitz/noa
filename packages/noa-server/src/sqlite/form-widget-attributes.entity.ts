import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm'

@Entity('form-widget-attributes')
export class FormWidgetAttributes {
  @PrimaryColumn({
    type: 'varchar',
    length: 30,
    comment: 'ulid主键',
  })
  id: string

  @Column({
    type: 'varchar',
    length: 30,
  })
  widgetId: string

  @Column({
    type: 'varchar',
    length: 255,
    comment: '属性名称',
  })
  name: string

  @Column({
    type: 'varchar',
    length: 1000,
    comment: '属性名称',
  })
  value: string

  @Column({
    type: 'boolean',
    comment: '组件是否被删除',
    default: false,
  })
  deleted: boolean

  @CreateDateColumn({
    comment: '修改时间',
  })
  createdAt: Date

  @UpdateDateColumn({
    comment: '修改时间',
  })
  updatedAt: Date
}
