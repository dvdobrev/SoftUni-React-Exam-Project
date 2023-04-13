import * as request from "./requester";

const baseUrl = 'http://localhost:3030/data/plans';
const commentsUrl = 'http://localhost:3030/data/comments';

//TODO: delete the comments here

export const getAll = () => request.get(baseUrl);

export const getOne = (planId) => request.get(`${baseUrl}/${planId}`);

export const deleteOne = (planId) => request.remove(`${baseUrl}/${planId}`);

export const create = (planData) => request.post(baseUrl, planData);

export const edit = (planId, planData) => request.put(`${baseUrl}/${planId}`, planData);


export const getAllComments = () => request.get(commentsUrl);

export const getAllCommen = (id) => request.get(`${commentsUrl}where?planId%3D%22${id}%22`);

export const createComment = (commentData) => request.post(`${commentsUrl}`, commentData);
export const deleteAllComments = (planId) => {

    // return request.remove(`{commentsUrl}?where=planId%3D%22${planId}%22`);

    // const id = encodeURIComponent(`planId=${planId}`);
    // const removedUrl = `${commentsUrl}?where=planId%3D%22${planId}%22`;
    // console.log("Url = " + removedUrl);
    const id = "dfc9ef23-0f28-4442-8824-bfad380646d5";

    return request.remove(`${commentsUrl}/${id}`);
}

// export const deleteAllComments = (planId) => {
//     const requestBody = { planId };
//     return request.remove(commentsUrl, requestBody);
// }

// export const getByGameId = (gameId) => {
//     const relations = encodeURIComponent(`user=_ownerId:users`);
//     const search = encodeURIComponent(`gameId="${gameId}"`);

//     return request.get(`${baseUrl}?where=${search}&load=${relations}`);
// }
