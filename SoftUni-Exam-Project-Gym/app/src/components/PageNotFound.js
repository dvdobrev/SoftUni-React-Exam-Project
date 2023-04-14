import pageNotFoundCSS from '../imported-elements/css/pageNotFound.module.css';

export const PageNotFound = () => {

    return (
        <div className={pageNotFoundCSS["div"]}>
            <h1> THERE IS AN ERROR OR THE PAGE IS NOT FOUND </h1>
        </div>
    );
};
