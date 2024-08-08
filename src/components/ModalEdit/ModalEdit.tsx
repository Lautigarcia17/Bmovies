import { Modal } from "react-bootstrap";
import styles from "./ModalEdit.module.css";
import { useState } from "react";




const ModalEdit = ({ show, handleModalEdit,handleEdit }: { show: boolean, handleModalEdit: any, handleEdit: any }) => {

  const [rating, setRating] = useState<number>();
  const [trailer, setTrailer] = useState<string>();


  
  const roundToNearestHalf = (num: number) => {
    return Math.round(num * 2) / 2;
  };

  const validateRange = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value !== '') {
      let value = parseFloat(e.target.value)

      if (value < 1 || isNaN(value)) {
        value = 1;
      } else if (value > 10) {
        value = 10
      }

      e.target.value = roundToNearestHalf(value).toString();
      setRating(parseFloat(e.target.value));
    }
  }

  const handleSave = ()=>{

    if(rating || trailer) handleEdit(rating,trailer)
    handleModalEdit(false);
  }



  return (
    <>

      <Modal show={show} onHide={handleModalEdit} centered backdrop="static">
        <div className={styles.modalContent}>
          <Modal.Header className={styles.modalHeader} closeButton>
            <h2 className={styles.modalTitle}>Edit Movie</h2>
          </Modal.Header>
          <Modal.Body className={styles.modalBody}>
            <form className={styles.form}>
              <label htmlFor="rating">Rating</label>
              <input type="number" min="1" max="10"  id="rating" className={styles.inputNumber} onKeyUp={(e)=> setRating(parseFloat(e.currentTarget.value))} onBlur={validateRange} />

              <label htmlFor="trailer">Trailer</label>
              <input type="text" id='trailer' className={styles.inputText} onKeyUp={(e)=> setTrailer(e.currentTarget.value)}/>
            </form>
          </Modal.Body>
          <Modal.Footer className={styles.modalFooter}>
            <button className={styles.btnCancel} onClick={handleModalEdit}>
              Close
            </button>
            <button className={styles.btnSave} onClick={handleSave}>
              Save
            </button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
};

export default ModalEdit;
