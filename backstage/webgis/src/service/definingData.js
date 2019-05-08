import http from '@/utils/http'

export const getAllEquipment = () => http.get('/webserver/monitor/equipments')