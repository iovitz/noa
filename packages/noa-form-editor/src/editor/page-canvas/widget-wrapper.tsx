import { useFormEditorStore } from '@/store/editor/editor.store'
import { useWidgetStore } from '@/store/widgets/widget.store'
import { WidgetTypes } from '@/widgets'
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { WidgetUIMap } from './widget-ui'

const WidgetWrapperDiv = styled.div`
  border: 1px dashed red;
  box-sizing: border-box;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  position: absolute;
`

export const WidgetOperator = observer((props: { id: string }) => {
  const store = useFormEditorStore()
  const handleDelWidget = () => {
    store.delWidget(props.id)
  }
  return (
    <WidgetWrapperDiv>
      <button type="button" onClick={handleDelWidget}>Del</button>
    </WidgetWrapperDiv>
  )
})

export const WidgetWrapper = observer((props: { id: string }) => {
  const widgetStore = useWidgetStore()
  const editorStore = useFormEditorStore()
  const widget = editorStore.getWidgetById(props.id)!

  const WidgetUI = WidgetUIMap[widget.attributes.type as WidgetTypes]
  if (!WidgetUI) {
    return null
  }

  const handleSelectWidget: React.MouseEventHandler<HTMLDivElement> = (e) => {
    widgetStore.handleSelectWidget(props.id)
    e.stopPropagation()
  }
  const isSelected = widgetStore.getCurrentSelectedId() === props.id

  return (
    <div
      onClick={handleSelectWidget}
      style={{
        position: 'relative',
      }}
    >
      <WidgetUI id={props.id} />
      {isSelected ? <WidgetOperator id={props.id} /> : null}
    </div>
  )
})
