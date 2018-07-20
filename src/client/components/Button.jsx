import React from 'react';
import PropTypes from 'prop-types';
import Link from 'redux-first-router-link';
import styled from 'react-emotion';

const Button = ({ children, href, to, ...rest }) =>
  to ? (
    <Link to={to} tabIndex={0} role="button" {...rest}>
      {children}
    </Link>
  ) : (
    <a href={href} tabIndex={0} role="button" {...rest}>
      {children}
    </a>
  );

Button.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  href: PropTypes.string,
  to: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      type: PropTypes.string.isRequired
    })
  ])
};

export default styled(Button)`
  background-color: white;
  border-radius: 10rem;
  color: rgb(45, 45, 45);
  display: inline-block;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.25rem 1rem;
  text-decoration: none;
  transition: all 125ms ease-in-out;

  &:hover,
  &:focus {
    box-shadow: 0 0 0 0.25rem rgba(255, 255, 255, 0.2);
    color: rgb(30, 130, 230);
  }

  &:active {
    box-shadow: none;
    transform: scale(0.95);
  }
`;
