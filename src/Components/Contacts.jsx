import { useEffect, useState } from "react"
import { v4 } from "uuid"
import ContactsList from "./ContactsList"
import inputs from "../constants/inputs"
import Styles from "./Contacts.module.css"

function Contacts() {
    const storedContacts = JSON.parse(localStorage.getItem("contacts"))
    const [contacts, setContacts] = useState(storedContacts)
    const [alert, setAlert] = useState("")
    const [contact, setContact] = useState({
        id: "",
        name: "",
        lastName: "",
        email: "",
        phone: "",
    })

    useEffect(() => {
        localStorage.setItem("contacts", JSON.stringify(contacts))
    }, [contacts])

    const changeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setContact(contact => ({...contact, [name]: value}))
    }

    const addHandler = () => {
        if (!contact.name || !contact.lastName || !contact.email || !contact.phone) {
            setAlert("Please enter a valid data!")
            return
        }
        setAlert("")
        const newContact = {...contact, id:v4()}
        setContacts(contacts => ([...contacts, newContact]))
        setContact({
            name: "",
            lastName: "",
            email: "",
            phone: "",
        })
    }

    const deleteHandler = (id) => {
        const newContacts = contacts.filter(item => item.id !== id)
        setContacts(newContacts)
    }

  return (
    <div className={Styles.container}>
        <div className={Styles.form}>
            {inputs.map((input, index) => 
                <input
                    key={index}
                    type={input.type}
                    name={input.name}
                    placeholder={input.placeholder}
                    value={contact[input.name]}
                    onChange={changeHandler}
                />
            )}
            <button onClick={addHandler}>Add Contact</button>
        </div>
        <div className={Styles.alert}>
            {alert && <p>{alert}</p>}
        </div>
        <ContactsList contacts={contacts} deleteHandler={deleteHandler}/>
    </div>
  )
}

export default Contacts