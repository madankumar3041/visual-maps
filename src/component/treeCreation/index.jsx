import React, { useState } from "react";
import "./styles.scss";

const Tree = () => {
  const [treeData, setTreeData] = useState([
    {
      id: 1,
      name: "Parent 1",
      children: [
        {
          id: 1.1,
          name: "Parent 1.1",
          children: [
            {
              id: 1.2,
              name: "Parent 1",
              children: [],
            },
            {
              id: 1.3,
              name: "Parent 1",
              children: [],
            },
          ],
        },
        {
          id: 1.2,
          name: "Parent 1",
          children: [],
        },
        {
          id: 1.2,
          name: "Parent 1",
          children: [],
        },
      ],
    },
  ]);

  const handleNodeClick = (node) => {
    // Create a new child node with a unique id
    const newNode = {
      id: Date.now(), // Assign a unique id using the current timestamp
      name: `Page ${node.children.length + 1}`,
      children: [],
    };

    // Update the parent node by adding the new child
    const updatedTreeData = updateNode(treeData, node, newNode);

    setTreeData(updatedTreeData);
  };

  const updateNode = (nodes, targetNode, newNode) => {
    return nodes.map((node) => {
      if (node === targetNode) {
        // Update the target node by adding the new child
        return {
          ...node,
          children: [...node.children, newNode],
        };
      } else if (node.children && node.children.length > 0) {
        // Recursively update child nodes
        return {
          ...node,
          children: updateNode(node.children, targetNode, newNode),
        };
      }
      return node;
    });
  };

  const renderTree = (nodes) => {
    return (
      <div className="node-container">
        {nodes?.map((node) => (
          <div key={node?.id} className={`node ${node?.id}`}>
            <p onClick={() => handleNodeClick(node)}>{node?.name}</p>
            {node?.children?.length > 0 && renderTree(node?.children)}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="main-container">
      <header>
        <h2>
          <img
            src="/pigeon.png"
            alt="logo"
            style={{ width: "1.5em", height: "1.5em" }}
          />
          Mercy Dove
        </h2>
      </header>
      {renderTree(treeData)}
    </div>
  );
};

export default Tree;
