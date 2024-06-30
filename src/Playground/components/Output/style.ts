import { createUseStyles } from 'react-jss';
import { JsStyles } from '@/utils/types';

export interface OutputClasses {
  output: string
}

type OutputStyles = JsStyles<keyof OutputClasses>;

const styles: OutputStyles = {
  output: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    position: 'relative'
  }
}

export default createUseStyles(styles);