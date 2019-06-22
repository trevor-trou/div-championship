import * as React from "react";

export function Rules(props) {
  return (
    <>
      <h4>1. The Field of Play</h4>
      <p>
        Matches must be in the bullpen. The hoop is to be secured to the eastern
        wall, with anchors fixed above the whiteboard. The hoop's position must
        remain fixed while a game is in progress. During a game, the eastern
        door is to remain closed and the lights are to remain on. Should either
        of these two field conditions change, play will be suspended until
        resolved.
      </p>
      <h4>2. The Ball</h4>
      <p>The ball used in official games may be one of the following:</p>
      <ol>
        <li>State Farm (red/white) ball</li>
        <li>Nerf (green/orange) ball</li>
        <li>Orange stress ball</li>
        <li>American flag ball</li>
        <li>Foam baseball</li>
      </ol>
      <p>
        Before the start of a game, participants must decide on the ball to be
        used. The default ball for each game is the first available ball from
        the list above. Precedence is given to lower numbers. A player may
        propose to use a different ball from the official list, but the default
        ball will be used if unable to secure a majority vote in favor of the
        proposal.
        <br />
        <br />
        Once a game begins, the selected ball must be used for the duration of
        the game.
      </p>
    </>
  );
}
