import { useFormEditorStore } from '@/store/editor/editor.store'
import { useWidgetStore } from '@/store/widgets/widget.store'
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { WidgetUIMap } from './widget-ui'

const WidgetWrapperDiv = styled.div`
  border: 1px dashed transparent;
`

const WidgetWrapperSelectedDiv = styled(WidgetWrapperDiv)`
  border-color: red;
`

export const WidgetWrapper = observer((props: { id: string }) => {
  const widgetStore = useWidgetStore()
  const editorStore = useFormEditorStore()
  const widget = editorStore.getWidgetById(props.id)!

  const WidgetUI = WidgetUIMap[widget.attributes.type]
  if (!WidgetUI) {
    return null
  }

  const handleSelectWidget: React.MouseEventHandler<HTMLDivElement> = (e) => {
    widgetStore.handleSelectWidget(props.id)
    e.stopPropagation()
  }
  const isSelected = widgetStore.getCurrentSelectedId() === props.id

  const Wrapper = isSelected ? WidgetWrapperSelectedDiv : WidgetWrapperDiv

  return (
    <div onClick={handleSelectWidget}>
      <Wrapper>
        <WidgetUI id={props.id} />
      </Wrapper>
    </div>
  )
})
