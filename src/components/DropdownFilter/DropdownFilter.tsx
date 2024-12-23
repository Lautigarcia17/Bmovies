import { Dropdown, DropdownDivider } from "react-bootstrap"
import styles from './DropdownFilter.module.css'
import { getYearsList } from "../../utilities/getYearList";

function DropdownFilter({handleQuery }: { handleQuery: (query : string) => void }) {

    const rating : Array<number> = [1,  2,  3, 4,  5,  6, 7, 8,  9, 10];
    const listYears : Array<number> = getYearsList(2023);
    
  return (
    <Dropdown drop="down-centered">
      <Dropdown.Toggle id="dropdown-basic" className={styles.customToggle}>
        Filter
      </Dropdown.Toggle>

      <Dropdown.Menu className={styles.customMenu}>
        <Dropdown.Item className={styles.customItem} onClick={()=> handleQuery('all')}>All</Dropdown.Item>
        <Dropdown.Item className={styles.customItem} onClick={()=> handleQuery('not seen')}>Not seen</Dropdown.Item>
        <DropdownDivider className={styles.divider}/>
        <Dropdown.Header className={styles.header}>YEAR</Dropdown.Header>
        {listYears.map((year)=> (
          <Dropdown.Item className={styles.customItem} onClick={()=> handleQuery(year.toString())}>{year}</Dropdown.Item>
        ))}
        <DropdownDivider className={styles.divider}/>
        <Dropdown.Header className={styles.hearder}>RATING</Dropdown.Header>
        {rating.map((item,index)=> (
            <Dropdown.Item key={index} className={styles.customItem} onClick={()=> handleQuery(item.toString())}>{item}</Dropdown.Item>
            ) 
        )}

      </Dropdown.Menu>
    </Dropdown>



  )
}

export default DropdownFilter
