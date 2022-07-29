import { useRef } from "react";
import EmojiPicker from "./EmojiPicker";

import styles from './EmojiPicker.module.scss'

export default function EmojiPickerInput(){

    const inputRef = useRef()

    return(
        <div>
            <input ref={inputRef} className={styles.search} />
            <EmojiPicker ref={inputRef} />
        </div>
    )
}