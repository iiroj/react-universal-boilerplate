export type Route = {
  path: string;
  title: string;
  component: string;
};

export type Routes = {
  [key: string]: Route;
};

const routes: Routes = {
  HOME: {
    path: "/",
    title: "React Universal Boilerplate",
    component: "Home"
  }
};

export default routes;
