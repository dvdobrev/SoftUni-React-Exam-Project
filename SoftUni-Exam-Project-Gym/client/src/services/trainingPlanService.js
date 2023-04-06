import * as request from "./requester";

const baseUrl = 'http://localhost:3030/data/plans';
const commentsUrl = 'http://localhost:3030/data/comments';

export const getAll = () => request.get(baseUrl);

export const getOne = (planId) => request.get(`${baseUrl}/${planId}`);

export const deleteOne = (planId) => request.remove(`${baseUrl}/${planId}`);

export const create = (planData) => request.post(baseUrl, planData);

export const edit = (planId, planData) => request.put(`${baseUrl}/${planId}`, planData);


export const getAllComments = () => request.get(commentsUrl);
export const createComment = (commentData) => request.post(`${commentsUrl}`, commentData);
export const deleteAllComments = (planId) => {

    const id = encodeURIComponent(`planId=${planId}`);
    return request.remove(`${commentsUrl}?${id}`);
}

// export const deleteAllComments = (planId) => {
//     const requestBody = { planId };
//     return request.remove(commentsUrl, requestBody);
// }

export const getByGameId = (gameId) => {
    const relations = encodeURIComponent(`user=_ownerId:users`);
    const search = encodeURIComponent(`gameId="${gameId}"`);

    return request.get(`${baseUrl}?where=${search}&load=${relations}`);
}
