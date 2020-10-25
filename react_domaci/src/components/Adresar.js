import React from 'react'
 
const Adresar = ({adresar, brisiKontakt}) => {
  return (
  <li>{adresar.ime}  {adresar.mail} <button onClick={brisiKontakt}>Izbrisi</button></li>
  )
}
 
export default Adresar