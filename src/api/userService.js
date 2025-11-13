import api from './index';
const API_URL = import.meta.env.VITE_API_BASE_URL;

export const boardService = {
    /**
     * 모든 사용자 목록을 조회합니다.
     * @param {Object} [params] - 쿼리 파라미터 (예: { page: 1, size: 10, search: '김영남' })
     */
    getAllUsers: async (params = {}) => {
        return api.get('/user', { params });
    },

    /**
     * 특정 사용자 ID로 사용자 정보를 조회합니다.
     * @param {string | number} userId - 조회할 사용자의 고유 ID
     */
    getUserById: async (userId) => {
        return api.get(`/user/${userId}`);
    },

    /**
     * 현재 로그인된(인증된) 사용자의 프로필 정보를 조회합니다.
     * 별도의 ID 없이 인증 토큰을 통해 사용자 식별
     */
    getMyProfile: async () => {
        return api.get('/user/me'); // 또는 '/profile' 등 백엔드에서 정의한 경로
    },

    /**
     * 새로운 사용자를 생성합니다. (주로 관리자나 특별한 경로를 통한 사용자 생성)
     * @param {Object} userData - 생성할 사용자의 데이터 (예: { userName, email, password, roles })
     */
    createUser: async (userData) => {
        return api.post('/user', userData);
    },

    /**
     * 특정 사용자의 정보를 수정합니다. (PUT: 전체 업데이트)
     * @param {string | number} userId - 수정할 사용자의 고유 ID
     * @param {Object} userData - 수정될 사용자 데이터 (일반적으로 전체 필드 포함)
     */
    updateUser: async (userId, userData) => {
        return api.put(`/user/${userId}`, userData);
    },

    /**
     * 특정 사용자의 정보를 부분적으로 수정합니다. (PATCH: 부분 업데이트)
     * @param {string | number} userId - 수정할 사용자의 고유 ID
     * @param {Object} partialUserData - 부분적으로 수정될 사용자 데이터 (수정할 필드만 포함)
     */
    patchUser: async (userId, partialUserData) => {
        return api.patch(`/user/${userId}`, partialUserData);
    },

    /**
     * 특정 사용자를 삭제합니다.
     * @param {string | number} userId - 삭제할 사용자의 고유 ID
     */
    deleteUser: async (userId) => {
        return api.delete(`/user/${userId}`);
    },

    /**
     * 특정 사용자의 비밀번호를 변경합니다. (별도 엔드포인트 예시)
     * @param {string | number} userId - 비밀번호를 변경할 사용자의 고유 ID
     * @param {Object} newPasswordData - 새 비밀번호 데이터 (예: { currentPassword, newPassword })
     */
    changePassword: async (userId, newPasswordData) => {
        return api.post(`/user/${userId}/change-password`, newPasswordData);
    }

};