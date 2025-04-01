// src/components/ResultTable.jsx
import DataTable from "react-data-table-component";
import { useQuery } from "../context/QueryContext";
import styled from "styled-components";
import { FiDownload } from "react-icons/fi";

const TableWrapper = styled.div`
  margin-top: 20px;
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px;
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 20px;
  color: #888;
  font-size: 16px;
`;

const customStyles = {
  headCells: {
    style: {
      backgroundColor: "#1A1AC9",
      color: "white",
      fontWeight: "bold",
      textTransform: "capitalize",
    },
  },
  rows: {
    style: {
      minHeight: "50px",
    },
  },
  pagination: {
    style: {
      borderTop: "1px solid #ddd",
      padding: "10px",
    },
  },
};

const handleExport = (data) => {
  if (data.length === 0) return;

  const csvContent =
    "data:text/csv;charset=utf-8," +
    [
      Object.keys(data[0]).join(","), // Header row
      ...data.map((row) => Object.values(row).join(",")), // Data rows
    ].join("\n");

  const encodedUri = encodeURI(csvContent);
  const fileName = `output_${new Date()
    .toISOString()
    .replace(/[:.]/g, "-")}.csv`;

  // Trigger download
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link); // Cleanup after download

  // Update history in localStorage
  const newFile = { name: fileName, url: encodedUri };
  const history = JSON.parse(localStorage.getItem("csvHistory")) || [];
  localStorage.setItem(
    "csvHistory",
    JSON.stringify([newFile, ...history].slice(0, 5))
  );

  window.dispatchEvent(new Event("downloadEvent"));
};

const ResultTable = () => {
  const { result, setResult } = useQuery();

  const columns = result.length
    ? Object.keys(result[0]).map((key) => ({
        name: key.replace(/_/g, " "),
        selector: (row) => row[key],
        sortable: true,
      }))
    : [];

  return (
    <TableWrapper>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <a
          onClick={() => setResult([])}
          style={{
            textDecoration: "none",
            color: "#1A1AC9",
            cursor: "pointer",
          }}
        >
          Clear Output
        </a>
        <button
          onClick={() => handleExport(result)}
          style={{ border: "none", background: "none", cursor: "pointer" }}
          disabled={result.length === 0} // Disable export button when empty
        >
          <FiDownload
            size={18}
            color={result.length > 0 ? "#1A1AC9" : "#CCC"}
            aria-hidden="true"
          />
        </button>
      </div>

      {result.length > 0 ? (
        <DataTable
          columns={columns}
          data={result}
          pagination
          highlightOnHover
          striped
          responsive
          customStyles={customStyles}
        />
      ) : (
        <EmptyMessage>Nothing to Show</EmptyMessage>
      )}
    </TableWrapper>
  );
};

export default ResultTable;
