import api from './index';
const API_URL = import.meta.env.VITE_API_BASE_URL;

export const boardService = {
    /**
     * 모든 사용자 목록을 조회합니다.
     * @param {Object} [params] - 쿼리 파라미터 (예: { page: 1, size: 10, search: '김영남' })
     */
    getAllUsers: async (params = {}) => {
        return api.get('/board', { params });
    },

    /**
     * 특정 사용자 ID로 사용자 정보를 조회합니다.
     * @param {string | number} id - 조회할 사용자의 고유 ID
     */
    getUserById: async (id) => {
        return api.get(`/board/${id}`);
    },

    /**
     * 현재 로그인된(인증된) 사용자의 프로필 정보를 조회합니다.
     * 별도의 ID 없이 인증 토큰을 통해 사용자 식별
     */
    getMyProfile: async () => {
        return api.get('/board/me'); // 또는 '/profile' 등 백엔드에서 정의한 경로
    },

    /**
     * 새로운 사용자를 생성합니다. (주로 관리자나 특별한 경로를 통한 사용자 생성)
     * @param {Object} boardData - 생성할 사용자의 데이터 (예: { userName, email, password, roles })
     */
    createUser: async (boardData) => {
        return api.post('/board', boardData);
    },

    /**
     * 특정 사용자의 정보를 수정합니다. (PUT: 전체 업데이트)
     * @param {string | number} id - 수정할 사용자의 고유 ID
     * @param {Object} boardData - 수정될 사용자 데이터 (일반적으로 전체 필드 포함)
     */
    updateUser: async (id, boardData) => {
        return api.put(`/board/${id}`, boardData);
    },

    /**
     * 특정 사용자의 정보를 부분적으로 수정합니다. (PATCH: 부분 업데이트)
     * @param {string | number} userId - 수정할 사용자의 고유 ID
     * @param {Object} boardData - 부분적으로 수정될 사용자 데이터 (수정할 필드만 포함)
     */
    patchUser: async (id, partialBoardData) => {
        return api.patch(`/board/${id}`, partialBoardData);
    },

    /**
     * 특정 사용자를 삭제합니다.
     * @param {string | number} id - 삭제할 사용자의 고유 ID
     */
    deleteUser: async (id) => {
        return api.delete(`/board/${id}`);
    },

};