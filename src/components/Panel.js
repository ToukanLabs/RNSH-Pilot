import React from 'react';
import styles from './Panel.scss';

const Panel = ({title, className, children}) => {
  const componentClassName = (className)
      ? `${styles.panel} ${className}`
      : styles.panel;

  const componentTitle = (title)
      ? (<h2>{title}</h2>)
      : null;

  const componentContent =
      <div className={styles.panelContent}>
        {children}
      </div>;

  return (
    <div className={componentClassName}>
      {componentTitle}
      {componentContent}
    </div>
  );
};

Panel.propTypes = {
  title: React.PropTypes.string,
  className: React.PropTypes.string,
  children: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.object,
    React.PropTypes.string,
  ]),
};

export default Panel;
