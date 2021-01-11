//  Copyright (c) Facebook, Inc. and its affiliates.
//  All rights reserved.
//
//  This source code is licensed under the license found in the
//  LICENSE file in the root directory of this source tree.

import React from "react";
import { state, convertState } from "./State"
import { throttle } from "./utils";

const initialState = {
  notes: {},
  gameId: 0
}; 
//const stateToPass = convertState(state);
const BoardContext = React.createContext(state);

function BoardState({children}) {

  return (
    <BoardContext.Provider
      value={state}
    >
      {children}
    </BoardContext.Provider>
  );
}

export { BoardState, BoardContext };
