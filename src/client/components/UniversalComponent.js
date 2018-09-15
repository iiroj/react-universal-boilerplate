import universal from 'react-universal-component';
import PropTypes from 'prop-types';

const UniversalComponent = universal(({ src }) => src(), {
  loadingTransition: false
});

UniversalComponent.propTypes = {
  src: PropTypes.func.isRequired
};

export default UniversalComponent;
