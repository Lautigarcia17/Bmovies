import { Modal } from "react-bootstrap";
import styles from "./ModalEdit.module.css";
import { useState } from "react";
import { useRating } from "../../hooks/useRating";

function ModalEdit ({ show, handleModalEdit,handleEdit }: { show: boolean, handleModalEdit: () => void, handleEdit: (rating: number | null, trailer: string) => void }) {

  const {rating, setRatingFromValue, handleValidationRating} = useRating();
  const [trailer, setTrailer] = useState<string>('');

  const handleSave = ()=>{
    if(rating || trailer) handleEdit(rating,trailer)
    handleModalEdit();
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
              <input type="number" min="1" max="10"  id="rating" className={styles.inputNumber} onKeyUp={(e)=> setRatingFromValue(e.currentTarget.value)} onBlur={handleValidationRating} />

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
