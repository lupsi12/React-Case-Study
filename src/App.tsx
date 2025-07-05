import './style.css';
import dataList from './data.json';
import MuiGrid, { Candidate } from './MuiGrid';
import { Alert, AlertTitle, Button, TextField } from '@mui/material';
import { useState } from 'react';
import { control } from './control';

export default function App() {
  const [today, setToday] = useState<string>(new Date().toISOString().split("T")[0]);
  const [limit, setLimit] = useState<number>(3);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const handleControl = () => {
    const todayDate = new Date(today);
    const result = control(todayDate, limit);
    setSelectedRows(result);
  };

  const sourceProp: Candidate[] = dataList;
  return (
  <div className="container">
    <div className="header">
      <img src="/image.png" alt="icon"/>
      <h1>Dgpays Case Study</h1>
    </div>
    <div style={{ padding: "1rem" }}>
      <TextField
        label="Today"
        type="date"
        focused
        value={today}
        onChange={(e) => setToday(e.target.value)}
        className="custom-textfield"
      />
      <TextField
        label="Limit"
        color="secondary"
        focused
        type="number"
        value={limit}
        onChange={(e) => setLimit(Number(e.target.value))}
        className="custom-textfield"
      />
      <Button variant="outlined" className="custom-button" onClick={handleControl}>
        Control
      </Button>
      {selectedRows.length !== 0 && (
        <Alert severity="info" sx={{ marginTop: "1rem" }}>
          <AlertTitle>Info</AlertTitle>
          Incorrect row coloring count: {selectedRows.length}
          {/* <p>Selected rows: {[...selectedRows].join(', ')}</p> */}
        </Alert>
      )}
    </div>
    <MuiGrid source={sourceProp} selectedRows={selectedRows} setSelectedRows={setSelectedRows} />
  </div>
);
}
  

  
