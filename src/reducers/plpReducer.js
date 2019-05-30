export const plp = (state = {}, action) => {  
    switch (action.type) {
      case 'Products':
        return action.products;
      default:
        return state;
    }
  };