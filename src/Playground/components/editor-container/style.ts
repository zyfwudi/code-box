import { createUseStyles } from 'react-jss';
import { JsStyles } from '@/utils/types';
import { useToken } from 'shineout';

const { token }= useToken()

export interface EditorContainerClasses {
  container: string;
  tabs: string;
  add: string;
  importMap: string;
  tag: string;
  monaco: string;
}

type EditorContainerStyles = JsStyles<keyof EditorContainerClasses>;

const styles: EditorContainerStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  tabs: {
    display: 'flex',
    width: '100%',
    height: '38px',
    overflow: 'auto hidden',
    color: token.colorText,
    backgroundColor: '#282C34',
    flexShrink: 0,
    alignItems: 'center',
    borderBottom: `1px solid #282C34`,
    boxSizing: 'border-box',
    padding: '0 8px',

    '&::-webkit-scrollbar': {
      height: '1px',
    },

    '&::-webkit-scrollbar-track': {
      backgroundColor: 'var(--border)',
    },

    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'var(--primary)',
    },
  },
  add: {
    display: 'flex',
    width: '18px',
    height: '100%',
    fontSize: '18px',
    color: '#fff',
    cursor: 'pointer',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottom: '3px solid transparent',
    margin: '0 8px',
    '&:hover': {
      color: token.colorPrimaryActive,
    },
  },
  importMap: {
    position: 'sticky',
    top: 0,
    right: 0,
    paddingLeft: '10px',
    marginLeft: 'auto',
    flexShrink: 0,
  },
  tag: {
    cursor: 'pointer',
  },
  monaco: {
    width: '100%',
    margin: '0 -1px -1px 0'
  }
};

export default createUseStyles(styles);
