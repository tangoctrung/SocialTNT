const Reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START": 
            return {
                user: null,
                isFetching: true,
                error: false
            }
        case "LOGIN_SUCCESS": 
            return {
                user: action.payload,
                isFetching: false,
                error: false
            }
        case "LOGIN_FAILURE": 
            return {
                user: null,
                isFetching: false,
                error: true
            }
        case "UPDATE_START": 
            return {
                ...state,
                isFetching: true,
            }
        case "UPDATE_SUCCESS": 
            return {
                user: action.payload,
                isFetching: false,
                error: false
            }
        case "UPDATE_FAILURE": 
            return {
                user: state.user,
                isFetching: false,
                error: true
            }
        case "LOGOUT": 
            return {
                user: null,
                isFetching: false,
                error: false
            }
        case "FOLLOW":
            return {
              ...state,
              user: {
                ...state.user,
                following: [...state.user.following, action.payload],
              },
            };
        
        case "UNFOLLOW":
            return {
                ...state,
                user: {
                ...state.user,
                following: state.user.following.filter(
                    (following) => following !== action.payload
                ),
                },
            };
        
        case "SEARCH_HISTORY":
            return {
                ...state,
                user: {
                ...state.user,
                searchHistorys: [...state.user.searchHistorys, action.payload],
                },
            };
        
        case "DELETE_HISTORY":
            return {
                ...state,
                user: {
                ...state.user,
                searchHistorys: state.user.searchHistorys.filter(
                    (history) => history !== action.payload
                ),
                },
            };
       
        case "SEARCH_START": 
            return {
                ...state,
                isFetching: true,  
                error: false,            
            };
        
        case "SEARCH_SUCCESS": 
            return {
                ...state,
                isFetching: false,
                error: false, 
            };
       
        case "SEARCH_FAILURE": 
            return {
                ...state,
                isFetching: false,
                error: true,
            };
        
        case "LOADING_POST_START": 
            return {
                ...state,
                isLoadPost: true,  
                error: false,            
            };
        
        case "LOADING_POST_SUCCESS": 
            return {
                ...state,
                isLoadPost: false,
                error: false, 
            };       
        default:
            return state;
    }
};

export default Reducer;