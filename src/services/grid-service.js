
export default class GridService {
  getGrids = async () => {
    const res = await fetch('http://localhost:3000/data')
    return await res.json()
  } 
}
