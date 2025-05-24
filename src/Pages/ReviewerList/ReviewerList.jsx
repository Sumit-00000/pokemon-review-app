import './reviewerList.css'
import { DataGrid } from '@mui/x-data-grid';
import { Delete } from '@mui/icons-material'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function ReviewerList() {

  const [data, setdata] = useState([]);
  const getReviewerList = async () => {
    try {
      const response = await fetch("http://localhost:5111/api/Reviewer", { method: "GET" });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      setdata(result);
    } catch (error) {
      console.error("Error Fetching Reviewer List:", error);
    }
  };

  useEffect(() => {
    getReviewerList();
  }, []);

  const handledelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this Reviewer?");
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:5111/api/Reviewer/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete Reviewer");
        }
        setdata(data.filter((item) => item.id !== id));
      } catch (error) {
        console.error("Error deleting Reviewer:", error);
      }
    }
  };
  const columns = [

    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'firstName', headerName: 'First Name', width: 200, },
    {
      field: 'lastName',
      headerName: 'Last Name',
      width: 180,
    },
    {
      field: "action", headerName: "Action", width: 250,
      renderCell: (params) => {
        console.log(params.row.id);
        return (
          <>
            <Link to={`${params.row.id}`}>
              <button className='reviewerlistedit'>Update</button>
            </Link>
            <Delete className='reviewerlistdelete' onClick={() => handledelete(params.row.id)} />
          </>
        )
      }
    },
  ];

  return (
    <div className='reviewerList'>
      <div className="AddReviewerButton">
      <h1 className="Title">REVIEWER</h1>
      <Link to={'/ReviewerEdit'}>
              <button className='ReviewerlistAdd'>Add</button>
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
