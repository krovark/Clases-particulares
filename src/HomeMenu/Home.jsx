import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange } from '@mui/material/colors';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import 'bootstrap/dist/css/bootstrap.min.css';
import './menu.css';
import NavigationBar from './NavBar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HistorialSite from '../Historial/Historial-site';
import Profilesite from '../Perfil/perfil-site';
import userLogin from '../Login/LoginForm';

const getAvatarColor = (name) => {
  const firstLetter = name.charAt(0).toUpperCase();
  return deepOrange[500];
};

const generateRandomCalificacion = () => {
  return Math.floor(Math.random() * 5) + 1; // Genera una calificación aleatoria de 1 a 5
};

const generateRandomFrecuencia = () => {
  const frecuencias = ['unica', 'semanal', 'mensual'];
  const randomIndex = Math.floor(Math.random() * frecuencias.length);
  return frecuencias[randomIndex];
};

const generateRandomTipoClase = () => {
  const tipos = ['individual', 'grupal'];
  const randomIndex = Math.floor(Math.random() * tipos.length);
  return tipos[randomIndex];
};

const generateRandomCategoria = () => {
  const categorias = ['Piano', 'Masticar', 'Manejo', 'Matematicas', 'Circo', 'Natación'];
  const randomIndex = Math.floor(Math.random() * categorias.length);
  return categorias[randomIndex];
};

const generateRandomExperiencia = () => {
  const experiencias = [
    'Lorem ipsum dolor sit amet consectetur adipiscing elit.',
    'Experiencia en la enseñanza de esta materia por más de 5 años.',
    'Amplia experiencia en el campo y excelentes resultados con mis estudiantes.',
    'Soy un experto en esta área y he ayudado a muchos estudiantes a tener éxito.',
    'He trabajado con estudiantes de todas las edades y niveles de habilidad.',
  ];
  const randomIndex = Math.floor(Math.random() * experiencias.length);
  return experiencias[randomIndex];
};

const generateRandomPrecio = () => {
  return Math.floor(Math.random() * 100) + 20; // Genera un precio aleatorio entre 20 y 120
};

const generateRandomPosts = (count) => {
  const posts = [];
  for (let i = 1; i <= count; i++) {
    const author = `Autor ${i}`;
    const titulo = `Título ${i}`;
    const experiencia = generateRandomExperiencia();
    const categoria = generateRandomCategoria();
    const precio = generateRandomPrecio();
    const calificacion = generateRandomCalificacion();
    const tipoClase = generateRandomTipoClase();
    const frecuencia = generateRandomFrecuencia();

    const post = {
      author,
      titulo,
      experiencia,
      categoria,
      precio,
      calificacion,
      id: i,
      tipoClase,
      frecuencia,
    };

    posts.push(post);
  }
  return posts;
};

