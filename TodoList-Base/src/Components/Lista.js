import { useState } from 'react'

export default function Lista({ item, onUpdate, onDelete }) {
    const [edit, setEdit] = useState(false);
    
    function FormEdit(){
        
        const [newValue, setNewValue] = useState(item.title)
        
        function handleSubmit(e){
            e.preventDefault()
        }
        
        function handleChange(e){
            e.preventDefault()
            const value = e.target.value
            setNewValue(value)
        }

        function handleClick(){
            onUpdate(item.id, newValue)
            setEdit(false)
        }

        return(
            <form className='editList' onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    className='taskInput' 
                    onChange={handleChange}
                    value={newValue}
                />
                <button className='button' type='button' onClick={handleClick} >
                    done
                </button>
            </form>
        )
    }
    function FormItem(){
        return(
            <div className='infoItem'>
                {item.title}
                <button onClick={() => setEdit(true)}>edit</button>
                <button onClick={(e) => onDelete(item.id)}>
                    delete
                </button>
            </div>
        )
    }
    
    return (
        <div className='lista'>
            {edit ? <FormEdit /> : <FormItem />}        
        </div>
    )
}