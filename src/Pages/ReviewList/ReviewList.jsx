import './reviewList.css'
import { DataGrid } from '@mui/x-data-grid';
import { Delete } from '@mui/icons-material'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function ReviewList() {
  const [data, setdata] = useState([]);
  const getReviewList = async () => {
    try {
      const response = await fetch("http://localhost:5111/api/Review", { method: "GET" });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      setdata(result);
    } catch (error) {
      console.error("Error fetching Review list:", error);
    }
  };
  useEffect(() => {
    getReviewList();
  }, []);

  const handledelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure to delete this Review? ");
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:5111/api/Review/${id}`, { method: "DELETE", });
        if (!response.ok) {
          throw new Error("Failed to delete Review")
        }
        setdata(data.filter((item) => item.id !== id));
      } catch (error) {
        console.error("Erroe deleting Review");
      }
    };

  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'title', headerName: 'Title', width: 200, },
    { field: 'rating', headerName: 'Rating', width: 90 },
    {
      field: 'text',
      headerName: 'Text',
      width: 300,
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
    <div className='reviewList'>
      <div className="AddButton">
        <h1 className="Title">REVIEW</h1>
        <Link to={'/ReviewEdit'}>
          <button className='ReviewlistAdd'>Add</button>
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
