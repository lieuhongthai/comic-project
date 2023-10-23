// ** React Imports
import { useState } from 'react';

// ** Third Party Imports
import { EditorState } from 'draft-js';

// ** Component Import
import { Editor } from 'react-draft-wysiwyg';

const EditorControlled = () => {
  // ** State
  const [value, setValue] = useState(EditorState.createEmpty());

  return <Editor editorState={value} onEditorStateChange={data => setValue(data)} />;
};

export default EditorControlled;
