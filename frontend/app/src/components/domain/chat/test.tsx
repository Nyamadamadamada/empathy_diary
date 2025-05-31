import React from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';

export default function App() {
  const [state, setState] = React.useState(true);
  const helloRef = React.useRef(null);
  const goodbyeRef = React.useRef(null);
  const nodeRef = state ? helloRef : goodbyeRef;

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <div className="main">
        <SwitchTransition mode={'out-in'}>
          <CSSTransition
            key={state}
            nodeRef={nodeRef}
            addEndListener={(done) => {
              nodeRef.current.addEventListener('transitionend', done, false);
            }}
            classNames="fade"
          >
            <div ref={nodeRef} className="button-container">
              <button onClick={() => setState((state) => !state)}>{state ? 'Hello, world!' : 'Goodbye, world!'}</button>
            </div>
          </CSSTransition>
        </SwitchTransition>
      </div>

      <style>{`
.fade-enter  {
  opacity: 0;
  transform: translateY(-100%);
}
.fade-enter-active  {
  opacity: 1;
  transform: translateY(0%);
}
.fade-exit  {
  opacity: 1;
  transform: translateY(0%);
}
.fade-exit-active  {
  opacity: 0;
  transform: translateY(100%);
}
.fade-enter-active ,
.fade-exit-active  {
  transition: opacity 500ms, transform 500ms;
}

        .button-container {
          margin-top: 20px;
        }

        button {
          padding: 0.5em 1em;
          font-size: 1em;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
