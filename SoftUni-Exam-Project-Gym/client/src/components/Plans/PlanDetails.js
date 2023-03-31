import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

import * as planServices from '../../services/trainingPlanService';
import commentsCSS from '../../imported-elements/css/comments.module.css';
import detailsCSS from '../../imported-elements/css/details.module.css';

export const PlanDetails = ({
    addComment,
}) => {
    const { planId } = useParams();
    const [currentPlan, setCurrentPlan] = useState({});
    const navigate = useNavigate();

    const [comment, setComment] = useState({
        username: '',
        comment: '',
    });

    const [error, setError] = useState({
        username: '',
        comment: '',
    });

    useEffect(() => {
        planServices.getOne(planId)
            .then(result => {
                setCurrentPlan(result);
            });
    }, []);

    const addCommentHandler = (e) => {
        e.preventDefault();

        const result = `${comment.username}: ${comment.comment}`;

        addComment(planId, result);
    }

    const onChange = (e) => {
        setComment(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    };

    const validateUsername = (e) => {
        const username = e.target.value;
        let errorMessage = '';

        if (username.length < 4) {
            errorMessage = 'Username must be longer than 4 characters';
        } else if (username.length > 10) {
            errorMessage = 'Username must be shorter than 10 characters';
        }

        setError(state => ({
            ...state,
            username: errorMessage,
        }));
    }

    const deletePlanHandler = () => {
        planServices.deleteOne(planId)
            .then(() => {
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
                        {/* {game.comments?.map(x => 
                            <li className={detailsCSS["plan-details-comment"]}>
                                <p>{x}</p>
                            </li>
                        )} */}
                        {/* {!game.comments &&
                                <p className={detailsCSS["no-comment"]}>No comments.</p>
                        } */}
                    </ul>
                </div>
                <div className={detailsCSS["plan-details-buttons"]}>
                    <Link to={`/plans/${planId}/edit`} className={detailsCSS["plan-details-edit-button"]}>
                        Edit
                    </Link>
                    <button onClick={deletePlanHandler} className={detailsCSS["plan-details-delete-button"]}>
                        Delete
                    </button>
                </div>
            </div>


            <article className={commentsCSS["create-comment"]}>
                <label>Add new comment:</label>
                <form className={commentsCSS["form"]} onSubmit={addCommentHandler}>
                    <input
                        type="text"
                        name="username"
                        placeholder="John Doe"
                        onChange={onChange}
                        onBlur={validateUsername}
                        value={comment.username}
                    />

                    {error.username &&
                        <div style={{ color: 'red' }}>{error.username}</div>
                    }

                    <textarea
                        name="comment"
                        placeholder="Comment......"
                        onChange={onChange}
                        value={comment.comment}
                    />

                    <input
                        className={commentsCSS["btn submit"]}
                        type="submit"
                        value="Add Comment"
                    />
                </form>
            </article>
        </section>
    );
};