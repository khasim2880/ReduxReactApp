export const category = (state = {}, action) => {  
    switch (action.type) {
      case 'Categories':
        return action.categories;
      default:
        return state;
    }
  };