const SINGLE = {
  name: 'single',
};

const DOUBLE = {
  name: 'double',
};

export const singleLayoutSelected = () => ({type: 'SINGLE'});
export const doubleLayoutSelected = () => ({type: 'DOUBLE'});

export const layoutChange = (state, action) => {
  switch (action.type) {
    case 'SINGLE': {
      return {
        cardLayout: (state.cardLayout = SINGLE),
      };
    }
    case 'DOUBLE': {
      return {
        cardLayout: (state.cardLayout = DOUBLE),
      };
    }
    default: {
      return state;
    }
  }
};

export const initialLayoutState = {
  cardLayout: DOUBLE,
  error: null,
  status: null,
};
