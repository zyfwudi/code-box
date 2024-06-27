import { createUseStyles } from 'react-jss';
import { JsStyles } from '@/utils/types';

export interface PlaygorundClasses {
  collapseLeft: string
  collapseRight: string
  active: string
  collapseBtn: string
  wrapper: string
  header: string
  title: string
  func: string
  icon: string
}

type PlaygorundStyles = JsStyles<keyof PlaygorundClasses>;

const collapseBtnCommon = {
  position: 'relative',
  display: 'none',
  width: '10px',
  height: '48px',
  cursor: 'pointer',
  backgroundColor: 'var(--background-color-1)',
};

const collapseCommon = {
  position: 'absolute',
  top: 0,
  zIndex: 1,
  display: 'flex',
  width: '20px',
  height: '100%',
  alignItems: 'center',
};

const collapseBtnArrowCommon = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: 0,
  height: 0,
  content: '" "',
  borderTop: '5px solid transparent',
  borderBottom: '5px solid transparent',
  transform: 'translateX(-50%) translateY(-50%)',
};

const collapseActiveCommon = {
  '&$active': {
    '& $collapseBtn': {
      display: 'flex',
      opacity: 0,
      transition: 'opacity 0.2s ease-in-out',
    },
  },
  '&:hover$active $collapseBtn': {
    opacity: 1,
  },
};

const styles: PlaygorundStyles = {
  collapseLeft: {
    ...collapseCommon,
    right: 0,
    justifyContent: 'end',
    '& $collapseBtn': {
      ...collapseBtnCommon,
      borderRadius: '4px 0 0 4px',
      '&::after': {
        ...collapseBtnArrowCommon,
        borderRight: '6px solid var(--text-color)',
      },
    },
    '&:hover $collapseBtn': {
      display: 'flex',
    },
    ...collapseActiveCommon,
  },
  collapseRight: {
    ...collapseCommon,
    left: 0,
    justifyContent: 'start',
    '& $collapseBtn': {
      ...collapseBtnCommon,
      borderRadius: '0 4px 4px 0',
      '&::after': {
        ...collapseBtnArrowCommon,
        borderLeft: '6px solid var(--text-color)',
      },
    },
    '&:hover $collapseBtn': {
      display: 'flex',
    },
    ...collapseActiveCommon,
  },
  active: {},
  collapseBtn: {},
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