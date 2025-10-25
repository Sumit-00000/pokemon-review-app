import './ownerList.css';
import { DataGrid } from '@mui/x-data-grid';
import { Delete } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function OwnerList() {
  // State to store fetched data
  const [data, setData] = useState([]);

  // Function to fetch owner list from the API
  const getOwnerList = async () => {
    try {
      const response = await fetch("http://localhost:5111/api/Owner", { method: "GET" });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      setData(result); // Set the fetched data to state
    } catch (error) {
      console.error("Error fetching owner list:", error);
    }
  };

  useEffect(() => {
    getOwnerList();
  }, []);
  
  const handleDelete = async(id) => {
    const confirmDelete = window.confirm("Are you sure to delete the Owner?");
    if(confirmDelete){
      try{
        const response = await fetch(`http://localhost:5111/api/Owner/${id}`,{method:"DELETE"});
        if(!response.ok){
          throw new Error("Failed deleting owner");
        }
        setData(data.filter((item) => item.id !== id));
      }catch(error){
        console.error("Error deleting owner",error);
      }
    }
    
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'firstName',
      headerName: 'First Name',
      width: 200,
      renderCell: (params) => (
        <div className='ownerlistown'>
          {params.row.firstName}
        </div>
      ),
    },
    { field: 'lastName', headerName: 'Last Name', width: 250 },
    { field: 'gym', headerName: 'Gym', width: 160 },
    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => (
        <>
          <Link to={ `${params.row.id}`}>
            <button className='ownerlistedit'>Update</button>
          </Link>
          <Delete className='ownerlistdelete' onClick={() => handleDelete(params.row.id)} />
        </>
      ),
    },
  ];

  return (
    <div className='ownerList'>
      <div className="OwnerAddButton">
        <h1 className="Title">OWNER</h1>
        <Link to={'/OwnerEdit'}>
            <button className='ownerlistedit'>Add</button>
          </Link>
      </div>
      <DataGrid
        rows={data} 
        disableRowSelectionOnClick
        columns={columns} 
        pageSizeOptions={[8, 10]} 
        checkboxSelection
        sx={{ border: 0 }}
      />
    </div>
  );
}
