// ** Types

// ! To avoid 'Window is not defined' error
const ReactDraftWysiwyg = () => import('react-draft-wysiwyg').then(mod => mod.Editor)

export default ReactDraftWysiwyg
