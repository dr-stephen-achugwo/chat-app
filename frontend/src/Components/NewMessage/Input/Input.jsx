import styles from "./Input.module.css"

export default function Input (props) {
    const message = props.message
    const setMessage = props.setMessage

    const handleType = function (e) {
        setMessage(e.target.value)
    }

    return <input className={styles.input} onChange={handleType} value={message}></input>
}