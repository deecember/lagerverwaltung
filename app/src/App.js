import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import EntryDialog from './components/EntryDialog';
import SelectableTable from './components/SelectableTable';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

function App() {

  const queryClient = new QueryClient();

  const [modalShow, setModalShow] = useState(false);

  const [edit, setEdit] = useState(-1);
  const [inputName, setInputName] = useState("");
  const [inputStockLevel, setInputStockLevel] = useState(1);
  const [inputStorage, setInputStorage] = useState("");
  const [inputStoragePlace, setInputStoragePlace] = useState("");

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Container>
          <h1>Lagerverwaltung</h1>
          <EntryDialog
          show={modalShow}
          onHide={() => setModalShow(false)}
          edit={edit}
          setEdit={setEdit}
          inputName={inputName}
          setInputName={setInputName}
          inputStockLevel={inputStockLevel}
          setInputStockLevel={setInputStockLevel}
          inputStorage={inputStorage}
          setInputStorage={setInputStorage}
          inputStoragePlace={inputStoragePlace}
          setInputStoragePlace={setInputStoragePlace}
          />
        <SelectableTable
          setModalShow={setModalShow}
          modalShow={modalShow}
          setEdit={setEdit}
          setInputName={setInputName}
          setInputStockLevel={setInputStockLevel}
          setInputStorage={setInputStorage}
          setInputStoragePlace={setInputStoragePlace}
        />
        </Container>
      </QueryClientProvider>
    </div>
  );
}



export default App;