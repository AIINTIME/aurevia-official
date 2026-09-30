import { useEffect, useState } from 'react';
import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import Contact from './Pages/Contact/Contact';
import VoiceAI from './Pages/VoiceAI/VoiceAI';

// Tiny hash router (Voice AI is the only product page so far, so "#/products" opens it): "#/about" / "#/contact" show those pages, anything else shows Home
const getRoute = () => {
  const { hash } = window.location;
  if (hash.startsWith('#/about')) return 'about';
  if (hash.startsWith('#/contact')) return 'contact';
  if (hash.startsWith('#/products')) return 'voice-ai';
  return 'home';
};

function App() {
  const [route, setRoute] = useState(getRoute);

  useEffect(() => {
    const onHashChange = () => {
      const next = getRoute();
      setRoute((prev) => {
        if (prev !== next) window.scrollTo(0, 0);
        return next;
      });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  if (route === 'about') return <About />;
  if (route === 'contact') return <Contact />;
  if (route === 'voice-ai') return <VoiceAI />;
  return <Home />;
}

export default App
