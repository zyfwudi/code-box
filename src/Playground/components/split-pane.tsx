import { useMemo, useRef, useState } from 'react';
import { Allotment, AllotmentHandle } from 'allotment';
import classnames from 'classnames';
import { useStableFn } from "@shined/react-use";
import type { ISplitPane } from '../types';
import useStyles from '../style';

import 'allotment/dist/style.css';

const SplitPane = (props: ISplitPane) => {
  const styles = useStyles();

  const { defaultSizes = [100, 100] } = props;

  const splitLinePosition = useMemo(
    () => ({
      LEFT: [0, Infinity],
      CENTER: defaultSizes,
      RIGHT: [Infinity, 0],
    }),
    [defaultSizes],
  );

  const ref = useRef<AllotmentHandle | null>(null);
  const [SplitLine, setSplitLine] = useState(splitLinePosition.CENTER);

  const hiddenLeft = JSON.stringify(SplitLine) === JSON.stringify(splitLinePosition.LEFT);
  const hiddenRight = JSON.stringify(SplitLine) === JSON.stringify(splitLinePosition.RIGHT);

  const resize = useStableFn(() => {
    if (JSON.stringify(SplitLine) !== JSON.stringify(splitLinePosition.CENTER)) {
      ref.current?.resize(splitLinePosition.CENTER);
      setSplitLine(splitLinePosition.CENTER);
      return true;
    }
    return false;
  });

  const handleCollapseLeft = useStableFn(() => {
    if (!resize()) {
      ref.current?.resize(splitLinePosition.LEFT);
      setSplitLine(splitLinePosition.LEFT);
    }
  });

  const handleCollapseRight = useStableFn(() => {
    if (!resize()) {
      ref.current?.resize(splitLinePosition.RIGHT);
      setSplitLine(splitLinePosition.RIGHT);
    }
  });

  return (
    <Allotment ref={ref} defaultSizes={defaultSizes}>
      <Allotment.Pane snap minSize={0}>
        {props.children?.[0]}
        <div className={classnames(styles.collapseLeft, hiddenRight ? styles.active : '')}>
          <div className={styles.collapseBtn} onClick={handleCollapseLeft}></div>
        </div>
      </Allotment.Pane>
      <Allotment.Pane snap minSize={0}>
        <div className={classnames(styles.collapseRight, hiddenLeft ? styles.active : '')}>
          <div className={styles.collapseBtn} onClick={handleCollapseRight}></div>
        </div>
        {props.children?.[1]}
      </Allotment.Pane>
    </Allotment>
  );
};

export default SplitPane;
