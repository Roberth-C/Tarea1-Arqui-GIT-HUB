import React, { useState, useEffect } from 'react';
import { getAllUsers, createUser, updateUser, deleteUser } from '../services/api';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: '',
    surname: '',
    age: '',
    email: '',
    phone: ''
  });
  const [userToUpdate, setUserToUpdate] = useState(null);
  const [itemsPerPage] = useState(5); // Eliminamos `setItemsPerPage` ya que no se utiliza.
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        
        const usersData = await getAllUsers();
        setUsers(usersData);
      } catch (error) {
        console.error('Error al cargar los usuarios:', error);
      }
    };
    fetchUsers();
  }, []);

  // Manejo de la creación de usuarios
  const handleCreateUser = async () => {
    if (!newUser.name || !newUser.surname || !newUser.age || !newUser.email || !newUser.phone) {
      alert('Por favor, completa todos los campos');
      return;
    }
    try {
      const createdUser = await createUser(newUser);
      setUsers([...users, createdUser]);
      setNewUser({ name: '', surname: '', age: '', email: '', phone: '' });
    } catch (error) {
      console.error('Error al crear usuario:', error);
    }
  };

  // Manejo de la actualización de usuarios
  const handleUpdateUser = async () => {
    if (userToUpdate) {
      try {
        const updatedUser = await updateUser(userToUpdate.id, newUser);
        setUsers(users.map((user) => (user.id === userToUpdate.id ? updatedUser : user)));
        setUserToUpdate(null);
        setNewUser({ name: '', surname: '', age: '', email: '', phone: '' });
      } catch (error) {
        console.error('Error al actualizar usuario:', error);
      }
    }
  };

  // Manejo de la eliminación de usuarios
  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  };

  // Función para seleccionar el usuario a editar
  const handleEditUser = (user) => {
    setUserToUpdate(user);
    setNewUser({ name: user.name, surname: user.surname, age: user.age, email: user.email, phone: user.phone });
  };

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const currentUsers = users.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="container">
      <div className="form-container">
        <h2>{userToUpdate ? 'Actualizar Usuario' : 'Crear Nuevo Usuario'}</h2>
        <input
          type="text"
          placeholder="Nombre"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Apellido"
          value={newUser.surname}
          onChange={(e) => setNewUser({ ...newUser, surname: e.target.value })}
        />
        <input
          type="number"
          placeholder="Edad"
          value={newUser.age}
          onChange={(e) => setNewUser({ ...newUser, age: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Teléfono"
          value={newUser.phone}
          onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
        />
        <button onClick={userToUpdate ? handleUpdateUser : handleCreateUser}>
          {userToUpdate ? 'Actualizar Usuario' : 'Crear Usuario'}
        </button>
      </div>
      <div className="table-container">
        <h2>Gestión de Usuarios</h2>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Edad</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.surname}</td>
                <td>{user.age}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  <button onClick={() => handleEditUser(user)}>Editar</button>
                  <button onClick={() => handleDeleteUser(user.id)}><i className="fas fa-trash-alt"></i></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination-container">
          <button
            className="pagination-button"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {'<'}
          </button>
          <span className="pagination-info">
            Página {currentPage} de {totalPages}
          </span>
          <button
            className="pagination-button"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            {'>'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Users;
