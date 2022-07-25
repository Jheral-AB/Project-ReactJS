import { useState } from 'react'
import Lista from './Lista';

export default function ListaApp(){

    const [title, setTitle] = useState("");
    const [list, setList] = useState([])

    function handleChange(e){
        e.preventDefault()
        const value = e.target.value
        return setTitle(value)
    }

    function handleList(e){
        e.preventDefault()

        const newItem = {
            id: crypto.randomUUID(),
            title: title,
            completed: false
        }

        const temp = [...list]
        temp.unshift(newItem)
        
        setList(temp)
    }

    function handleUpdate(id, value){
        const temp = [...list]
        const item = temp.find(item => item.id === id)   
        item.title = value
        setList(temp)
    }

    function handleDelete(id){
        const temp = list.filter(item => item.id !== id)
        setList(temp)
    }

    return (
        <div className="listaContainer">
            <form className="listaFormulario">   
                <input
                    onChange={handleChange} 
                    className="listaInput" 
                    />
                <input
                    onClick={handleList} 
                    type="submit" 
                    value="Crear Tarea" 
                />
            </form>

            <div className='tareaContainer'>
                {list.map(item => (
                    <Lista key={item.id} item={item} onUpdate={handleUpdate} onDelete={handleDelete} />
                ))}
            </div>
        </div>
    )
}