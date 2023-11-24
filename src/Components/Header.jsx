import Styles from "./Header.module.css"

function Header() {
  return (
    <div className={Styles.container}>
        <h1>Contact App</h1>
        <a href="https://botostart.ir">Botostart</a>
    </div>
  )
}

export default Header