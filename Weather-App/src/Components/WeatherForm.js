import { useState } from 'react';

import styles from './WeatherForm.module.css'

export default function WeatherForm({ changeCity }){
    
    const [city, setCity] = useState("")

    function searchChange(e){
        const value = e.target.value
        if (value !== "") setCity(value)
    }

    function handleSubmit(e){
        e.preventDefault()
        changeCity(city)
    }

    return (
        <form onSubmit={handleSubmit} className={styles.container}>
            <input type="text" onChange={searchChange} className={styles.input} />
        </form>
    )
}