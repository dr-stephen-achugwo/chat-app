import styles from "./Send.module.css"

export default function Send (props) {
    const message = props.message
    const setMessage = props.setMessage

    const handleSend = async function () {
        try {
            const res = await fetch(import.meta.env.VITE_URL+"post/new", {
                method: "POST",
                headers: {
                    "Content-Type": "text/plain"
                },
                body: message
            })
            await setMessage("")
        } catch(err) {
            console.error("Post failed")
        }
    }

    return <button className={styles.send} onClick={handleSend}>Send</button>
}
