import { useState, useEffect } from "react";
import styled from "styled-components";
import { FiDownload } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";

const ListWrapper = styled.div`
  background: white;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-height: 300px;
  overflow-y: auto;
  @media (max-width: 768px) {
    max-height: 200px;
  }
`;

const HistoryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  cursor: pointer;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  &:hover {
    background: ${(props) => props.theme.colors.background};
  }
`;

const DeleteIcon = styled(FaTrash)`
  color: red;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    opacity: 0.8;
  }
`;

const DownloadHistory = () => {
  const [downloadHistory, setDownloadHistory] = useState([]);

  useEffect(() => {
    const loadHistory = () => {
      const storedHistory = JSON.parse(localStorage.getItem("csvHistory")) || [];
      setDownloadHistory(storedHistory.slice(0, 5)); // Keep latest 5
    };

    // Load history initially
    loadHistory();

    // Listen for custom download event
    const handleStorageUpdate = () => loadHistory();
    window.addEventListener("downloadEvent", handleStorageUpdate);

    return () => {
      window.removeEventListener("downloadEvent", handleStorageUpdate);
    };
  }, []);

  const handleDelete = (fileName, e) => {
    e.stopPropagation();
    const updatedHistory = downloadHistory.filter((file) => file.name !== fileName);
    setDownloadHistory(updatedHistory);
    localStorage.setItem("csvHistory", JSON.stringify(updatedHistory));

    // Trigger event to notify other components
    window.dispatchEvent(new Event("downloadEvent"));
  };

  return (
    <ListWrapper>
      <h3>Recent Downloads</h3>
      {downloadHistory.length === 0 ? (
        <p>No downloads yet</p>
      ) : (
        downloadHistory.map((file, index) => (
          <HistoryItem key={index}>
            <a href={file.url} download={file.name} style={{ textDecoration: "none", color: "black" }}>
              {file.name}
            </a>
            <div>
              <a href={file.url} download>
                <FiDownload size={16} color="blue" style={{ marginRight: "10px" }} />
              </a>
              <DeleteIcon onClick={(e) => handleDelete(file.name, e)} />
            </div>
          </HistoryItem>
        ))
      )}
    </ListWrapper>
  );
};

export default DownloadHistory;
