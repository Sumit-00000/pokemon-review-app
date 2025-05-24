import './countryList.css'
import { DataGrid } from '@mui/x-data-grid';
import { Delete } from '@mui/icons-material'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

export default function CountryList() {

  const [data, setdata] = useState([]);
  const getCountryList = async () => {
    try {
      const response = await fetch("http://localhost:5111/api/Country", { method: "GET" });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      setdata(result);
    } catch (error) {
      console.error("Error fetching country list:", error);
    }
  };
  useEffect(() => {
    getCountryList();
  }, []);

  const handledelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure to delete this Country?");
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:5111/api/Country/${id}`, { method: "DELETE", });
        if (!response.ok) {
          throw new Error("Failed to delete Country");
        }
        setdata(data.filter((item) => item.id !== id));
      } catch (error) {
        console.error("Failed deleting COuntry", error);
      }
    }
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Country Name', width: 200, },
    {
      field: "action", headerName: "Action", width: 250,
      renderCell: (params) => {
        console.log(params.row.id);
        return (
          <>
            <Link to={`${params.row.id}`}>
              <button className='countrylistedit'>Update</button>
            </Link>
            <Delete className='countrylistdelete' onClick={() => handledelete(params.row.id)} />
          </>
        )
      }
    },

  ];
  return (
    <div className='countryList'>
      <div className="CountryAddButton">
        <h1 className="Title">COUNTRY</h1>
      <Link to={'/CountryEdit'}>
        <button className='countrylistedit'>Add</button>
      </Link>
      </div>
      <DataGrid
        rows={data} disableRowSelectionOnClick
        columns={columns}
        pageSizeOptions={[8, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </div>
  )
}
