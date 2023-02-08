import { Button, Modal } from "react-bootstrap";
import Axios from 'axios';

function EntryDialog({show, onHide, edit, setEdit, inputName, setInputName,
    inputStockLevel, setInputStockLevel, inputStorage, setInputStorage, inputStoragePlace, setInputStoragePlace}){
    const save = () => {
      if(inputName.trim() !== ""){
        onHide();
        if(edit === -1){
            Axios.post('http://localhost:3001/stocks', {
              name: inputName,
              stockLevel: inputStockLevel,
              storage: inputStorage,
              storagePlace: inputStoragePlace
            })
        }else {

          Axios.put(`http://localhost:3001/stocks/${edit}`, {
            name: inputName,
            stockLevel: inputStockLevel,
            storage: inputStorage,
            storagePlace: inputStoragePlace
          })
        }

        setInputName("");
        setInputStockLevel(1);
        setInputStorage("");
        setInputStoragePlace("");
        setEdit(-1);
      }
    }
  
    return (
      <Modal
        show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton onHide={onHide}>
          <Modal.Title id="contained-modal-title-vcenter">
            {edit === -1 ? "Lagerbestand anlegen" : "Lagerbestand bearbeiten"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='form-group'>
            <label>Name</label>
            <input className="form-control" id="inputName" placeholder='Name' value={inputName} onChange={(e) => setInputName(e.target.value)}/>
          </div>
          <div className='form-group'>
            <label>Stückzahl</label>
            <input className="form-control" type={'number'} min={1} id="inputCount" placeholder='Stückzahl' value={inputStockLevel} onChange={(e) => setInputStockLevel(e.target.value)}/>
          </div>
          <div className='form-group'>
            <label>Lager</label>
            <input className="form-control" id="inputStorage" placeholder='Lager' value={inputStorage} onChange={(e) => setInputStorage(e.target.value)}/>
          </div>
          <div className='form-group'>
            <label>Lagerplatz</label>
            <input className="form-control" id="inputStoragePlace" placeholder='Lagerplatz' value={inputStoragePlace} onChange={(e) => setInputStoragePlace(e.target.value)}/>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => save()} variant="success">Speichern</Button>
          <Button onClick={onHide}>Abbrechen</Button>
        </Modal.Footer>
      </Modal>
    )
}

export default EntryDialog;