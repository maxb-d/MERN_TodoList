import { useState, useEffect } from 'react'

import { FaTrash } from 'react-icons/fa'

import { Route, Routes, useNavigate } from 'react-router-dom'

import Layout from './components/Layout';
import Public from './components/Public';
import Login from './features/auth/Login';
import DashLayout from './components/DashLayout';
import Welcome from './features/auth/Welcome';
import NotesList from './features/notes/NotesList';
import TodoList from './features/todos/TodoList';
import Counter from './features/counter/Counter';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        
        <Route path="dash" element={<DashLayout />}>
          
          <Route index element={<Welcome />} />

          <Route path="notes">
            <Route index element={<NotesList />} />
          </Route>

          <Route path="todos">
            <Route index element={<TodoList />} />
          </Route>

          <Route path="counter">
            <Route index element={<Counter />} />
          </Route>

        </Route>

      </Route>
    </Routes>
  );
}

export default App;
