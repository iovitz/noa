import styled from '@emotion/styled'
import React, { PropsWithChildren } from 'react'

const Container = styled.div`
  height: 100%;
  max-width: 1200px;
  min-width: 768px;
  margin-left: auto;
  margin-right: auto;
`

export function CenterContainer({ children }: PropsWithChildren) {
  return (
    <div style={{ height: '100%' }}>
      <Container>{children}</Container>
    </div>
  )
}
