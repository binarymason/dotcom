import axios from 'axios';
import moment from 'moment';
import jwtDecode from 'jwt-decode';

const UPDATE_EMAIL = 'UPDATE_EMAIL';
const UPDATE_PASSWORD = 'UPDATE_PASSWORD';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';
const AUTH_REFRESH = 'AUTH_REFRESH';
const AUTH_FAILURE = 'AUTH_FAILURE';
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

const getLocalStorageItem = item => (window.localStorage.getItem(item));
const getAccessToken = () => (getLocalStorageItem('accessToken'));
const getRefreshToken = () => (getLocalStorageItem('refreshToken'));

const getRefreshTime = () => {
  const jwt = getAccessToken();
  if (!jwt) return {};
  const payload = jwtDecode(jwt);
  const expiration = parseInt(payload.exp, 10);
  const rt = moment.unix(expiration).subtract(1, 'minute');
  return {
    timeoutSeconds: rt.diff(moment()),
    time: rt.format('YYYY-MM-DD:HH:mm:ss'),
  };
};


const loadAuthState = () => ({
  accessToken: getAccessToken(),
  isLoggedIn: !!getAccessToken(),
  refreshInterval: getRefreshTime(),
  refreshToken: getRefreshToken(),
});

const initialState = loadAuthState();

const setLocalStorageItem = (item, value) => (
  window.localStorage.setItem(item, value)
);

const saveTokens = (state, payload) => {
  const accessToken = payload.access_token;
  const refreshToken = payload.refresh_token;

  setLocalStorageItem('accessToken', accessToken);
  setLocalStorageItem('refreshToken', refreshToken);

  return loadAuthState();
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_EMAIL:
      return { ...state, email: action.payload };
    case UPDATE_PASSWORD:
      return { ...state, password: action.payload };
    case LOGIN_SUCCESS:
    case AUTH_REFRESH:
      return saveTokens(state, action.payload);
    case LOGOUT_SUCCESS:
      return { isLoggedIn: false };
    default:
      return state;
  }
};

export const updateEmail = value => (
  { type: UPDATE_EMAIL, payload: value }
);

export const updatePassword = value => (
  { type: UPDATE_PASSWORD, payload: value }
);

// will use username, password
export const login = () => (
  (dispatch, getState) => {
    const state = getState().auth;
    const { email, password } = state;

    const params = { email, password };

    axios.post('/api/auth/session', params)
      .then(res => dispatch({ type: LOGIN_SUCCESS, payload: res.data }))
      .catch((err) => {
        debugger; // eslint-disable-line
        dispatch({ type: LOGIN_FAILURE, payload: err });
      });
  }
);

export const refresh = () => (
  (dispatch, getState) => {
    const state = getState().auth;
    const { refreshToken } = state;

    const config = {
      headers: { Authorization: `Bearer ${refreshToken}` },
    };

    axios.post('/api/auth/refresh', {}, config)
      .then(res => dispatch({ type: AUTH_REFRESH, payload: res.data }))
      .catch(err => dispatch({ type: AUTH_FAILURE, payload: err }));
  }
);

export const logout = () => {
  window.localStorage.clear();
  return { type: LOGOUT_SUCCESS };
};
