import { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

import * as planServices from '../../services/trainingPlanService';
import commentsCSS from '../../imported-elements/css/comments.module.css';
import detailsCSS from '../../imported-elements/css/details.module.css';

export const PlanDetails = ({
    addComment,
    fetchTrainingPlans,
}) => {

    const [showConfirm, setShowConfirm] = useState(false);
    const { planId } = useParams();
    const [currentPlan, setCurrentPlan] = useState({});
    const navigate = useNavigate();

    const { userData } = useContext(UserContext);
    const ownerId = userData._id;
    const planOwnerId = currentPlan._ownerId;

    const [username, setUsername] = useState('');
    const [comment, setComment] = useState('');
    const [allComments, setAllComments] = useState([]);



    const [error, setError] = useState({
        username: '',
        comment: '',
    });

    useEffect(() => {
        planServices.getAllComments()
            .then(plans => plans.filter(plan => plan.planId === planId))
            .then(filteredComments => {
                setAllComments(filteredComments);
            })
            .catch(error => {
                // Handle any errors that occurred while fetching or filtering comments
            });
    }, [planId]);


    useEffect(() => {
        planServices.getOne(planId)
            .then(result => {
                setCurrentPlan(result);
            });
    }, []);

    const addCommentHandler = (e) => {
        e.preventDefault();

        planServices
            .createComment({ planId, username, comment })
            .then((newComment) => {
                setAllComments((prevComments) => [...prevComments, newComment]);
                setUsername('');
                setComment('');
            })
            .catch((error) => console.error(error));
    };

    const onChangeUsername = (e) => {
        setUsername(e.target.value);
        validateUsername(e.target.value);
    };

    const onChangeComment = (e) => {
        setComment(e.target.value);
    };

    const validateUsername = (username) => {
        let errorMessage = '';

        if (username.length < 2) {
            errorMessage = 'Username must be longer than 4 characters';
        } else if (username.length > 10) {
            errorMessage = 'Username must be shorter than 10 characters';
        }

        setError(state => ({
            ...state,
            username: errorMessage,
        }));
    }

    const confirmDeleteHandler = () => {
        setShowConfirm(true);
    };

    const cancelDeleteHandler = () => {
        setShowConfirm(false);
    };

    const deletePlanHandler = () => {
        planServices.deleteOne(planId)
            .then(() => {
                fetchTrainingPlans();
                setShowConfirm(false);
                navigate(`/plansCatalog`);
            });
    };

    return (
        <section>
            <br></br>
            <br></br>

            <br></br>

            <br></br>

            <h1 className={detailsCSS["plan-details-title"]}>Plan Details</h1>
            <div className={detailsCSS["plan-details-container"]}>
                <div className={detailsCSS["plan-details-info"]}>
                    <h1>Day: <span className={detailsCSS["plan-details-day"]}>{currentPlan.day}</span></h1>
                    <h1>Time: <span className={detailsCSS["plan-details-time"]}>{currentPlan.time}</span></h1>
                    <h1>Muscle: <span className={detailsCSS["plan-details-muscle"]}>{currentPlan.muscleGroup}</span></h1>
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
                        <Link to={`/plans/${planId}/edit`} className={detailsCSS["plan-details-edit-button"]}>
                            Edit
                        </Link>
                        <button onClick={confirmDeleteHandler} className={detailsCSS["plan-details-delete-button"]}>
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


            {userData.email &&
                <article className={commentsCSS["create-comment"]}>
                    <label>Add new comment:</label>
                    <form className={commentsCSS["form"]} onSubmit={addCommentHandler}>
                        <input
                            type="text"
                            name="username"
                            placeholder="Enter your username"
                            onChange={onChangeUsername}
                        // value={comment.username}
                        />

                        {error.username &&
                            <div style={{ color: 'red' }}>{error.username}</div>
                        }

                        <textarea
                            name="comment"
                            placeholder="Comment......"
                            onChange={onChangeComment}
                        // value={comment.comment}
                        />

                        <input
                            className={commentsCSS["btn submit"]}
                            type="submit"
                            value="Add Comment"
                        />
                    </form>
                </article>
            }
        </section>
    );
};