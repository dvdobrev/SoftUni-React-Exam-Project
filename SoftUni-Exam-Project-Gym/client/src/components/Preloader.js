import styles from "../imported-elements/css/global-stayles.module.css";


export const Preloader = () => {
    const element = (
        <div id="js-preloader" className ={styles["js-preloader"]}>
            <div className ={styles["preloader-inner"]}>
                <span className ={styles["dot"]}></span>
                <div className ={styles["dots"]}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    )
    return element
}