import React, { useState, useEffect } from 'react';
import TableComponent from './TableComponent';

const Table = () => {
  const [data, setData] = useState([]);
  // const columns = ['Name', 'Age', 'City'];
  const columns = [
    {
      'label': "Nom",
      'dblabel': 'Name'
    },
    {
      'label': 'Age',
      'dblabel': 'Age'
    },
    {
      'label': 'Ville',
      'dblabel': 'City'
    }
  ];

  useEffect(() => {
    fetch('http://localhost:5000/api/data') 
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <TableComponent columns={columns} data={data} />
    </div>
  );
};

export default Table;
