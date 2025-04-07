import { useEffect, useState } from "react"
import styles from "./Display.module.css"

export default function Display () {
    const [chat, setChat] = useState("")
    const [update, setUpdate] = useState(true)

    const handleDisplay = async function () {
        try {
            const res = await fetch(import.meta.env.VITE_URL+"get/chat")
            if (!res.ok) throw new Error(`Response status: ${response.status}`)

            const chat_js = await res.json();
            const chat_el = chat_js.map(el => (<p key={el.id}>
                    <span className={styles.sender}>{el.sender.split("//")[1]}</span>
                    <span className={styles.message}>{el.message}</span></p>))
            setChat(chat_el)
        } catch (err) {
            console.error("Get failed")
        }
    }

    // useEffect(() => {
    //     setInterval(() => {
    //         setTimeout(handleDisplay)
    //     }, 5000)
    // })

    return <div className={styles.display}>
            {chat}
    </div>
}