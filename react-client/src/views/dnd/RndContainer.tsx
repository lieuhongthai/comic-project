// ** React import
import React from 'react';

// ** Rnd Import
import { Rnd } from 'react-rnd';

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'solid 1px #ddd',
  background: '#f0f0f0'
} as const;
const RndContainer = ({ isRender }: { isRender?: boolean }) => {
  return (
    <>
      {isRender ? (
        <Rnd
          style={style}
          bounds={'tbody'}
          default={{
            x: 0,
            y: 0,
            width: 200,
            height: 30
          }}
          maxHeight={30}
          minHeight={30}
          enableResizing={{
            left: true,
            right: true
          }}
          dragGrid={[50, 30]}
          resizeGrid={[50, 1]}
          resizeHandleStyles={{
            left: {
              borderRadius: 20,
              border: '1px solid rgba(81, 81, 81, 1)'
            },
            right: {
              borderRadius: 20,
              border: '1px solid rgba(81, 81, 81, 1)'
            }
          }}
        >
          Rnd
        </Rnd>
      ) : null}
    </>
  );
};

export default RndContainer;
