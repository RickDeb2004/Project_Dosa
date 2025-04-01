// src/components/QueryList.jsx
import { useQuery } from "../context/QueryContext";
import styled from "styled-components";
import { FaTrash } from "react-icons/fa";
import { useState, useMemo } from "react";
import { debounce } from "lodash";
import { advancedSearch } from "../utils/search";

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

const QueryItem = styled.div`
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
  font-size: 16px; // Ensures uniform size
  &:hover {
    opacity: 0.8;
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

const QueryList = () => {
  const { queries, setCurrentQuery, setQueries } = useQuery();
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

  const filteredQueries = advancedSearch(queries, searchTerm);

  const handleDelete = (id, e) => {
    e.stopPropagation(); // Prevent triggering query selection
    setQueries((prevQueries) => prevQueries.filter((q) => q.id !== id));
  };

  return (
    <ListWrapper>
      <h3>Queries Available</h3>
      <SearchInput
        type="text"
        placeholder="Search... use 'phrase' for exact, -term"
        onChange={handleSearchChange}
      />
      {searchTerm && (
        <ClearButton onClick={handleClearSearch}>Clear Search</ClearButton>
      )}
      {filteredQueries.map((query) => (
        <QueryItem key={query.id} onClick={() => setCurrentQuery(query.query)}>
          <span>{query.query}</span>
          <DeleteIcon onClick={(e) => handleDelete(query.id, e)} />
        </QueryItem>
      ))}
    </ListWrapper>
  );
};

export default QueryList;
