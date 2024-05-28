import { guitars } from './database.js';

function Title({}) {
  return (
    <>
      <h1 class="text-3xl font-semibold mb-4">3D Printed Guitars Guide</h1>
      <p class="text-base md:text-lg text-gray-700 leading-relaxed mb-4">The largest online directory of 3D printed guitars...</p>
    </>
  );
}

function Guitar({ guitar }) {
  return (
    <div class="max-w-sm rounded overflow-hidden shadow-lg">
      <img class="w-full" src={require("../imgs/" + guitar.img_src)} alt={guitar.name}></img>
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">{guitar.name}</div>
        <p class="text-gray-700 text-base">{guitar.description}</p>
      </div>
      <div class="px-6 pt-4 pb-2">
        {Object.keys(guitar.fields).map((field) => (
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{field}: {guitar.fields[field]}</span>
        ))}
        <a href={guitar.link} class="text-blue-500 hover:underline">get</a>
      </div>
    </div>
  );
}

function GuitarList({ guitars }) {
  return (
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-1">
      {guitars.map(guitar =>
        <Guitar guitar={guitar} />
      )}
    </div>
  );
}

function App() {
  return (
    <>
      <div class="container mx-auto p-4">
        <Title></Title>
        <GuitarList guitars={guitars} />
        <p class="text-base md:text-lg text-gray-700 leading-relaxed p-4">Built by Tyler Hilbert (TYHSoftware@Gmail.com)</p>
      </div>
    </>
  );
}

export default App;
