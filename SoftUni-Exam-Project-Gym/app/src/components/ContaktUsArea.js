import emailjs from "emailjs-com";
import { useState, useEffect } from "react";

import contactCSS from "../imported-elements/css/contact.module.css";
import '../imported-elements/css/message.css';
import styles from '../imported-elements/css/global-stayles.module.css';



export const ContakUsArea = () => {

    const [visible, setVisible] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });


    const handleSubmit = (e) => {
        e.preventDefault();
        emailjs
            .sendForm(
                "service_bksbgok",
                "template_3znjryf",
                e.target,
                "p9GNelhtFpouaiPGy"
            )
            .then(
                (result) => {
                    setFormData({
                        name: "",
                        email: "",
                        subject: "",
                        message: "",
                    });
                    showHideMessage();
                },
            );
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const showHideMessage = () => {
        setVisible(true);
        setTimeout(() => {
            setVisible(false);
        }, 4000);
    };


    return (
        <section className={contactCSS["section"]} id={contactCSS["contact-us"]}>
            <div className={contactCSS["container-fluid"]}>
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-xs-12">
                        <div id={contactCSS["map"]}>
                            <iframe
                                title="maps"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2933.804540118202!2d23.36759591580302!3d42.63619147916518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa86b9b1bf82df%3A0xdd837ef0b77aae66!2sAleksandar%20Malinov%20Boulevard%2078%2C%201712%20%D0%90%D0%BC%D0%B5%D1%80%D0%B8%D0%BA%D0%B0%D0%BD%D1%81%D0%BA%D0%B8%20%D0%BA%D0%BE%D0%BB%D0%B5%D0%B6%2C%20Sofia%2C%20Bulgarien!5e0!3m2!1sen!2sus!4v1652276592304!5m2!1sen!2sus"
                                width="100%"
                                height="600px"
                                style={{ border: 0 }}
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-xs-12">
                        <div className={contactCSS["contact-form"]}>
                            <form id={contactCSS["contact"]} onSubmit={handleSubmit}>
                                <div className="row" id={`${contactCSS["conatc-row"]}`}>
                                    <div className="col-md-6 col-sm-12">
                                        <fieldset>
                                            <input
                                                name="name"
                                                type="text"
                                                id="name"
                                                placeholder="Your Name*"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </fieldset>
                                    </div>
                                    <div className="col-md-6 col-sm-12">
                                        <fieldset>
                                            <input
                                                name="email"
                                                type="text"
                                                id="email"
                                                pattern="[^ @]*@[^ @]*"
                                                placeholder="Your Email*"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </fieldset>
                                    </div>
                                    <div className="col-md-12 col-sm-12">
                                        <fieldset>
                                            <input
                                                name="subject"
                                                type="text"
                                                id="subject"
                                                placeholder="Subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                            />
                                        </fieldset>
                                    </div>
                                    <div className="col-lg-12">
                                        <fieldset>
                                            <textarea
                                                name="message"
                                                rows="6"
                                                id="message"
                                                placeholder="Message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                            >
                                            </textarea>
                                        </fieldset>
                                    </div>
                                    <div className="col-lg-12">
                                        <fieldset>
                                            <button
                                                type="submit"
                                                id={contactCSS["form-submit"]}
                                                className={styles["buttons"]}
                                            >Send Message
                                            </button>
                                        </fieldset>
                                    </div>
                                </div>
                            </form>

                            <div className={`alert ${visible ? 'show' : 'hide'}`}>
                                <span className="msg">The message was sent successfully</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
