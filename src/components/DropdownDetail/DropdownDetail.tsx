import { Dropdown } from "react-bootstrap"
import styles from './DropdownDetail.module.css'

function DropdownDetail ({handleRemove, handleModalEdit} : {handleRemove: ()=> void, handleModalEdit: ()=> void}){
  return (
    <Dropdown drop="up">
      <Dropdown.Toggle id="dropdown-basic" className={styles.customToggle}>
        <span>&bull;</span>
        <span>&bull;</span>
        <span>&bull;</span>
      </Dropdown.Toggle>

      <Dropdown.Menu className={styles.customMenu}>
        <Dropdown.Item onClick={handleRemove} className={styles.customItem}><svg xmlns="http://www.w3.org/2000/svg" className={styles.customIcon}  viewBox="0 0 24 24"><path fill="none" stroke="#000000" d="M12 8.465L18.965 1.5l.177.177l.152.228a10.1 10.1 0 0 0 2.8 2.801l.23.153l.176.177L15.536 12l6.964 6.965l-.177.176l-.228.153a10.1 10.1 0 0 0-2.801 2.8l-.153.23l-.176.176L12 15.536L5.036 22.5l-.177-.177l-.153-.228a10.1 10.1 0 0 0-2.8-2.801l-.23-.153l-.176-.176L8.465 12L1.5 5.036l.177-.177l.229-.153a10.1 10.1 0 0 0 2.8-2.8l.153-.23l.177-.176z"/></svg> Remove Movie</Dropdown.Item>
        <Dropdown.Item onClick={handleModalEdit} className={styles.customItem}><svg xmlns="http://www.w3.org/2000/svg" className={styles.customIcon}  viewBox="0 0 24 24"><path fill="#000000" d="M5 19h1.425L16.2 9.225L14.775 7.8L5 17.575zm-2 2v-4.25L17.625 2.175L21.8 6.45L7.25 21zM19 6.4L17.6 5zm-3.525 2.125l-.7-.725L16.2 9.225z"/></svg> Edit Movie</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default DropdownDetail
