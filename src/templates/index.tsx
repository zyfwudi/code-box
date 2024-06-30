import { Alert } from 'shineout';

export default () => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, padding: '20px' }}>
      <Alert icon type='info' style={{ width: 'calc(50% - 16px)' }}>
        This is informative text.
      </Alert>
      <Alert icon type='success' style={{ width: 'calc(50% - 16px)' }}>
        This is success text.
      </Alert>
      <Alert icon type='warning' style={{ width: 'calc(50% - 16px)' }}>
        This is warning text.
      </Alert>
      <Alert icon type='danger' style={{ width: 'calc(50% - 16px)' }}>
        This is danger text.
      </Alert>
    </div>
  );
};