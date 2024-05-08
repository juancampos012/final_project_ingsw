import * as React from 'react';
import { User } from '../../request/users';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Cookies from 'js-cookie';
import Avatar from '@mui/material/Avatar';


const userController = new User();

export const ViewProfile = () => {
  const [name, setName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [identification, setIdentification] = React.useState("");
  const [role, setRole] = React.useState("");
  const [avatar, setAvatar] = React.useState("");
  const miCookiejwt = Cookies.get('jwt');

  const navigate = useNavigate();

    React.useEffect(() => {
        userController.verifyToken(miCookiejwt)
        .then(data => {
            return data.json();
        })
        .then(response => {
            if(response.user){
                setEmail(response.user.user.email);
                setAvatar(response.user.user.avatar);
                setName(response.user.user.name);
                setLastName(response.user.user.lastName);
                setIdentification(response.user.user.identification);
                setRole(response.user.user.role);
            }
        })
        .catch(error => {
            console.error(error); 
        });
    }, [miCookiejwt]);

  const handleUpdate = async () => {
      navigate('/home');
  };

  return (
      <>
        <div className='div-login'>
          <div className='div-login-left'>
          </div>
          <div className='div-login-right'>
            <div className='div-login-info'>
              <div className='text-login'>
                <h2>Mis datos</h2>
                <Avatar alt="Remy Sharp" src={avatar} sx={{ border: '2px solid #4DA05F', width:'70px', height:'70px', marginBottom:'10px' }} />
                <h4>{name} {lastName}</h4>
                <p style={{margin:'0px', marginTop:'40px'}}>Email: {email}</p>
                <p style={{margin:'0px', marginTop:'20px'}}>Identificacion: {identification}</p>
                <p style={{margin:'0px', marginTop:'20px'}}>Role: {role}</p>
              </div>
              <div className="button-singup">
                <Button 
                  variant="contained" 
                  disableElevation
                  onClick={handleUpdate}
                  style={{ backgroundColor: '#000000', width: '250px', borderRadius: '50px', marginTop:'35px' }}
                >
                  Volver
                </Button>
              </div>
            </div>
          </div>
        </div>
      </>
  );
}