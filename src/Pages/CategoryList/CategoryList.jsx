import './categoryList.css'
import { DataGrid } from '@mui/x-data-grid';
import { Delete } from '@mui/icons-material'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

export default function CategoryList() {

  const [data, setdata] = useState([]);

  const getCategoryList = async () => {
    try {
      const response = await fetch("http://localhost:5111/api/Category", { method: "GET" });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      setdata(result);
    } catch (error) {
      console.error("Error Fetching category list:", error);
    }
  };

  useEffect(() => {
    getCategoryList();
  }, []);


  const handledelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure to delete category?");
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:5111/api/Category/${id}`, { method: "DELETE", });
        if (!response.ok) {
          throw new Error("Failed to delete category");
        }
        setdata(data.filter((item) => item.id !== id));
      } catch (error) {
        console.error("failed deleting category", error);
      }
    }
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'name', headerName: 'Name', width: 200
    },
    {
      field: "action", headerName: "Action", width: 250,
      renderCell: (params) => {
        console.log(params.row.id);
        return (
          <>
            <Link to={`${params.row.id}`}>
              <button className='categorylistedit'>Update</button>
            </Link>
            <Delete className='categorylistdelete' onClick={() => handledelete(params.row.id)} />
          </>
        )
      }
    },

  ];
  return (
    <div className='categoryList'>
      <div className="CategoryAddButton">
        <h1 className="Title">CATEGORY</h1>
            <Link to={"/CategoryEdit"}>
              <button className="categorybuttonedit">Add</button>
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

