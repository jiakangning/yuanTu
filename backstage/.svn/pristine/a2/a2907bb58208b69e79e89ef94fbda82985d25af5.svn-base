import http from './../utils/http'

let svgCache = {}
export const getSvgData = svgName => {
  if (svgCache[svgName]) {
    return new Promise(resolve => {
      resolve(svgCache[svgName])
    })
  } else {
    return http.get(`/json/svg/${svgName}.json`).then(res => {
      svgCache[svgName] = res
      return res
    })
  }
}

// const requestUrl = 'http://localhost:3721'

export const getAllPositions = () => http.get('/webserver/position/all')
export const createPosition = position =>
  http.post('/webserver/position', position)
export const updatePosition = position =>
  http.put('/webserver/position', position)
export const deletePosition = position =>
  http.delete('/webserver/position', {data: position})
