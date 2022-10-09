const baseApiUrl = process.env.REACT_APP_API_BASE_URL + '/api';

export const familyUrl = () => `${baseApiUrl}/family`;
export const characterUrl = (familyId) => `${baseApiUrl}/family/${familyId}/character`;
