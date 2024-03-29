import { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { PlanContext } from "../../contexts/PlanContext";

import detailsCSS from "../../imported-elements/css/details.module.css";
import styles from "../../imported-elements/css/global-stayles.module.css";
import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    query,
    serverTimestamp,
    setDoc,
    where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { randomStringGenerator } from "../../helpers/RandomId";

export const PlanDetails = () => {
    const [showConfirm, setShowConfirm] = useState(false);
    const { planId } = useParams();
    const [currentPlan, setCurrentPlan] = useState({});
    const [dokumentId, setDokumentId] = useState("");

    const navigate = useNavigate();

    const { ownerId, fetchAllPlans, fetchUserPlans } = useContext(PlanContext);
    const planOwnerId = currentPlan.ownerId;

    const [username, setUsername] = useState("");
    const [comment, setComment] = useState("");
    const [allComments, setAllComments] = useState([]);
    const [commentId, setCommentId] = useState('');

    const [error, setError] = useState({
        username: "",
        comment: "",
        emptyFiled: "",
    });

    useEffect(() => {
        const getPlan = async () => {
            try {
                const q = query(collection(db, "Plans"), where("planId", "==", planId));
                const querySnapshot = await getDocs(q);
                const searchedPlan = querySnapshot.docs.map((doc) => doc.data())[0];
                const dokId = querySnapshot.docs[0].id;
                setCurrentPlan(searchedPlan);

                const commentsArray = await getAllComments(planId);
                commentsArray.sort((a, b) => a.timeStamp - b.timeStamp);                
                setAllComments(commentsArray);
                setDokumentId(dokId);
            } catch (error) {
                console.error("Error fetching user plans:", error);
            }
        };

        getPlan();
    }, [planId, navigate]);

    const addCommentHandler = (e) => {
        e.preventDefault();

        setCommentId(randomStringGenerator());

        const formData = new FormData(e.target);

        // const username = formData.get('username');
        setUsername(formData.get("username"));

        // const comment = formData.get('comment');
        setComment(formData.get("comment"));

        const errors = validateFormData({ username, comment });
        let errorMessage;

        if (Object.values(errors).some((message) => message !== "")) {
            errorMessage = "Please enter a username and comment";

            setError((state) => ({
                ...state,
                emptyFiled: errorMessage,
            }));
            return;
        } else {
            setError((state) => ({
                ...state,
                emptyFiled: "",
            }));
        }

        addComment(planId, username, comment)

    };

    const getAllComments = async (planId) => {
        const commentsRef = collection(db, "planComments" + planId);
        const querySnapshot = await getDocs(commentsRef);

        const commentsArray = [];
        querySnapshot.forEach((doc) => {
            commentsArray.push(doc.data());
        });

        return commentsArray;
    };

    const addComment = async (planId, username, comment) => {

        const planPath = collection(db, "planComments" + planId);
        const planColleciton = await getDocs(planPath);
        let existPlan = planColleciton.empty;

        const commentData = {
            username: username,
            comment: comment,
            id: randomStringGenerator(),
            timeStamp: serverTimestamp()
        }

        if (!existPlan) {
            const newDocRef = doc(db, "planComments" + planId, randomStringGenerator());
            await setDoc(newDocRef, commentData);
        } else {
            const newDocRef = doc(planPath, randomStringGenerator());
            await setDoc(newDocRef, commentData);
        }


        setAllComments((prevComments) => [...prevComments, commentData]);
        setUsername("");
        setComment("");

        await navigate("/plans/" + planId + "/details")
    };

    const deleteCollection = async (collectionRef) => {
        const querySnapshot = await getDocs(collectionRef);

        // Delete each document within the collection
        querySnapshot.forEach((doc) => {
            deleteDoc(doc.ref);
        });
    };


    const validateFormData = ({ username, comment }) => {
        const errors = {};

        if (!username || username.length < 2 || username.length > 10) {
            errors.username = "Username must be between 4 and 10 characters";
        }

        if (!comment || comment.length < 2 || comment.length > 20) {
            errors.comment = "The comment must be between than 2 and 20 characters";
        }

        return errors;
    };

    const onChangeUsername = (e) => {
        const username = e.target.value;
        validateUsername(username);
        setUsername(username);
    };

    const onChangeComment = (e) => {
        const comment = e.target.value;
        validateComment(comment);
        setComment(comment);
    };

    const validateComment = (comment) => {
        let errorMessage;

        if (!comment || comment.length < 2 || comment.length > 20) {
            errorMessage = "The comment must be between than 2 and 20 characters";
        }

        setError((state) => ({
            ...state,
            comment: errorMessage,
        }));
    };

    const validateUsername = (username) => {
        let errorMessage;

        if (!username || username.length < 2 || username.length > 10) {
            errorMessage = "Username must be between 4 and 10 characters";
        }

        setError((state) => ({
            ...state,
            username: errorMessage,
        }));
    };

    const confirmDeleteHandler = () => {
        setShowConfirm(true);
    };

    const cancelDeleteHandler = () => {
        setShowConfirm(false);
    };

    const deletePlanHandler = async () => {
        await deleteDoc(doc(db, "Plans", dokumentId));
        deleteCollection(collection(db, "planComments" + planId));
        fetchAllPlans();
        fetchUserPlans();
        setShowConfirm(false);
        navigate(`/myPlans`);
    };

    return (
        <section className={`${detailsCSS["details-section"]}`}>
            <h1 className={detailsCSS["plan-details-title"]}>Plan Details</h1>
            <div className={`${detailsCSS["plan-details-container"]}`}>
                <div className={detailsCSS["plan-details-info"]}>
                    <h2>
                        Level:
                        <span className={detailsCSS["plan-details-day"]}>
                            {currentPlan.level}
                        </span>
                    </h2>
                    <h2>
                        Days per week:
                        <span className={detailsCSS["plan-details-time"]}>
                            {currentPlan.days}
                        </span>
                    </h2>

                    <h2>Description: </h2>

                    <div>
                        <span className={detailsCSS["plan-details-muscle"]}>
                            {currentPlan.description}
                        </span>
                    </div>
                </div>
                <div className={detailsCSS["plan-details-comments"]}>
                    <h2>Comments:</h2>
                    <ul className={detailsCSS["plan-details-comments-list"]}>
                        {allComments?.map((comment) => (
                            <li
                                key={comment.id}
                                className={detailsCSS["plan-details-comment"]}
                            >
                                <p>
                                    {comment.username}: {comment.comment}
                                </p>
                            </li>
                        ))}

                        {allComments.length === 0 ? (
                            <p className={detailsCSS["no-comment"]}>No comments yet.</p>
                        ) : (
                            ""
                        )}
                    </ul>
                </div>
                {ownerId === planOwnerId && (
                    <div className={detailsCSS["plan-details-buttons"]}>
                        <Link to={`/plans/${planId}/edit`} className={styles["buttons"]}>
                            Edit
                        </Link>
                        <button
                            onClick={confirmDeleteHandler}
                            className={styles["buttons"]}
                        >
                            Delete
                        </button>
                    </div>
                )}

                {showConfirm && (
                    <div
                        className={`${detailsCSS["confirm-message"]} ${detailsCSS["h2"]}`}
                    >
                        <h2 className={detailsCSS["h2"]}>
                            Are you sure you want to delete this plan?
                        </h2>
                        <button onClick={cancelDeleteHandler}>Cancel</button>
                        <button onClick={deletePlanHandler}>Delete</button>
                    </div>
                )}
            </div>

            {ownerId && (
                <article className={detailsCSS["create-comment"]}>
                    <label>Add new comment:</label>
                    <form className={detailsCSS["form"]} onSubmit={addCommentHandler}>
                        <div className={detailsCSS["comment-div"]}>
                            <input
                                type="text"
                                name="username"
                                placeholder="Enter your username"
                                value={username}
                                onChange={onChangeUsername}
                            />

                            {error.username && (
                                <div style={{ color: "red" }}>{error.username}</div>
                            )}
                        </div>

                        <div className={detailsCSS["comment-div"]}>
                            <textarea
                                name="comment"
                                placeholder="Comment......"
                                value={comment}
                                onChange={onChangeComment}
                            />

                            {error.comment && (
                                <div style={{ color: "red" }}>{error.comment}</div>
                            )}
                        </div>

                        <div className={detailsCSS["submit-div"]}>
                            <input
                                className={`${styles["buttons"]} ${detailsCSS["addButton"]}`}
                                type="submit"
                                value="Add Comment"
                            />

                            {error.emptyFiled && (
                                <div style={{ color: "red" }}>{error.emptyFiled}</div>
                            )}
                        </div>
                    </form>
                </article>
            )}
        </section>
    );
};
