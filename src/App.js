import { useState } from 'react';

function App() {
  const [admin, setAdmin] = useState(false);
  const [user, setUser] = useState(false);
  const [message, setMessage] = useState('');
  const [all, setAll] = useState([]);
  const [diff, setDiff] = useState('');

  function Admin() {
    setAdmin(true);
  }

  function User() {
    setUser(true);
  }

  function search() {
    const ID = document.getElementById("ID").value;
    fetch(`http://localhost:5000/search?ID=${ID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        console.log(data);
        setMessage(data.message);
        
      })
      .catch(error => {
        console.error("Error Occurred:", error);
      });
  }

  function searchAll() {
    
    fetch(`http://localhost:5000/searchAll`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        console.log(data);
        setAll(data.rese || [])
        
      })
      .catch(error => {
        console.error("Error Occurred:", error);
      });
  }

  function insert() {
    const ID = document.getElementById("NewId").value;
    const Start = document.getElementById("Start").value;
    const End = document.getElementById("End").value;
    
    const postdata={
      ID:ID,
      Start:Start,
      End:End

    }
    fetch(`http://localhost:5000/insert`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postdata)
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        console.log(data);
        setMessage(data.message);
        
      })
      .catch(error => {
        console.error("Error Occurred:", error);
      });
  }

  function difference() {
    const ID = document.getElementById("ID").value;
    fetch(`http://localhost:5000/difference?ID=${ID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        console.log(data);
        setMessage(data.message);
        setDiff(parseInt(data.difference));
        
      })
      .catch(error => {
        console.error("Error Occurred:", error);
      });
  }

  function update() {
    const ID = document.getElementById("New_Id").value;
    const NewId = document.getElementById("NewId").value;
   
    
    const postdata={
      NewId:NewId,
      ID:ID
 }
    fetch(`http://localhost:5000/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postdata)
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        console.log(data);
        setMessage(data.message);
        
      })
      .catch(error => {
        console.error("Error Occurred:", error);
      });
  }

  function del() {
    const ID = document.getElementById("New_Id").value;
    //const NewId = document.getElementById("NewId").value;
   
    
    const postdata={
      //NewId:NewId,
      ID:ID
 }
    fetch(`http://localhost:5000/delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postdata)
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        console.log(data);
        setMessage(data.message);
        
      })
      .catch(error => {
        console.error("Error Occurred:", error);
      });
  }


  return (
    <>
      {!user && !admin && (
        <div>
          <button onClick={Admin}>Admin</button>
          <button onClick={User}>User</button>
        </div>
      )}
      {!admin && user && (
        <div>
          <input type="text" id="ID" placeholder="ID" />
          <button onClick={search}>Search</button>
          <button onClick={difference}>Calculate difference</button>

        </div>
      )}
      {!user && admin && <div>
        <button onClick={searchAll}> All values </button>
        <input type = 'text' id='New_Id' placeholder="ID"/>
        <button onClick={update}> update </button>
        <br></br>
        <input type = 'text' id='NewId' placeholder="New Id"/>
        <input type = 'text' id='Start' placeholder="Start value"/>
        <input type = 'text' id='End' placeholder="End value"/>
        <button onClick={insert}>Insert</button>
        <button onClick={del}>Delete</button>


        </div>}
      {message && <p>{typeof message === 'object' ? JSON.stringify(message) : message}</p>}
      { <p>{diff}</p>}
      {Array.isArray(all) && all.length > 0 && all.map((al, index) => (
        <p key={index}>{al.ID}</p>
      ))}
    </>
  );
}

export default App;
