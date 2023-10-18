import React, { FC } from "react";
import BlockComponent from "../BlockComponent/BlockComponent";
import { Block } from "../../context/Block";

interface BlocksPanelProps {
	blocks: Block[];
}

const BlocksPanel: FC<BlocksPanelProps> = ({ blocks }) => {
	return (
		<div>
			<h2>Current blocks</h2>
			<div className="blocks">
				<div className="">
					{blocks.map(block => (
						<BlockComponent key={block.hash} block={block} />
					))}
				</div>
			</div>
		</div>
	);
};
export default BlocksPanel;
