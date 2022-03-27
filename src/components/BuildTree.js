import Tree from "react-d3-tree";
import useWindowDimensions from "../hooks/useWindowDimensions";

function BuildTree({ itemBuildTree, guesses, success, showSolution }) {
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
        guesses.map(guess => guess.label).includes(nodeDatum.name) ? (
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
              href={`https://ddragon.leagueoflegends.com/cdn/12.5.1/img/item/${nodeDatum.image}`}
              width="50"
              height="50"
              x="-25"
            />
            {(showSolution || success) &&
              nodeDatum.name === itemBuildTree.name && (
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
      style={{ width: treeWidth, height: 360, pointerEvents: "none" }}
    >
      {itemBuildTree && (
        <Tree
          orientation="vertical"
          zoomable={false}
          collapsible={false}
          separation={{ siblings: 1, nonSiblings: 1 }}
          translate={{ x: treeWidth / 2, y: !mobile ? 20 : 30 }}
          nodeSize={nodeSize}
          pathClassFunc={() => "white-link"}
          renderCustomNodeElement={rd3tProps => renderItemImage(rd3tProps)}
          data={itemBuildTree}
        />
      )}
    </div>
  );
}

export default BuildTree;
