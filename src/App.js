import { guitarsDB } from './database.js';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Header({}) {
  return (
    <>
      <div class="jumbotron p-4">
        <h1>Print My Guitar</h1>
        <p>The largest online database of 3D printable guitars...</p>
      </div>
    </>
  );
}

function Footer({}) {
  return (
    <p class="p-4">Built by Tyler Hilbert (I'm currently in the job market -- TYHSoftware@gmail.com)</p>
  )
}

function SearchArea({ details }) {
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
      {searchList()}
    </section>
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

function Guitar({ guitar }) {
  if (guitar.broken_link === true) { // Don't render if the link is broken
    return null;
  }

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

function App() {
  return (
    <>
      <div>
        <Header />
        <SearchArea details={guitarsDB} />
        <Footer />
      </div>
    </>
  );
}

export default App;
