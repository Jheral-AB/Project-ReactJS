import { forwardRef, useRef, useState, useEffect } from "react"

import EmojiSearch from "./EmojiSearch"
import EmojiButton from "./EmojiButton"
import { data as emojiList } from './data'

import styles from './EmojiPicker.module.scss'

export function EmojiPicker(props, inputRef) {

    const [isOpen, setIsOpen] = useState(false) 
    const [emoji, setEmoji] = useState(emojiList)

    const containerRef = useRef(null)

    useEffect(() => {
        window.addEventListener("click", e => {
            if(!containerRef.current.contains(e.target)) {
                setIsOpen(false)
                setEmoji(emojiList)
            }
        })
    }, [])

    function handleClick() {
        setIsOpen(!isOpen)
    }

    function handleSearchInput(e) {
        const query = e.target.value.toLowerCase()

        if(!!query) {
            const search = emojiList.filter(emoji => {
                return emoji.name.toLowerCase().includes(query) ||
                emoji.hotKeys.toLowerCase().includes(query)
            })
            
            setEmoji(search)
        } else {
            setEmoji(emojiList)
        }
    }

    function handleClickEmoji(emoji) {
        const cursorPos = inputRef.current.selectionStart
        const text = inputRef.current.value
        const prev = text.slice(0, cursorPos)
        const next = text.slice(cursorPos)

        inputRef.current.value = prev + emoji.symbol + next
        inputRef.current.selectionStart = cursorPos + emoji.symbol.length
        inputRef.current.selectionEnd = cursorPos + emoji.symbol.length
        inputRef.current.focus()
    }

    // function EmojiPickerContainer() {
    //     return(
    //         <div>
    //             <EmojiSearch onSearch={handleSearchInput} />
    //             <div>
    //                 {emojiList.map(emoji => (
    //                     <div>{emoji.symbol}</div>
    //                 ))}
    //             </div>
    //         </div>
    //     )
    // }

    return (
        <div ref={containerRef} className={styles.inputContainer}>
            <button onClick={handleClick} className={styles.emojiPickerButton}>😎</button>
            
            {isOpen ? (<div className={styles.emojiPickerContainer}>
                <EmojiSearch onSearch={handleSearchInput} />
                <div className={styles.emojiList}>
                {emoji.map(emoji => (
                        <EmojiButton 
                            key={emoji.symbol} 
                            emoji={emoji}
                            onClick={handleClickEmoji} 
                        /> 
                    ))}
                </div>
            </div>) : ("")}
        </div>
    )
}

export default forwardRef(EmojiPicker)