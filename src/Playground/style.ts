import { createUseStyles } from 'react-jss';
import { JsStyles } from '@/utils/types';

export interface PlaygorundClasses {
  wrapper: string
  header: string
  title: string
  func: string
  icon: string
}

type PlaygorundStyles = JsStyles<keyof PlaygorundClasses>;

const styles: PlaygorundStyles = {
  wrapper: {
    width: '100vw',
    height: '100vh',
    boxSizing: 'border-box',
    overflow: 'hidden'
    // border: '1px solid #000',
  },
  header: {
    height: '38px',
    lineHeight: '38px',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#282C34',
    color: '#fff',
    padding: '0 8px',
  },
  title: {
    fontSize: '18px',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  func: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    width: '20px',
    height: '25px',
  }
}

export default createUseStyles(styles);