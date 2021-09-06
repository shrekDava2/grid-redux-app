
export default class GridService {

    data ={ 
        left: [
            {id: 0, title: 'Left 0'},
            {id: 1, title: 'Left 1'},
            {id: 2, title: 'Left 2'},
        ],
        middle: [
            {id: 3, title: 'Middle 0'},
            {id: 4, title: 'Middle 1'},
            {id: 5, title: 'Middle 2'},
        ],
        right: [
            {id: 6, title: 'Right 0'},
            {id: 66, title: 'Right 1'},
            {id: 666, title: 'Right 2'},
        ]
      
    }; 
    
    getGrids() {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(this.data)
          }, 700);
        });
      }
  
}