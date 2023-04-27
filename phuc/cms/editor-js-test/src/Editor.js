import React, { Component } from 'react';
import EditorJs from 'react-editor-js';
import { EDITOR_JS_TOOLS } from "./constants";

class Editor extends Component {
    constructor(props) {
        super(props);
        this.handleSave = this.handleSave.bind(this);
    }
    async handleSave() {
        const savedData = await this.editorInstance.save();
        console.log(savedData);
        console.log(this.editorInstance);

        console.log(this.editorInstance.blocks.delete(0));
    }

    componentWillMount() {

    }

    componentDidMount() {
        // this.instance = this.editorInstance // access editor-js
    }


    render() {
        return (
            <div>
                <EditorJs instanceRef={instance => this.editorInstance = instance} tools={EDITOR_JS_TOOLS} />
                <button onClick={this.handleSave}>Save</button>
            </div>
        );
    }
}


export default Editor;