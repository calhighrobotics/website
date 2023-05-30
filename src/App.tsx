import { lazy, type Component } from 'solid-js';
import './App.module.css';
const Home = lazy(() => import("./components/Home"));
const Teams = lazy(() => import("./components/Teams"));
const Events = lazy(() => import("./components/Events"));
const Contact = lazy(() => import("./components/Contact"));
const Sponsors = lazy(() => import("./components/Sponsors"));
const FormSubmitted = lazy(() => import("./components/FormSubmitted"));
import { Route, Routes } from '@solidjs/router';




const App: Component = () => {
  return (
    <>
    <Routes>
      <Route path="/" component={Home} />
      <Route
        path="/teams"
        component={Teams}
      />
      <Route
        path="/events"
        component={Events}
      />
      <Route
        path="/contact"
        component={Contact}
      />
      <Route
        path="/sponsor"
        component={Sponsors}
      />
      <Route
        path="/formsubmitted"
        component={FormSubmitted}
      />
    </Routes>
  </>
  )
};

export default App;
