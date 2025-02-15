import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getUsers, deleteUserById, updateUsersOrder } from "../slices/userSlice";
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import { Modal } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { User } from '../request/users';

const userController = new User();

const columns = [
  { id: 'name', label: 'Nombre', minWidth: 170 },
  { id: 'lastName', label: 'Apellido', minWidth: 170 },
  { id: 'identification', label: 'Identificación', minWidth: 170 },
  { id: 'actions', label: '', minWidth: 50 },
];

export const TableDrivers = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [identification, setIdentification] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await userController.getListUser();
        dispatch(getUsers(usersData));
      } catch (error) {
        console.error('Hubo un error al cargar los datos:', error);
      }
    };
    fetchData();
  }, [dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDelete = async (id) => {
    Modal.confirm({
      title: 'Confirmación',
      content: '¿Estás seguro de que quieres eliminar este usuario?',
      onOk: async () => {
        try {
          const response = await userController.deleteUser(id);
          if (response.status === 200) {
            dispatch(deleteUserById(id));
            Modal.success({
              content: 'Usuario eliminado correctamente.',
            });
          } else {
            Modal.error({
              content: 'Ocurrió un error al eliminar el usuario.',
            });
          }
        } catch (error) {
          console.error("Failed to delete user", error);
          Modal.error({
            content: 'Ocurrió un error al eliminar el usuario.',
          });
        }
      },
    });
  };

  const startDrag = (evt, item) => {
    evt.dataTransfer.setData('itemID', item.identification);
  };

  const draggingOver = (evt) => {
    evt.preventDefault();
  };

  const onDrop = (evt, identification) => {
    evt.preventDefault();
    const itemID = evt.dataTransfer.getData('itemID');
    const draggedItemIndex = users.findIndex(user => user.identification === itemID);
    const draggedItem = users[draggedItemIndex];
    const dropIndex = users.findIndex(user => user.identification === identification);

    const updatedUsers = [...users];
    updatedUsers.splice(draggedItemIndex, 1);
    updatedUsers.splice(dropIndex, 0, draggedItem);

    dispatch(updateUsersOrder(updatedUsers));
  };

  const filteredUsers = users.filter(user => user.identification.toLowerCase().includes(identification.toLowerCase()));

  return (
    <>
      <div className='div-filter-cars'>
        <ThemeProvider theme={theme}>
          <TextField sx={{ width: '370px' }} id="identification" label="Identificación" variant="outlined" value={identification} onChange={(e) => setIdentification(e.target.value)} />
        </ThemeProvider>
      </div>
      <div className='div-table-drivers'>
        <Paper sx={{ width: '92%', overflow: 'hidden', marginBottom: '100px' }}>
          <TableContainer sx={{ maxHeight: 800, minHeight: 500 }}>
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
                {filteredUsers
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
                        {columns.slice(0, -1).map((column) => {
                          const value = user[column.id];
                          return (
                            <TableCell key={column.id} style={{ minWidth: column.minWidth, width: column.minWidth }}>
                              {column.format && typeof value === 'number'
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                        <TableCell key="actions" style={{ minWidth: 50, width: 50 }}>
                          <IconButton onClick={() => handleDelete(user.id)}>
                            <DeleteOutlined />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25]}
            component="div"
            count={filteredUsers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </>
  );
};

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'black',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'black',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'black',
          },
          borderRadius: '15px', 
          '& fieldset': {
            borderRadius: '15px',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            color: 'black',
          },
        },
      },
    },
  },
});