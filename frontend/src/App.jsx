import styles from "./App.module.css"
import NewMessage from "./Components/NewMessage/NewMessage";
import Display from "./Components/Display/Display";

function App() {
  return (
    <div className={styles.app}>
      <Display />
      <NewMessage />
    </div>
  )
}

export default App
