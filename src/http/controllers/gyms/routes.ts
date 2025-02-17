import { FastifyInstance } from 'fastify'

import { verifyJwt } from '../middlewares/verify-jwt'
import { search } from './search'
import { nearby } from './nearby'
import { create } from './create'
import { verifyUserRole } from '../middlewares/verify-user-role'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt) // AQUI E O MIDDLEWARE QUE IRA VERIFICAR SE TODOS OS LOGIN ESTA LOGADO
  app.get('/gyms/search', search)
  app.get('/gyms/nearby', nearby)
  app.post('/gyms', { onRequest: [verifyUserRole('ADMIN')] }, create)
}
