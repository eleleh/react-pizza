import React from "react";

import styles from "./NotFoundBlock.module.scss";

export const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>Nichts gefunden</h1>
      <p className={styles.description}>
        Webseite wurde nicht gefunden, versuchen Sie eine andere Adresse
        einzugeben
      </p>
    </div>
  );
};
