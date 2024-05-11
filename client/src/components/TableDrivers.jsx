import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { User } from '../request/users'; 

const userController = new User();

const columns = [
  { id: 'name', label: 'Nombre', minWidth: 170 },
  { id: 'lastName', label: 'Apellido', minWidth: 170 },
  { id: 'identification', label: 'Identificación', minWidth: 170 },
];

export const TableDrivers = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [users, setUsers] = React.useState([]); 

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await userController.getListUser();
        setUsers(data);
      } catch (error) {
        console.error('Hubo un error al cargar los datos:', error);
      }
    };
    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const startDrag = (evt, item) => {
    evt.dataTransfer.setData('itemID', item.identification); 
  }

  const draggingOver = (evt) => {
    evt.preventDefault();
  }

  const onDrop = (evt, identification) => {
    evt.preventDefault();
    const itemID = evt.dataTransfer.getData('itemID');
    const draggedItemIndex = users.findIndex(user => user.identification === itemID); 
    const draggedItem = users[draggedItemIndex];
    const dropIndex = users.findIndex(user => user.identification === identification); 
    
    const updatedUsers = [...users];
    updatedUsers.splice(draggedItemIndex, 1);
    updatedUsers.splice(dropIndex, 0, draggedItem); 

    setUsers(updatedUsers);
  }

  return (
    <div className='div-table-drivers'>
      <Paper sx={{ width: '92%', overflow: 'hidden', marginBottom: '100px' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{ minWidth: column.minWidth, width: column.minWidth, backgroundColor: 'rgb(54,54,54)', color: 'white' }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => {
                  return (
                    <TableRow 
                      hover 
                      role="checkbox" 
                      tabIndex={-1} 
                      key={user.identification} 
                      draggable 
                      onDragStart={(evt) => startDrag(evt, user)}
                      onDragOver={draggingOver}
                      onDrop={(evt) => onDrop(evt, user.identification)} 
                    >
                      {columns.map((column) => {
                        const value = user[column.id];
                        return (
                          <TableCell key={column.id} style={{ minWidth: column.minWidth, width: column.minWidth }}> 
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
