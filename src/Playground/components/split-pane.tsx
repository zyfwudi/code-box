import { useRef } from 'react';
import { Allotment, AllotmentHandle } from 'allotment';
import type { ISplitPane } from '../types';

import 'allotment/dist/style.css';

const SplitPane = (props: ISplitPane) => {

  const { defaultSizes = [100, 100] } = props;

  const ref = useRef<AllotmentHandle | null>(null);

  return (
    <Allotment ref={ref} defaultSizes={defaultSizes}>
      <Allotment.Pane snap minSize={0}>
        {props.children?.[0]}
      </Allotment.Pane>
      <Allotment.Pane snap minSize={0}>
        {props.children?.[1]}
      </Allotment.Pane>
    </Allotment>
  );
};

export default SplitPane;
