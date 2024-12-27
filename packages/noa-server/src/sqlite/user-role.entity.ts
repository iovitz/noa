import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm'

@Entity('userRole')
export class UserRole {
  @PrimaryColumn({
    type: 'varchar',
    length: 26,
    comment: 'ulid主键',
  })
  id: string

  @Column({
    type: 'varchar',
    length: 26,
    comment: 'User ID',
  })
  userId: string

  @Column({
    type: 'varchar',
    length: 50,
    comment: '实体类型',
  })
  entityType: string

  @Column({
    type: 'varchar',
    length: 26,
    comment: '实体ID',
  })
  entityId: string

  @Column({
    type: 'varchar',
    length: 26,
    comment: 'Role ID',
  })
  roleId: string

  @CreateDateColumn({
    comment: '修改时间',
  })
  createdAt: Date

  @UpdateDateColumn({
    comment: '修改时间',
  })
  updatedAt: Date
}
