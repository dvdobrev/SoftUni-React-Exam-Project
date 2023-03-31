import * as request from "./requester";

const baseUrl = 'http://localhost:3030/data/plans';

export const getAll = () => request.get(baseUrl);

export const getOne = (planId) => request.get(`${baseUrl}/${planId}`);

export const deleteOne = (planId) => request.remove(`${baseUrl}/${planId}`);

export const create = (planData) => request.post(baseUrl, planData);

export const edit = (planId, planData) => request.put(`${baseUrl}/${planId}`, planData);
