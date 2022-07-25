import React, { useState, useRef, useEffect } from "react";
import Tarea from "./Tarea";
import { v4 as uuid } from 'uuid'

const KEY = "postItApp.tareas"

function Lista(props){

    // se crea la constante tareas y su metodo para actualizar
    const [tareas, setTareas] = useState([])

    // Creamos referencia para ubicar los campos y obtener su valor
    const tituloRef = useRef()
    const descripcionRef = useRef()
    const checkRef = useRef()

    useEffect( () => {
        const devolverTareas = JSON.parse(localStorage.getItem(KEY))

        if (devolverTareas != "") {
            setTareas(devolverTareas)
        }
    }, [])

    useEffect( () => {
        localStorage.setItem(KEY, JSON.stringify(tareas))
    }, [tareas] )


    
    const ingresarTarea = () => {

        // se obtiene el valor de los campos y generamos un id unico
        const titulo = tituloRef.current.value
        const descripcion = descripcionRef.current.value
        const importante = checkRef.current.checked
        const id = uuid()

        // no retorna nada en caso de estar la tarea vacia
        if(descripcion === '') {
            return alert('Ingresa una descripcion')
        }else{
            
            // creamos la nueva tarea agregandoles los valores de input
            setTareas( (tareasPrev) => { //recorremos el array de tareas
                const nuevaTarea = {
                    id: id,
                    titulo: titulo,
                    descripcion: descripcion,
                    importante: importante
                }

                // le agregamos la nueva tarea al array
                return [...tareasPrev, nuevaTarea]
            } )
            
            console.log(titulo + " " + descripcion + " " + id)
            
            // borrar el texto de los input al agregar una tarea
            tituloRef.current.value = null
            descripcionRef.current.value = null
            checkRef.current.checked = null
        }
    }

    const eliminarTareas = (id) => {
        const tareaBorrada = tareas.filter( (tarea) => tarea.id !== id ) 
        return setTareas(tareaBorrada)
    }

    return(
        <div className="container mt-4">

            <div className="container d-grid gap-2">
                <div className="row">
                    <div className="col col-12">
                        <h1>Post it simulator!</h1>
                    </div>
                    <div className="col col-md-3 col-sm-12 col-12 mt-1">

                        <input ref={tituloRef} className='form-control' type='text' placeholder="Titulo..." />
                    </div>
                    <div className="col col-md-4 col-sm-12 col-12 mt-1">

                        <input ref={descripcionRef} className='form-control' type='text' placeholder="Descripcion..." />
                    </div>
                    <div className="col col-md-2 col-sm-12 col-12 mt-1">
                        <input ref={checkRef} className='form-check-input check' type='checkbox' />
                        <label className="labelCheck">Importante!</label>
                    </div>
                    <div className="col col-md-3 col-sm-12 col-12 mt-1">

                        <button onClick={ingresarTarea} className='btn btn-dark form-control' type='button'>AGREGAR</button>
                    </div>
                </div>
            </div>

            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 mt-4">
                {tareas.map( (e) => <Tarea tarea={e} key={e.id} eliminarTareas={eliminarTareas}/>)}
            </div>
        </div>
    )
}

export default Lista