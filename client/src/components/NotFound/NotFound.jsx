import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./styles.module.css";

function NotFound() {
    return (
        <div id={styles.notfound}>
            <div className={styles.notfound}>
                <div className={styles.notfound404}>
                    <h1>Oops!</h1>
                    <h2>404 - The Page can't be found</h2>
                </div>
                <Link to="/">Go TO Homepage</Link>
            </div>
	    </div>
    );
}

export default NotFound
