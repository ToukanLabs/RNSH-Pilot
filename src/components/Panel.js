import React from 'react';
import styles from './Panel.scss';

const Panel = ({title, className, children}) => {
  const componentClassName = (className)
      ? `${styles['panel']} ${className}`
      : styles['panel'];

  const componentTitle = (title)
      ? (<h2>{title}</h2>)
      : null;

  return (
    <div className={componentClassName}>
      {componentTitle}
      {children}
    </div>
  );
};

Panel.propTypes = {
  title: React.PropTypes.string,
  className: React.PropTypes.string,
  children: React.PropTypes.array,
};

export default Panel;
