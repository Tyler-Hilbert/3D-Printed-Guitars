import { guitarsDB } from './database.js';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Header({}) {
  return (
    <>
      <div class="jumbotron p-4">
        <h1>3D Printed Guitars Guide</h1>
        <p>The largest online directory of 3D printed guitars...</p>
      </div>
    </>
  );
}

function Footer({}) {
  return (
    <p class="p-4">Built by Tyler Hilbert (TYHSoftware@Gmail.com)</p>
  )
}

function Guitar({ guitar }) {
  return (
    <div class="container-fluid">
      <div class="row p-4">
        <div class="col-sm-2">
          <img src={require("../imgs/" + guitar.img_src)} alt={guitar.name} class="w-100"></img>
        </div>
        <div class="col-sm-6">
          <h4>{guitar.name}</h4>
          <p>{guitar.description}</p>
        </div>
        <div class="col-sm-4">
          {Object.keys(guitar.fields).map((field) => (
            <p>{field}: {guitar.fields[field]}</p>
          ))}
          <a href={guitar.link}>Download 3D Model</a>
        </div>
      </div>
    </div>
  );
}

function GuitarsList({ filteredGuitars }) {
  const filtered = filteredGuitars.map(guitar =>  <Guitar guitar={guitar} />);
  return (
    <div class="container-fluid">
        {filtered}
    </div>
  );
}

function Search({ details }) {
  const [searchField, setSearchField] = useState("");

  const filteredGuitars = details.filter(
    guitar => {
      const lowerSearch = searchField.toLowerCase();
      return (
        guitar
        .name
        .toLowerCase()
        .includes(lowerSearch)
        ||
        guitar
        .description
        .toLowerCase()
        .includes(lowerSearch)
        ||
        JSON.stringify(guitar.fields)
        .toLowerCase()
        .includes(lowerSearch)
      );
    }
  );

  const handleChange = e => {
    setSearchField(e.target.value);
  };

  function searchList() {
    return (
      <GuitarsList filteredGuitars={filteredGuitars} />
    );
  }

  return (
    <section>
      <div>
        {/*<input
          type = "search"
          placeholder = "Search Guitar"
          onChange = {handleChange}
  />*/}
      </div>
      {searchList()}
    </section>
  );
}

function App() {
  return (
    <>
      <div>
        <Header />
        <Search details={guitarsDB} />
        <Footer />
      </div>
    </>
  );
}

export default App;
