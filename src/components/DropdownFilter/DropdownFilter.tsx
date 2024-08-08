import { Dropdown, DropdownDivider } from "react-bootstrap"
import styles from './DropdownFilter.module.css'

function DropdownFilter({setQueryFilter }: { setQueryFilter: React.Dispatch<React.SetStateAction<string>> }) {

    const rating : Array<number> = [1,  2,  3, 4,  5,  6, 7, 8,  9, 10];

  return (
    <Dropdown drop="down-centered">
      <Dropdown.Toggle id="dropdown-basic" className={styles.customToggle}>
        Filter
      </Dropdown.Toggle>

      <Dropdown.Menu className={styles.customMenu}>
        <Dropdown.Item className={styles.customItem} onClick={()=> setQueryFilter('all')}>All</Dropdown.Item>
        <Dropdown.Item className={styles.customItem} onClick={()=> setQueryFilter('not seen')}>Not seen</Dropdown.Item>
        <DropdownDivider className={styles.divider}/>
        <Dropdown.Header className={styles.header}>YEAR</Dropdown.Header>
        <Dropdown.Item className={styles.customItem} onClick={()=> setQueryFilter('2023')}>2023</Dropdown.Item>
        <Dropdown.Item className={styles.customItem} onClick={()=> setQueryFilter('2024')}>2024</Dropdown.Item>
        <DropdownDivider className={styles.divider}/>
        <Dropdown.Header className={styles.hearder}>RATING</Dropdown.Header>
        {rating.map((item,index)=> (
            <Dropdown.Item key={index} className={styles.customItem} onClick={()=> setQueryFilter(item.toString())}>{item}</Dropdown.Item>
            ) 
        )}

      </Dropdown.Menu>
    </Dropdown>
  )
}

export default DropdownFilter
