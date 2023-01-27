import React, { useEffect, useState } from "react"
import { Button, Table} from 'react-bootstrap';
import Axios from 'axios';
import { useQuery } from "@tanstack/react-query";

function SelectableTable({setModalShow, modalShow, setEdit, setInputName, setInputStockLevel, setInputStorage, setInputStoragePlace}){

  const {data: dbData, refetch: refetchData} = useQuery(["stocks"], async () => {
    const res = await Axios.get('http://localhost:3001/stocks');
    setData(res.data);
    return res.data;
  });

  const [data, setData] = useState([]);

  const [selectedRows, setSelectedRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    refetchData();
  },[refetchData, modalShow])

  const filterData = (searchTerm) => {
      setData(dbData?.filter(row => row.article_id.toString().includes(searchTerm)
      || row.name.includes(searchTerm)
      || row.stock_level.toString().includes(searchTerm)
      || row.storage.includes(searchTerm)
      || row.storage_place.includes(searchTerm)));
  }

  const deleteEntries = (ids) => {
    if(ids.length !== 0){
      setSelectedRows([]);
      for(let id of ids){
        Axios.delete(`http://localhost:3001/stocks/${id}`).then(() => {
          refetchData();
        });
      }
    }
  };

  const onSelectAllCheckboxChange = (event) => {
    if(event.target.checked){
      setSelectedRows(data.map(d => d.article_id));
    }else {
      setSelectedRows([]);
    }
  };

  const onSelectEntrieCheckboxChange = (event, artnr) => {
    if(event.target.checked){
      setSelectedRows([...selectedRows, artnr]);
    }else {
      setSelectedRows(selectedRows.filter(id => id !== artnr));
    }
  };

  const openCreateDialog = () => {
    setEdit(-1);
    setInputName("");
    setInputStockLevel(1);
    setInputStorage("");
    setInputStoragePlace("");
    setModalShow(true)
  }

  const openEditDialog = (artnr) => {
    const d = data?.find(d => d.article_id === artnr);
    setEdit(artnr);
    setInputName(d.name);
    setInputStockLevel(d.stock_level);
    setInputStorage(d.storage);
    setInputStoragePlace(d.storage_place);
    setModalShow(true)
  }

  const onSearch = (event) => {
    setSearchTerm(event.target.value);
    filterData(event.target.value);
  }

    return (
      <div>
        <input placeholder="Suche" value={searchTerm} onChange={onSearch}/>
      <Table>
        <thead>
          <tr>
            <th>
              <input type="checkbox" checked={selectedRows.length === data?.length && data?.length !== 0} onChange={onSelectAllCheckboxChange}/>
            </th>
            <th>Artikelnummer</th>
            <th>Bezeichnung</th>
            <th>Stückzahl</th>
            <th>Lager</th>
            <th>Lagerplatz</th>
            <th>
              <Button variant="success" onClick={openCreateDialog}>Anlegen</Button>
              <Button variant="danger" onClick={() => deleteEntries(selectedRows)}>Löschen</Button>
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((row, index) => {
            return(
            <tr key={index}>
              <td>
                <input type="checkbox" id={row.artnr} checked={selectedRows.includes(row.article_id)} onChange={(event) => onSelectEntrieCheckboxChange(event, row.article_id)}/>
              </td>
              <td>{row.article_id}</td>
              <td>{row.name}</td>
              <td>{row.stock_level}</td>
              <td>{row.storage}</td>
              <td>{row.storage_place}</td>
              <td>
                <Button onClick={() => openEditDialog(row.article_id)}>Bearbeiten</Button>
                <Button variant="danger" onClick={() => deleteEntries([row.article_id])}>Löschen</Button>
              </td>
          </tr>
          )
          })}
        </tbody>
      </Table>
      </div>
    )
}

export default SelectableTable;