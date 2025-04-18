import React, { Suspense, lazy } from "react";
import styled from "styled-components";
import { useQuery } from "../context/QueryContext";
import { FaPlay, FaSave, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Lazy load components
const QueryEditor = lazy(() => import("./QueryEditor"));
const QueryList = lazy(() => import("./QueryList"));
const QueryHistory = lazy(() => import("./QueryHistory"));
const ResultTable = lazy(() => import("./ResultTable"));
const DownloadHistory = lazy(() => import("./DownloadHistory"));

const Container = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr 2fr;
  gap: 20px;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: ${(props) => props.theme.fontSizes.medium};
  background: ${(props) => props.bg};
  color: #ffffff; /* Ensure high contrast */
  &:hover {
    opacity: 0.9;
  }
`;

const Header = styled.header`
  text-align: center;
  padding: 20px;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const RightSidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Layout = () => {
  const { runQuery, saveQuery, clearQuery } = useQuery();

  const handleSave = () => {
    saveQuery();
    toast.success("Query Saved!");
  };

  return (
    <>
      <Header>
      <h1>SQL Query Executor</h1>  
      <h2>Run and manage SQL queries efficiently</h2>  
      </Header>
      <Container>
        <Sidebar>
          <Suspense fallback={<div>Loading Query List...</div>}>
            <QueryList />
          </Suspense>
          <Suspense fallback={<div>Loading Query History...</div>}>
            <QueryHistory />
          </Suspense>
        </Sidebar>
        <MainContent>
          <Suspense fallback={<div>Loading Query Editor...</div>}>
            <QueryEditor />
          </Suspense>
          <ButtonGroup>
            <Button bg="#0A66C2" onClick={runQuery} aria-label="Run Query">
              <FaPlay aria-hidden="true" /> <span>Run</span>
            </Button>
            <Button bg="#5A3EC8" onClick={handleSave} aria-label="Save Query">
              <FaSave aria-hidden="true" /> <span>Save</span>
            </Button>
            <Button bg="#D32F2F" onClick={clearQuery} aria-label="Clear Query">
              <FaTrash aria-hidden="true" /> <span>Clear</span>
            </Button>
          </ButtonGroup>
          <Suspense fallback={<div>Loading Result Table...</div>}>
            <ResultTable />
          </Suspense>
        </MainContent>
        <RightSidebar>
          <Suspense fallback={<div>Loading Download History...</div>}>
            <DownloadHistory />
          </Suspense>
        </RightSidebar>
      </Container>
      <ToastContainer />
    </>
  );
};

export default Layout;
