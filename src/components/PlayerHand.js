//  Copyright (c) Facebook, Inc. and its affiliates.
//  All rights reserved.
//
//  This source code is licensed under the license found in the
//  LICENSE file in the root directory of this source tree.

import React from "react";
import ShowHints from "./ShowHints";
import { BoardContext } from "../BoardState";
import CardLeftCount from "./CardLeftCount";
import { Flipper, Flipped } from "react-flip-toolkit";
import cx from "classnames";
//import convertAction from "../action.py";

var action_type = "";
var action_val = "";

function PlayerHand() {
  const state = React.useContext(BoardContext);
  const {isPlayerTurn} = React.useContext(BoardContext);
  const colors = ["RED", "ORANGE", "YELLOW", "GREEN", "BLUE"];

  function onAppear(el, i) {
    setTimeout(() => {
      el.classList.add("fadeIn");
      setTimeout(() => {
        el.style.opacity = 1;
        el.classList.remove("fadeIn");
      }, 500);
    }, i * 50);
  }

  function onExit(el, i, removeElement) {
    setTimeout(() => {
      el.classList.add("fadeOut");
      setTimeout(removeElement, 500);
    }, i * 50);
  }

  
  //const player = state.partnerId;
  const player = 1;


  return (
    <div className={cx("area", { active: !isPlayerTurn })}>
      <h3>Player {["A", "B"][player]}</h3>
      <div>
        <Flipper
          flipKey={state.hands["player" + player]
            .map(card => card.id)
            .join(",")}
          className="hand"
        >
          {state.hands["player" + player].map((card, idx) => {
            const [cardColor, cardNumber] = card.card.split("");

            return (
              <Flipped
                key={card.id}
                flipId={card.id}
                onAppear={onAppear}
                onExit={onExit}
              >
                <div
                  key={card + "," + idx}
                  className={"card " + card.card.split("")[0]}
                >
                  <div className="actions">
                    <button
                      disabled={state.hintCounter === 0 || !isPlayerTurn}
                      onClick={() => {
                        action_type = "HINT_COLOR"
                        action_val = Object.values(card.card[0]);
                        console.log(action_type + " " + action_val);
                      }}
                    >
                      Hint Color
                    </button>
                    <button
                      disabled={state.hintCounter === 0 || !isPlayerTurn}
                      onClick={() => {
                        action_type = "HINT_NUMBER"
                        action_val = Object.values(card.card[1]);
                        console.log(action_type + " " + action_val);

                      }}
                    >
                      Hint Number
                    </button>
                  </div>
                  <div className="card_desc">
                    {card.card}
                    <div
                      style={{
                        fontSize: 12,
                        display: "inline-block",
                        float: "right",
                        padding: 5
                      }}
                    >
                      <CardLeftCount color={cardColor} number={cardNumber} />
                    </div>
                  </div>
                  <ShowHints hints={card.hints} />
                </div>
              </Flipped>
            );
          })}
        </Flipper>
      </div>
    </div>
  );
}

export default PlayerHand;
