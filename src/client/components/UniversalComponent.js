import universal from "react-universal-component";

const options = {
  ignoreBabelRename: true,
  loadingTransition: false
};

const UniversalComponent = universal(({ src }) => src(), options);

export default UniversalComponent;
