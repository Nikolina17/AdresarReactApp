import React, {useEffect, useState} from 'react'
import Adresar from './components/Adresar'
import porukeServer from './services/adresar'

const App = (props) => {
    const [adresar, postaviAdresar] = useState([])
    const [unosImena, postaviIme] = useState()
    const [unosMail, postaviMail] = useState()
    const [ime, traziIme] = useState('');
    
	
    useEffect(() => {
      porukeServer
      .dohvatiSve()    
      .then(response => {
        postaviAdresar(response.data)
      })
    }, [])
    const excludeColumns = ["id"];
    const filtrirajOsobe = (value) =>{
      const lowercasedValue = value.toLowerCase().trim();
      if(lowercasedValue === "")
      {
        postaviAdresar(adresar);
      }
      else{
        const filterData = adresar.filter(item =>{
          return Object.keys(item).some(key =>
            excludeColumns.includes(key) ? false : item[key].toString().toLowerCase().includes(lowercasedValue));
        });
        postaviAdresar(filterData);
      }
    }
    const handleChange = value => {
      traziIme(value);
      filtrirajOsobe(value);
    }

  const promjenaImena = (e) => {
    postaviIme(e.target.value)
  }
  const promjenaMaila = (e) => {
    postaviMail(e.target.value)
  }

  const brisiKontakt = (id) => {
    porukeServer
      .brisi(id)
      .then(response => {
        postaviAdresar(adresar.filter(p => p.id !== id))
      })
  }

    const noviAdresar = (e) => {
      e.preventDefault()
      const noviObjekt = {
        ime: unosImena,
        mail: unosMail,
      }
      porukeServer
        .stvori(noviObjekt)
        .then(response => {
          postaviAdresar(adresar.concat(response.data))
          postaviIme('')
          postaviMail('')
        })
 
    }
    return (
      <div>
        <h1>Adresar</h1>
        <input type="text" placeholder="Unesi ime.." value={ime || ""} onChange={e => handleChange(e.target.value)}/>
        <ul>
          {adresar.products.map(a =>
            <Adresar 
            key={a.id} 
            adresar={a} 
            brisiKontakt={() => brisiKontakt(a.id)}/>
          )}        
        </ul>
        <h1>Novi kontakt</h1>
        <form onSubmit={noviAdresar}>
          Ime i prezime: <input value={unosImena || ""} onChange={promjenaImena} /><br></br>
          Email: <input value={unosMail || ""} onChange={promjenaMaila} /><br></br>
          <button type='submit'>Dodaj</button>
        </form>
      </div>
    )
  }
export default App