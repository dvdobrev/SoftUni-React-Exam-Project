import pageNotFoundCSS from '../imported-elements/css/pageNotFound.module.css';

export const PageNotFound = () => {

    //TODO: Edit this page if the user search not existing page
    return (
        <div className={pageNotFoundCSS["div"]}>
            <h1> PAGE NOT FOUND </h1>
        </div>
    );
};
