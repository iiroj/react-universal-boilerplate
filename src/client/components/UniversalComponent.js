import universal from "react-universal-component";

const options = {
  ignoreBabelRename: true,
  loadingTransition: false
};

const UniversalComponent = universal(
  ({ page }) => import(`../views/${page.view}`),
  options
);

export default UniversalComponent;
