import * as React from 'react';
import { User } from '../request/users';

const userController = new User();

export const CreateUser = () => {
    const [name, setName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [password, setPassword] = React.useState();
    const [email, setEmail] = React.useState("");
    const [image, setImage] = React.useState();

    const handleImageUpload = (event) => {
      const file = event.target.files[0];
      const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
  
      if (file && validImageTypes.includes(file.type)) {
          setImage(file);
      } else {
          alert("Por favor, selecciona un archivo de imagen válido.");
      }
    };
  
    const handleCreate = async () => {
        try {
            const data = {
              name,
              lastName,
              password,
              email,
            };
            const response = await userController.newUser(data, image);
            console.log(response);
            response.status == 201
              ? alert("Creación exitosa")
              : alert("Error al crear el producto");
        } catch (error) {
            console.error(error);
            alert("Ocurrió un error al intentar crear el producto");
        }
    };
  
    return (
        <>
          <input type="file" accept="image/*" onChange={handleImageUpload}/>
        </>
    );
}