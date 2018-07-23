import universal from 'react-universal-component';
import PropTypes from 'prop-types';

const UniversalComponent = universal(({ page }) => import(`./${page.component}`), {
  loadingTransition: false
});

UniversalComponent.propTypes = {
  page: PropTypes.shape({
    path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    component: PropTypes.string.isRequired
  }).isRequired
};

export default UniversalComponent;
