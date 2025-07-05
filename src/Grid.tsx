import React from "react";

export interface Candidate {
  name: string;
  mailReceivedDate: string;
  solutionSentDate?: string;
  isBackgroundColorRed?: boolean;
}

interface GridProps {
  source: Candidate[];
}

const Grid: React.FC<GridProps> = ({ source }) => {
  return (
    <table style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          <th style={{ border: "1px solid #ccc", padding: "8px" }}>Name</th>
          <th style={{ border: "1px solid #ccc", padding: "8px" }}>Mail Received Date</th>
          <th style={{ border: "1px solid #ccc", padding: "8px" }}>Solution Sent Date</th>
        </tr>
      </thead>
      <tbody>
        {source.map((item, index) => (
          <tr
            key={index}
            style={{
              backgroundColor: item.isBackgroundColorRed ? "red" : "transparent"
            }}
          >
            <td style={{ border: "1px solid #ccc", padding: "8px" }}>{item.name}</td>
            <td style={{ border: "1px solid #ccc", padding: "8px" }}>{item.mailReceivedDate}</td>
            <td style={{ border: "1px solid #ccc", padding: "8px" }}>{item.solutionSentDate || "-"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Grid;
