import { Modal } from "react-bootstrap";
import styles from "./ModalEdit.module.css";
import { useState } from "react";
import { useRating } from "../../hooks/useRating";
import { MovieEdit } from "../../types/interface";

function ModalEdit ({ show, handleModalEdit,handleEdit, editData }: { show: boolean, handleModalEdit: () => void, handleEdit: (rating: number | null, trailer: string, isNewMovie : boolean) => void, editData : MovieEdit }) {
  const {rating, setRatingFromValue, handleValidationRating} = useRating(editData.rating);
  const [trailer, setTrailer] = useState<string>(editData.trailer ?? '');

  const handleSave = ()=>{

    if(rating !== editData.trailer || trailer !== editData.trailer){
      const isNewMovie = editData.rating === null;
      handleEdit(rating,trailer,isNewMovie)
    }else{
      console.log('No changes!')
    }

    handleModalEdit();
  }

  return (
    <>
      <Modal show={show} onHide={handleModalEdit} centered backdrop="static">
        <div className={styles.modalContent}>
          <Modal.Header className={styles.modalHeader} closeButton closeVariant="white">
            <h2 className={styles.modalTitle}>Edit Movie</h2>
          </Modal.Header>
          <Modal.Body className={styles.modalBody}>
            <form className={styles.form}>
              <label htmlFor="rating">Rating</label>
              <input type="number" min="1" max="10"  id="rating" defaultValue={editData.rating ?? ''}  className={styles.inputNumber} onKeyUp={(e)=> setRatingFromValue(e.currentTarget.value)} onBlur={handleValidationRating} />

              <label htmlFor="trailer">Trailer</label>
              <input type="text" id='trailer' defaultValue={editData.trailer ?? ''} className={styles.inputText} onKeyUp={(e)=> setTrailer(e.currentTarget.value)}/>
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
