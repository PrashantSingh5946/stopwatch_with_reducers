import React, { useEffect, useReducer, useRef } from "react";

const actions = {
  START: "START",
  STOP: "STOP",
  RESET: "RESET",
  TICK: "TICK",
};

const stopwatchReducer = (prevState, action) => {
  switch (action.type) {
    case actions.START:
      return { ...prevState, isRunning: true };
    case actions.STOP:
      return { ...prevState, isRunning: false };
    case actions.RESET:
      return { ...prevState, isRunning: false, time: 0 };
    case actions.TICK:
      return { ...prevState, time: prevState.time + 1 };
    default:
      throw Error("Method not found");
  }
};

export default function Stopwatch() {
  const [state, dispatch] = useReducer(stopwatchReducer, {
    isRunning: false,
    time: 0,
  });

  const idRef = useRef(0);

  //time control
  useEffect(() => {
    if (!state.isRunning) {
      clearInterval(idRef.current);
      return;
    }
    idRef.current = setInterval(() => dispatch({ type: actions.TICK }), 1000);

    return () => {
      clearInterval(idRef.current);
      idRef.current = 0;
    };
  }, [state.isRunning]);

  return (
    <div>
      <div className="time">{state.time}</div>
      <div className="controls">
        <button
          onClick={() => {
            dispatch({ type: actions.START });
          }}
        >
          Start
        </button>
        <button
          onClick={() => {
            dispatch({ type: actions.STOP });
          }}
        >
          Stop
        </button>
        <button
          onClick={() => {
            dispatch({ type: actions.RESET });
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
