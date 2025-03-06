import { Dropdown } from "react-bootstrap"
import styles from './DropdownNavbar.module.css'
import { useNavigate } from "react-router-dom";

function DropdownNavbar ({handleScrollToTop,handleLogout} : {handleScrollToTop: ()=> void, handleLogout: ()=> void}){

  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <Dropdown drop="up">
      <Dropdown.Toggle id="dropdown-basic" className={styles.customToggle}>
        <svg xmlns="http://www.w3.org/2000/svg" className={styles.customToggleIcon} viewBox="0 0 32 32"><path fill="#ffffff" d="M12 4a5 5 0 1 1-5 5a5 5 0 0 1 5-5m0-2a7 7 0 1 0 7 7a7 7 0 0 0-7-7m10 28h-2v-5a5 5 0 0 0-5-5H9a5 5 0 0 0-5 5v5H2v-5a7 7 0 0 1 7-7h6a7 7 0 0 1 7 7zm0-26h10v2H22zm0 5h10v2H22zm0 5h7v2h-7z"/></svg>
      </Dropdown.Toggle>

      <Dropdown.Menu className={styles.customMenu}>
        <Dropdown.Item as="div" className={styles.customItem} onClick={handleScrollToTop}>
          <svg xmlns="http://www.w3.org/2000/svg" className={styles.customIcon} viewBox="0 0 14 14"><g fill="#000000" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round"><rect width="8.5" height="13" x="2.75" y=".5" rx="1"/><path d="M5.27 7.14V3.82a.31.31 0 0 1 .47-.28l2.85 1.67a.31.31 0 0 1 0 .54L5.74 7.41a.31.31 0 0 1-.47-.27ZM2.75 10.5h8.5"/></g></svg>
          Home
        </Dropdown.Item>

        <Dropdown.Item className={styles.customItem} onClick={()=> handleNavigate('/profile')}>
          <svg xmlns="http://www.w3.org/2000/svg" className={styles.customIcon} viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M12 4a8 8 0 0 0-6.96 11.947A4.99 4.99 0 0 1 9 14h6a4.99 4.99 0 0 1 3.96 1.947A8 8 0 0 0 12 4m7.943 14.076A9.959 9.959 0 0 0 22 12c0-5.523-4.477-10-10-10S2 6.477 2 12a9.958 9.958 0 0 0 2.057 6.076l-.005.018l.355.413A9.98 9.98 0 0 0 12 22a9.947 9.947 0 0 0 5.675-1.765a10.055 10.055 0 0 0 1.918-1.728l.355-.413zM12 6a3 3 0 1 0 0 6a3 3 0 0 0 0-6" clipRule="evenodd"/></svg>
          Profile
        </Dropdown.Item>

        <Dropdown.Item className={styles.customItem} onClick={handleLogout}>
          <svg xmlns="http://www.w3.org/2000/svg" className={styles.customIcon} viewBox="0 0 24 24"><path fill="#ffffff" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h7v2H5v14h7v2zm11-4l-1.375-1.45l2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5z" /></svg>
          Log out
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default DropdownNavbar
