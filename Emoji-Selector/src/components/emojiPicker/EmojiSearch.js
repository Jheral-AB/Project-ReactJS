import { useState } from 'react'

import styles from './EmojiPicker.module.scss'

export default function EmojiSearch({ onSearch }) {

    const [value, setValue] = useState();

    function handleChange(e) {
        setValue(e.target.value)
        onSearch(e)
    }

    return <input onChange={handleChange} value={value} className={styles.search} />
}