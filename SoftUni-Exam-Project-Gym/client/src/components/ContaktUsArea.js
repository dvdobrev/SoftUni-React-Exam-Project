import styles from "../imported-elements/css/global-stayles.module.css";
import contactCSS from "../imported-elements/css/global-stayles.module.css";


export const ContakUsArea = () => {
    return (
      //TODO: Make the same class as by login, to get the picture
      //TODO: Correct the footer in another color
    <section className ={styles["section"]} id={styles["contact-us"]}>
        <div className ={styles["container-fluid"]}>
            <div className ="row">
                <div className ="col-lg-6 col-md-6 col-xs-12">
                    <div id={styles["map"]}>
                      <iframe title="maps" src="https://maps.google.com/maps?q=Av.+L%C3%BAcio+Costa,+Rio+de+Janeiro+-+RJ,+Brazil&t=&z=13&ie=UTF8&iwloc=&output=embed" width="100%" height="600px" frameBorder="0" style={{border:0}} allowFullScreen></iframe>
                    </div>
                </div>
                <div className ="col-lg-6 col-md-6 col-xs-12">
                    <div className ={styles["contact-form"]}>
                        <form id={styles["contact"]} action="" method="post">
                          <div className ="row">
                            <div className ="col-md-6 col-sm-12">
                              <fieldset>
                                <input name="name" type="text" id="name" placeholder="Your Name*" required=""/>
                              </fieldset>
                            </div>
                            <div className ="col-md-6 col-sm-12">
                              <fieldset>
                                <input name="email" type="text" id="email" pattern="[^ @]*@[^ @]*" placeholder="Your Email*" required=""/>
                              </fieldset>
                            </div>
                            <div className ="col-md-12 col-sm-12">
                              <fieldset>
                                <input name="subject" type="text" id="subject" placeholder="Subject"/>
                              </fieldset>
                            </div>
                            <div className ="col-lg-12">
                              <fieldset>
                                <textarea name="message" rows="6" id="message" placeholder="Message" required=""></textarea>
                              </fieldset>
                            </div>
                            <div className ="col-lg-12">
                              <fieldset>
                                <button type="submit" id={styles["form-submit"]} className ={styles["main-button"]}>Send Message</button>
                              </fieldset>
                            </div>
                          </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
    )
}