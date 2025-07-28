
export const API_BASE_URL = "https://interviewprepai-8ew8.onrender.com";

export const API_PATHS = {
  auth: {
    login: "/api/auth/login",
    register: "/api/auth/register",
    // logout: "/api/auth/logout",
    getProfile: "/api/auth/profile",
  },
  image: {
    upload_img: "/api/auth/upload-image",
  },
  sessions: {
    create: "/api/sessions/create",
    getAll: "/api/sessions/my-sessions",
    getOne: (id) => `/api/sessions/${id}`,
    // update: (id) => `/api/sessions/update/${id}`,
    delete: (id) => `/api/sessions/${id}`,
  },
  questions: {
    add_to_session: "/api/questions/add",
    // getById: (id) => `/api/questions/${id}`,
    pin: (id) => `/api/questions/${id}/pin`,
    update_note: (id) => `/api/questions/${id}/note`,
  },
  ai: {
    generateQuestions: "/api/ai/generate-questions",
    generateExplanations: "/api/ai/generate-explainations",
  },
};
