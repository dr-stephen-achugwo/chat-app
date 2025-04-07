import { useState } from "react"
import styles from "./NewMessage.module.css"
import Input from "./Input/Input"
import Send from "./Send/Send"

export default function NewMessage () {
    const [message, setMessage] = useState("")

    return <div className={styles.newmessage}>
        <Input message={message} setMessage={setMessage}></Input>
        <Send message={message} setMessage={setMessage}></Send>
    </div>
}