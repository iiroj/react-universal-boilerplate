import universal, { ComponentType, Module } from "react-universal-component";

import { Route } from "../routes";

const options = {
  ignoreBabelRename: true,
  loadingTransition: false
};

type UniversalComponent = {
  page: Route;
  src: () => PromiseLike<Module<ComponentType<UniversalComponent>>>;
};

const UniversalComponent = universal(
  ({ src }: UniversalComponent) => src(),
  options
);

export default UniversalComponent;
