import {
  BtnBold,
  BtnBulletList,
  BtnClearFormatting,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnRedo,
  BtnStrikeThrough,
  BtnStyles,
  BtnUnderline,
  BtnUndo,
  HtmlButton,
  Separator,
  Toolbar,
  Editor,
  EditorProvider,
  ContentEditableEvent
} from 'react-simple-wysiwyg'

type TextEditorProps = {
  value: string
  onChange: (value: string) => void
  className?: string
}

export const TextEditor = ({
  value,
  onChange,
  className = ''
}: TextEditorProps) => {

  const handleChange = (e: ContentEditableEvent) => {
    onChange(e.target.value)
  }

  return (
    <EditorProvider>
      <div className={`text-editor ${className}`.trim()}>
        <Editor value={value} onChange={handleChange} >
          <Toolbar>
            <BtnUndo />
            <BtnRedo />
            <Separator />
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
            <BtnClearFormatting />
            <HtmlButton />
            <Separator />
            <BtnStyles />
          </Toolbar>
        </Editor>
      </div>
    </EditorProvider>
  )
}
