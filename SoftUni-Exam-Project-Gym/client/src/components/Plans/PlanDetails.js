import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import * as planServices from '../../services/trainingPlanService';

export const PlanDetails = ({
    addComment,
}) => {
    const { planId } = useParams();
    const [currentPlan, setCurrentPlan] = useState({});

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

    console.log(planId);

    return (
        <section>
            <br></br>
            <br></br>

            <br></br>

            <br></br>

            <h1>Plan Details</h1>
            <div>
                <div>
                    <h1>Day:{currentPlan.day}</h1>
                    <h1>Time: {currentPlan.time}</h1>
                    <h1>Muscle: {currentPlan.muscleGroup}</h1>
                </div>

                <div className="details-comments">
                    <h2>Comments:</h2>
                    <ul>
                        {/* {game.comments?.map(x => 
                            <li className="comment">
                                <p>{x}</p>
                            </li>
                        )} */}
                    </ul>

                    {/* {!game.comments &&
                        <p className="no-comment">No comments.</p>
                    } */}
                </div>

                <div className="buttons">
                    <Link to={`/plans/${planId}/edit`} className="button">
                        Edit
                    </Link>
                    <Link to="#" className="button">
                        Delete
                    </Link>
                </div>
            </div>

            <article className="create-comment">
                <label>Add new comment:</label>
                <form className="form" onSubmit={addCommentHandler}>
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
                        className="btn submit"
                        type="submit"
                        value="Add Comment"
                    />
                </form>
            </article>
        </section>
    );
};
