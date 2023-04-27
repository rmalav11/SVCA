import React from 'react';
import { Editor } from 'tinymce';


const CustomEditor = ({value = {}, onChange}) =>{

    return (
        <Editor
            apiKey="ekx49rg8patd3ort2jen572huxv5fe0fktznizmz6977tan0"
            value={value}
            init={{
                height: 500,
                menubar: false,
                plugins: [
                    'advlist autolink lists link image', 
                    'charmap print preview anchor help',
                    'searchreplace visualblocks code',
                    'insertdatetime media table paste wordcount',
                    'fullscreen quickbars save'
                ],
                toolbar:
                    ['undo redo cancel | formatselect | bold italic underline | \
                    alignleft aligncenter alignright | \
                    bullist numlist outdent indent | code fullscreen |help',
                    ],
                toolbar_mode: 'scrolling',

                menubar: 'tool'
            }}
            onEditorChange={onChange}
        />
    )
}


export default CustomEditor;