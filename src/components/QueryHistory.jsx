// src/components/QueryHistory.jsx
import { useQuery } from "../context/QueryContext";
import styled from "styled-components";
import { FaTrash } from "react-icons/fa";
import { useState, useMemo } from "react";
import { debounce } from "lodash";
import { advancedSearch } from "../utils/search";

const HistoryWrapper = styled.div`
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

const SearchInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 4px;
  font-size: ${(props) => props.theme.fontSizes.small};
  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
  }
`;

const ClearButton = styled.button`
  margin-top: 5px;
  padding: 5px 10px;
  background: ${(props) => props.theme.colors.danger};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: ${(props) => props.theme.fontSizes.small};
  &:hover {
    opacity: 0.9;
  }
`;
const DeleteIcon = styled(FaTrash)`
  color: red;
  cursor: pointer;
  font-size: 16px; // Ensure uniform size
  &:hover {
    opacity: 0.8;
  }
`;

const QueryHistory = () => {
  const { queryHistory, setCurrentQuery, setQueryHistory } = useQuery();
  const [searchTerm, setSearchTerm] = useState("");

  // Debounce the search input to avoid excessive re-renders
  const debouncedSetSearchTerm = useMemo(
    () => debounce((value) => setSearchTerm(value), 300),
    []
  );

  const handleSearchChange = (e) => {
    debouncedSetSearchTerm(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const filteredHistory = advancedSearch(queryHistory, searchTerm);

  const handleDelete = (index, e) => {
    e.stopPropagation(); // Prevent click from selecting the query
    setQueryHistory((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <HistoryWrapper>
      <h3>Query History</h3>
      <SearchInput
        type="text"
        placeholder="Search... use 'phrase' for exact, -term"
        onChange={handleSearchChange}
      />
      {searchTerm && (
        <ClearButton onClick={handleClearSearch}>Clear Search</ClearButton>
      )}
      {filteredHistory.map((query, index) => (
        <HistoryItem key={index} onClick={() => setCurrentQuery(query)}>
          <span>{query}</span>
          <DeleteIcon onClick={(e) => handleDelete(index, e)} aria-hidden="true" />
        </HistoryItem>
      ))}
    </HistoryWrapper>
  );
};

export default QueryHistory;
