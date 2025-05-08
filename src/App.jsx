import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });

  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
  }

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  }

  const handleDeleteConfirmed = () => {
    let newTodos = todos.filter(item => item.id !== deleteId);
    setTodos(newTodos);
    setShowConfirm(false);
    setDeleteId(null);
  }

  const handleCancelDelete = () => {
    setShowConfirm(false);
    setDeleteId(null);
  }

  const handleChange = (e) => {
    setTodo(e.target.value);
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => item.id === id);
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-100 max-w-4xl min-h-[80vh]">
        <div className='addTodo my-5'>
          <h2 className='text-lg font-bold my-5'>Add a Todo</h2>
          <input onChange={handleChange} value={todo} type="text" className='w-3/4 h-8 p-2' />
          <button onClick={handleAdd} disabled={todo.length <= 2}
            className='bg-violet-800 hover:bg-violet-950 disabled:bg-violet-700 p-3 py-1 text-white rounded-md mx-5'>Save</button>
        </div>
        <h2 className='text-lg font-bold my-4'>Your Todos</h2>
        <div className='todos'>
          {todos.length === 0 && <div>No Todos to Display</div>}
          {todos.map(item => {
            return (
              <div key={item.id} className='todos flex w-1/2 my-3 justify-between '>
                <div className='flex gap-5'>
                  <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} />
                  <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                </div>
                <div className="buttons flex h-full">
                  <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 p-3 py-1 text-sm text-white rounded-md mx-1'><FaEdit /></button>
                  <button onClick={() => confirmDelete(item.id)} className='bg-violet-800 hover:bg-violet-950 p-3 py-1 text-sm text-white rounded-md mx-1'><AiFillDelete /></button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Confirmation Popup */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-96 animate-fade-in">
            <h2 className="text-xl font-semibold mb-4 text-center">Are you sure?</h2>
            <p className="text-gray-600 mb-6 text-center">You are about to delete this task.</p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={handleDeleteConfirmed}
                className="bg-violet-800 text-white px-4 py-2 rounded hover:bg-violet-700"
              >
                Yes, Delete
              </button>
              <button
                onClick={handleCancelDelete}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}

export default App;
