import Tree from "react-d3-tree";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { VersionContext } from "../VersionProvider";
import { useContext } from "react";

function BuildTree({ randomItem, guesses, gameWon, showSolution }) {
  const version = useContext(VersionContext);
  const { width } = useWindowDimensions();
  const mobile = width < 600;

  const renderItemImage = ({ nodeDatum }) => {
    return (
      <g>
        <rect
          fill="rgb(36, 38, 65)"
          width="52"
          height="52"
          x="-26"
          y="-1"
          stroke="#bdbdbd"
        />
        {showSolution ||
        gameWon ||
        []
          .concat(...guesses.map(g => g.flatBuildTree))
          .includes(nodeDatum.name) ? (
          <>
            <rect
              fill="none"
              width="52"
              height="52"
              x="-26"
              y="-1"
              stroke="#bdbdbd"
            />
            <image
              href={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${nodeDatum.image}`}
              width="50"
              height="50"
              x="-25"
            />
            {(showSolution || gameWon) &&
              nodeDatum.name === randomItem.name && (
                <text
                  x="34"
                  y="30"
                  fontSize={!mobile ? "20px" : "16px"}
                  fontWeight="lighter"
                  stroke="#ffffff"
                  fill="#ffffff"
                  strokeWidth="1"
                >
                  {nodeDatum.name}
                </text>
              )}
          </>
        ) : (
          <text
            x="-5"
            y="33"
            fontSize="24px"
            fontWeight="lighter"
            stroke="#ffffff"
            fill="#ffffff"
          >
            ?
          </text>
        )}
      </g>
    );
  };

  const nodeSize = !mobile ? { x: 100, y: 120 } : { x: 80, y: 120 };
  const treeWidth = !mobile ? 600 : width;

  return (
    <div
      className="d-flex justify-content-center"
      style={{ width: treeWidth, height: 330, pointerEvents: "none" }}
    >
      {randomItem && (
        <Tree
          orientation="vertical"
          zoomable={false}
          collapsible={false}
          separation={{ siblings: 1, nonSiblings: 1 }}
          translate={{ x: treeWidth / 2, y: 10 }}
          nodeSize={nodeSize}
          pathClassFunc={() => "white-link"}
          renderCustomNodeElement={rd3tProps => renderItemImage(rd3tProps)}
          data={randomItem}
        />
      )}
    </div>
  );
}

export default BuildTree;