const Postlist = ({ posts, filtroTipo, filtroFrecuencia, filtroCalificacion, filtroCategoria }) => {
  const filteredPosts = posts.filter((post) => {
    return (
      (!filtroTipo || post.tipoClase === filtroTipo) &&
      (!filtroFrecuencia || post.frecuencia === filtroFrecuencia) &&
      (!filtroCalificacion || post.calificacion === filtroCalificacion) &&
      (!filtroCategoria || post.categoria === filtroCategoria)
    );
  });

  return (
    <div className="post-container">
      <div className="post-grid">
        {filteredPosts.map((post) => (
          <div className="post-preview" key={post.id}>
            <div className="head-post">
              <div className="class-category">
                <h2>{post.categoria}</h2>
              </div>
            </div>
            <div className="avatar">
              <Stack direction="row" spacing={2}>
                <Avatar sx={{ bgcolor: getAvatarColor(post.author) }}>
                  {post.author.charAt(0).toUpperCase()}
                </Avatar>
              </Stack>
            </div>
            <ul>
              <li>Nombre: {post.author}</li>
              <li>Titulo: {post.titulo}</li>
              <li>Experiencia: {post.experiencia}</li>
              <li>Calificacion: {post.calificacion}</li>
            </ul>
            <div className="precio-clase">
              <h1>{post.precio}/h</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Sidebar = ({ setFiltroTipo, setFiltroFrecuencia, setFiltroCalificacion, setFiltroCategoria }) => {
  const marks = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' },
  ];

  return (
    <div className="sidebar">
      <header>
        <h3>Filtros</h3>
      </header>

      <div className="filter-container">
        <div className="filter">
          <InputLabel className="custom-label">Tipo de clase</InputLabel>
          <Select
            className="custom-select"
            label="Tipo de clase"
            onChange={(e) => setFiltroTipo(e.target.value)}
          >
            <MenuItem value="">Todos</MenuItem>
            <MenuItem value="individual">Individual</MenuItem>
            <MenuItem value="grupal">Grupal</MenuItem>
          </Select>
        </div>

        <div className="filter">
          <InputLabel className="custom-label">Frecuencia</InputLabel>
          <Select
            className="custom-select"
            label="Frecuencia"
            onChange={(e) => setFiltroFrecuencia(e.target.value)}
          >
            <MenuItem value="">Todos</MenuItem>
            <MenuItem value="unica">Única</MenuItem>
            <MenuItem value="semanal">Semanal</MenuItem>
            <MenuItem value="mensual">Mensual</MenuItem>
          </Select>
        </div>

        <div className="filter">
          <Typography id="calificacion-slider" gutterBottom>
            <strong style={{ textAlign: 'center', display: 'block' }}>Calificación</strong>
          </Typography>
          <Slider
            defaultValue={3}
            step={1}
            min={1}
            max={5}
            valueLabelDisplay="auto"
            aria-labelledby="calificacion-slider"
            marks={marks}
            labelPlacement="top"
            onChange={(e, value) => setFiltroCalificacion(value)}
          />
        </div>

        <div className="filter">
          <InputLabel className="custom-label">Categoría</InputLabel>
          <Select
            className="custom-select"
            label="Categoría"
            onChange={(e) => setFiltroCategoria(e.target.value)}
          >
            <MenuItem value="">Todos</MenuItem>
            <MenuItem value="Piano">Piano</MenuItem>
            <MenuItem value="Masticar">Masticar</MenuItem>
            <MenuItem value="Manejo">Manejo</MenuItem>
            <MenuItem value="Matematicas">Matematicas</MenuItem>
            <MenuItem value="Circo">Circo</MenuItem>
            <MenuItem value="Natación">Natación</MenuItem>
          </Select>
        </div>
      </div>
    </div>
  );
};

const HomeMenu = () => {
  const [filtroTipo, setFiltroTipo] = useState('');
  const [filtroFrecuencia, setFiltroFrecuencia] = useState('');
  const [filtroCalificacion, setFiltroCalificacion] = useState(null);
  const [filtroCategoria, setFiltroCategoria] = useState('');

  // Generar 50 publicaciones aleatorias que cumplen con los filtros
  const publicaciones = generateRandomPosts(50);

  return (
    <Router>
      <NavigationBar />
      <div className="mainMenu">
        <Switch>
          <Route path="/historial" component={HistorialSite} />
          <Route path="/perfil" component={Profilesite} />
          <Route path="/iniciarsesion" component={userLogin} />
          <Route path="/">
            <div className="aside-container">
              <Sidebar
                setFiltroTipo={setFiltroTipo}
                setFiltroFrecuencia={setFiltroFrecuencia}
                setFiltroCalificacion={setFiltroCalificacion}
                setFiltroCategoria={setFiltroCategoria}
              />
            </div>
            <div className="feed-container"></div>
            <div className="feed-post">
              <Postlist
                posts={publicaciones}
                filtroTipo={filtroTipo}
                filtroFrecuencia={filtroFrecuencia}
                filtroCalificacion={filtroCalificacion}
                filtroCategoria={filtroCategoria}
              />
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default HomeMenu;
