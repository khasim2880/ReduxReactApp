export const pdp = (state = {}, action) => {  
    switch (action.type) {
      case 'Product':
        return action.product;
      default:
        return state;
    }
  };