import { createUseStyles } from 'react-jss';
import { JsStyles } from '@/utils/types';

export interface EditorClasses {
  editor: string;
}

type EditorStyles = JsStyles<keyof EditorClasses>;

const styles: EditorStyles = {
  editor: {
    margin: '0 -1px 0 0',
    height: '100%',
    // overflow: 'hidden',
    '& .jsx-tag-angle-bracket': {
      color: '#808080'
    },
    '& .jsx-text': {
      color: '#d4d4d4'
    },
    '& .jsx-tag-name': {
      color: '#569cd6'
    },
    '& .jsx-tag-attribute-key': {
      color: '#9cdcfe'
    }
  }
};

export default createUseStyles(styles)