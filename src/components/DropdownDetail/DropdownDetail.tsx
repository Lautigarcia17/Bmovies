import { Dropdown } from "react-bootstrap"
import styles from './DropdownDetail.module.css'

const DropdownDetail = ({handleRemove, handleModalEdit} : any) => {
  return (
    <Dropdown drop="up">
      <Dropdown.Toggle id="dropdown-basic" className={styles.customToggle}>
        <span>&bull;</span>
        <span>&bull;</span>
        <span>&bull;</span>
      </Dropdown.Toggle>

      <Dropdown.Menu className={styles.customMenu}>
        <Dropdown.Item onClick={handleRemove} className={styles.customItem}>Remove Movie</Dropdown.Item>
        <Dropdown.Item onClick={handleModalEdit} className={styles.customItem}>Edit Movie</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default DropdownDetail
