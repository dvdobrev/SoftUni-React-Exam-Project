import styles from "../imported-elements/css/footer.module.css";


export const Footer = () => {

    return (
        <footer className={`${styles["footer"]}`}>
            <div className ={ `${["p"]}`}>
                <div className ="row">
                    <div className ="col-lg-12">
                        <p>Made by Dobrin Dobrev for the SoftUni exam</p>
                                                
                    </div>
                </div>
            </div>
        </footer>
    )
}