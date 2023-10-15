import { APIGatewayEvent } from 'aws-lambda'

export interface HttpGenericResponse {
  statusCode: number
  headers?: any
  body?: any
}

export interface GenericAPIEvent extends Omit<APIGatewayEvent, 'body'> {}
