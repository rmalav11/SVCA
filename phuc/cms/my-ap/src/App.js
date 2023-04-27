import React from 'react'
import GEditor from 'g-editor'
 
class App extends React.Component {
  render() {
    return (
      <GEditor
        ref="editor"
        uploadFieldName="reqFile"
        uploadURL="/api/upload"
        responseFieldName="resFile"
        maxFileSize={5 * 1024 * 1024}
        />
      )
  }
 
  _getEditorContent = () => {
    this.refs.editor.getCurrentContent() // return the current content in editor
  }
}

export default App;