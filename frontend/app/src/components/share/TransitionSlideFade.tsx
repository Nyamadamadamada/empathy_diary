import { FC, useRef, ReactNode, CSSProperties } from 'react';
import { Transition, TransitionStatus } from 'react-transition-group';

const TRANSITION_STYLES: Partial<Record<TransitionStatus, CSSProperties>> = {
  entering: { pointerEvents: 'none', opacity: 1, transform: 'translateY(0)' },
  entered: { opacity: 1, transform: 'translateY(0)', height: '' },
  exiting: {
    pointerEvents: 'none',
    opacity: 0,
    transform: 'translateY(-30px)',
    height: 0,
  },
  exited: { opacity: 0, transform: 'translateY(-30px)', height: 0 },
};

export type TransitionSlideFadeProps = {
  in?: boolean;
  duration?: number;
  children: ReactNode;
};

export const TransitionSlideFade: FC<TransitionSlideFadeProps> = ({ in: inProp, duration = 500, children }) => {
  const nodeRef = useRef<HTMLDivElement | null>(null);
  const elContentRef = useRef<HTMLDivElement | null>(null);

  return (
    <Transition
      nodeRef={nodeRef}
      in={inProp}
      timeout={duration}
      onExit={() => {
        if (nodeRef.current == null) {
          return;
        }
        const node = nodeRef.current;
        const contentHeight = elContentRef.current?.clientHeight;
        if (contentHeight) {
          node.style.height = `${contentHeight}px`;
        }
      }}
      unmountOnExit
    >
      {(state) => {
        const contentHeight = elContentRef.current?.clientHeight ?? 0;
        return (
          <div
            ref={nodeRef}
            style={{
              transition: `opacity ${duration}ms, transform ${duration}ms, height ${duration}ms`,
              height: `${contentHeight}px`,
              ...TRANSITION_STYLES[state],
            }}
          >
            <div ref={elContentRef}>{children}</div>
          </div>
        );
      }}
    </Transition>
  );
};
