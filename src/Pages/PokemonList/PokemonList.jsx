import './pokemonList.css';
import { DataGrid } from '@mui/x-data-grid';
import { Delete } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Pokemon() {

  const [data, setdata] = useState([]);
  
  // Function to fetch the Pokemon list
  const getPokemonList = async () => {
    try {
      const response = await fetch("http://localhost:5111/api/Pokemon", { method: "GET" });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      setdata(result);
    } catch (error) {
      console.error("Error fetching pokemon list:", error);
    }
  };
  useEffect(() => {
    getPokemonList();
  }, []);

  const handledelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete Pokemon");
    if(confirmDelete){
      try{
        const response = await fetch(`http://localhost:5111/api/Pokemon/${id}`, {method:"DELETE",});
        if(!response.ok){
          throw new Error("Failed to delete Pokemon");
        }
        setdata(data.filter((item) => item.id !== id));
      }catch(error){
        console.error("Error deleting Pokemon",error);
      }
    };
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 120 },
    { field: 'name', headerName: 'Name', width: 200 },
    {
      field: 'birthDate',
      headerName: 'BirthDate',
      width: 200,
    },
    {
      field: "action", headerName: "Action", width: 250,
      renderCell: (params) => {
        return (
          <>
            <Link to={`${params.row.id}`}>
              <button className='pokemonlistedit'>Update</button>
            </Link>
            <Delete className='pokemonlistdelete' onClick={() => handledelete(params.row.id)} />
          </>
        );
      } 
    },
  ];

  return (
    <div className='pokemon'>
      <div className="PokemonAddButton">
        <h1 className="Title">POKEMON</h1>
      <Link to='/PokemonEdit'>
              <button className='pokemonbuttonedit'>Add</button>
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
