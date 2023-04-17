import { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PlanContext } from "../../contexts/PlanContext";

import * as planServices from '../../services/trainingPlanService';
import detailsCSS from '../../imported-elements/css/details.module.css';
import styles from '../../imported-elements/css/global-stayles.module.css'


export const PlanDetails = (
) => {

    const [showConfirm, setShowConfirm] = useState(false);
    const { planId } = useParams();
    const [currentPlan, setCurrentPlan] = useState({});

    const navigate = useNavigate();

    const { ownerId, fetchallPlans, fetchUserPlans } = useContext(PlanContext);
    const planOwnerId = currentPlan._ownerId;

    const [username, setUsername] = useState('');
    const [comment, setComment] = useState('');
    const [allComments, setAllComments] = useState([]);

    const [error, setError] = useState({
        username: '',
        comment: '',
        emptyFiled: '',
    });

    useEffect(() => {
        planServices.getAllComments()
            .then(plans => plans.filter(plan => plan.planId === planId))
            .then(filteredComments => {
                setAllComments(filteredComments);
            })
            .catch((error) => {
                navigate("/PageNotFound");
            });
    }, [planId, navigate]);


    useEffect(() => {
        planServices.getOne(planId)
            .then(result => {
                setCurrentPlan(result)
            })
            .catch((error) => {
                navigate(`/pageNotFound`)
            });

    }, [planId, navigate]);


    const addCommentHandler = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const username = formData.get('username');
        const comment = formData.get('comment');

        const errors = validateFormData({ username, comment });
        let errorMessage;

        if (Object.values(errors).some((message) => message !== '')) {
            console.log('has errors');
            errorMessage = "Please enter a username and comment"

            setError(state => ({
                ...state,
                emptyFiled: errorMessage
            }));
            return;
        } else {
            setError(state => ({
                ...state,
                emptyFiled: ""
            }));
        }



        planServices
            .createComment({ planId, username, comment })
            .then((newComment) => {
                setAllComments((prevComments) => [...prevComments, newComment]);
                setUsername('');
                setComment('');
            })
            .catch((error) => {
                navigate(`/pageNotFound`);
            });
    };

    const validateFormData = ({ username, comment }) => {
        const errors = {};

        if (!username || username.length < 2 || username.length > 10) {
            errors.username = 'Username must be between 4 and 10 characters';
        }

        if (!comment || comment.length < 2 || comment.length > 20) {
            errors.comment = 'The comment must be between than 2 and 20 characters';
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
            errorMessage = 'The comment must be between than 2 and 20 characters';
        }

        setError((state) => ({
            ...state,
            comment: errorMessage,
        }));
    };

    const validateUsername = (username) => {
        let errorMessage;

        if (!username || username.length < 2 || username.length > 10) {
            errorMessage = 'Username must be between 4 and 10 characters';
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

    const deletePlanHandler = () => {
        planServices.deleteOne(planId)
            .then(() => {
                fetchallPlans();
                fetchUserPlans(ownerId);
                setShowConfirm(false);
                planServices.deleteAllComments(planId);
                navigate(`/myPlans`);
            });
    };

    return (
        <section className={`${detailsCSS["details-section"]}`}>

            <h1 className={detailsCSS["plan-details-title"]}>Plan Details</h1>
            <div className={`${detailsCSS["plan-details-container"]}`}>
                <div className={detailsCSS["plan-details-info"]}>
                    <h2>Level:
                        <span className={detailsCSS["plan-details-day"]}>{currentPlan.level}</span>
                    </h2>
                    <h2>Days per week:
                        <span className={detailsCSS["plan-details-time"]}>{currentPlan.days}
                        </span>
                    </h2>

                    <h2>Description: </h2>

                    <div>
                        <span className={detailsCSS["plan-details-muscle"]}>{currentPlan.description}
                        </span>

                    </div>
                </div>
                <div className={detailsCSS["plan-details-comments"]}>
                    <h2>Comments:</h2>
                    <ul className={detailsCSS["plan-details-comments-list"]}>
                        {allComments?.map(comment => (
                            <li key={comment._id} className={detailsCSS["plan-details-comment"]}>
                                <p>{comment.username}: {comment.comment}</p>
                            </li>
                        ))}

                        {allComments.length === 0
                            ? <p className={detailsCSS["no-comment"]}>No comments yet.</p>
                            : ""
                        }
                    </ul>

                </div>
                {ownerId === planOwnerId &&
                    <div className={detailsCSS["plan-details-buttons"]}>
                        <Link to={`/plans/${planId}/edit`} className={styles["buttons"]}>
                            Edit
                        </Link>
                        <button onClick={confirmDeleteHandler} className={styles["buttons"]}>
                            Delete
                        </button>
                    </div>}


                {showConfirm && (
                    <div className={`${detailsCSS["confirm-message"]} ${detailsCSS["h2"]}`}>
                        <h2 className={detailsCSS["h2"]}>Are you sure you want to delete this plan?</h2>
                        <button onClick={cancelDeleteHandler}>Cancel</button>
                        <button onClick={deletePlanHandler}>Delete</button>
                    </div>
                )}
            </div>


            {ownerId &&
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

                            {error.username && <div style={{ color: 'red' }}>{error.username}</div>}
                        </div>

                        <div className={detailsCSS["comment-div"]}>
                            <textarea
                                name="comment"
                                placeholder="Comment......"
                                value={comment}
                                onChange={onChangeComment}
                            />

                            {error.comment && <div style={{ color: 'red' }}>{error.comment}</div>}
                        </div>

                        <div className={detailsCSS["submit-div"]}>
                            <input
                                className={`${styles["buttons"]} ${detailsCSS["addButton"]}`}
                                type="submit"
                                value="Add Comment"
                            />

                            {error.emptyFiled && <div style={{ color: 'red' }}>{error.emptyFiled}</div>}
                        </div>
                    </form>
                </article>
            }
        </section>
    );
};