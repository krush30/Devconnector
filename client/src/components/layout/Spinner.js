import React, { Fragment } from 'react'

const Spinner = () => {
    return (
        <Fragment>
            <img
                src="/img/anime-anime-loading.gif"
                style={{ width: '200px', margin: 'auto', display: 'block' }}
                alt="Loading..."
            />

        </Fragment>
    )
}

export default Spinner;
