import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm'

@Entity('form-input-components')
export class FormInputComponents {
  @PrimaryColumn({
    type: 'varchar',
    length: 26,
    comment: 'ulid主键',
  })
  id: string

  @Column({
    type: 'varchar',
    length: 26,
    unsigned: true,
  })
  pageId: string

  @Column({
    type: 'varchar',
    length: 50,
    comment: '字段名称',
  })
  name: string

  @Column({
    type: 'varchar',
    length: 1000,
    comment: '字段描述',
  })
  desc: string

  @Column({
    type: 'float',
    default: 100000,
    comment: '组件在页面中的顺序',
  })
  rank: number

  @Column({
    type: 'json',
    comment: '组件属性',
  })
  props: string

  @CreateDateColumn({
    comment: '修改时间',
  })
  createdAt: Date

  @UpdateDateColumn({
    comment: '修改时间',
  })
  updatedAt: Date
}
